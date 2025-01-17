const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema({
    date_id: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const Todo = new mongoose.model("Todo", toDoSchema)

module.exports = Todo