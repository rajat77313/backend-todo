const mongoose = require('mongoose')


// const URI = 'mongodb://127.0.0.1:27017/login'

const URI = 'mongodb+srv://rjrajat77:qwertyuiop@cluster0.r3r7k.mongodb.net/to_do_application?retryWrites=true&w=majority&appName=Cluster0'


const db = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected')
    } catch (error) {
        console.error('Db Connection Failed');
        process.exit(0)
    }
}

module.exports = db;