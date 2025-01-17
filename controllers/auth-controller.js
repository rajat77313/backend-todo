const User = require('../models/user-model')
const ToDo = require('../models/todo-model')
const bcrypt = require('bcryptjs')

const getData = async (req, res) => {
    res.json({ message: 'Some Data from Backend' });
}

const createuser = async (req, res) => {
    console.log('REQUEST', req.body)
    try {
        const { username, email, password } = req.body;
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(500).send('User already exists.')
        }
        const user = await User.create({ username, email, password })
        res.json({message: 'User Created'})

    } catch (error) {
        console.error(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email })

        if (!userExist) {
            return res.status(500).send('Invalid Credentials')
        }
        const user = await bcrypt.compare(password, userExist.password)
        if (user) {
            res.json({message: 'User Logged In'})
        } else {
            res.status(500).json({ msg: "Invalid email or password" })
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {createuser, loginUser, getData }