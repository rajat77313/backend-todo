const User = require('../models/user-model')
const LoggedUser = require('../models/loggeduser-model')
const bcrypt = require('bcryptjs')

const getData = async (req, res) => {
    res.json({ message: 'Some Data from Backend' });
}

const createuser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(500).send('User already exists.')
        }
        const user = await User.create({ username, email, password })

        const new_user = await User.findOne({ email: email })
        const userId = new_user._id

        await LoggedUser.deleteMany({});
        const loggedUser = await LoggedUser.create({ username, email, userId })
        res.json({ message: 'User Created' })

    } catch (error) {
        console.error(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email })

        if (!userExist) {
            return res.status(500).json({ "message": 'Invalid Credentials' })
        }
        const user = await bcrypt.compare(password, userExist.password)
        if (user) {
            await LoggedUser.deleteMany({});

            const user_details = await User.findOne({ email });

            if (user_details) {
                const { username, email } = user_details
                const userId = user_details._id
                const loggedUser = await LoggedUser.create({ username, email, userId })
            }
            res.json({ message: 'User Logged In' })
        } else {
            res.status(500).json({ msg: "Invalid email or password" })
        }
    } catch (error) {
        console.error(error)
    }
}

const checkUser = async (req, res) => {
    console.log('Api called')
    const user_exists = await LoggedUser.find({})
    if (user_exists.length) {
        return res.status(200).json({ message: true, user: user_exists })
    }
    res.status(401).json({ msg: "Unauthorized" })
}

const logout = async (req, res) => {
    try {
        const user_exists = await LoggedUser.deleteOne({})
        return res.status(200).json({ message: true })
    } catch (error) {
        res.status(500).message({ msg: "Unable to logout" })
    }
}

module.exports = { createuser, loginUser, getData, checkUser, logout }