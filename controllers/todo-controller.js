const ToDo = require('../models/todo-model');

const createtodo = async (req, res) => {
    try {
        console.log(req.body)
        const { text, userId } = req.body;
        const _id = new Intl.DateTimeFormat('en-GB').format(new Date()).replace(/\//g, '-');
        console.log(_id)
        const todo = await ToDo.create({ date_id: _id, text, createdOn: new Date(), userId })
        res.send(`Todo Successfully added, ${todo}`)
    } catch (error) {
        console.error(error);
        res.send('Something Went Wrong')
    }
}

const getTodo = async (req, res) => {
    try {
        // console.log(req.query)
        const { userId, date_id } = req.query;
        if (!date_id) {
            return res.status(500).json({ message: "Something went wrong. Please check the date" })
        }

        const todos = await ToDo.find({ date_id, userId });
        res.status(200).json({ message: "Todos fetched successfully", data: todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params; // Get the todo id from the route parameters
        console.log(`Deleting todo with id: ${id}`);
        const todo = await ToDo.findOneAndDelete({ _id: id });
        if (!todo) {
            return res.status(404).send(`Todo with id ${id} not found.`);
        }
        res.status(200).json({ message: "Todos deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while deleting the todo.');
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;


        const todo = await ToDo.findOneAndUpdate(
            { _id: id },
            { text, updatedOn: new Date() },
            { new: true }
        );

        if (!todo) {
            return res.status(404).send(`Todo with id ${id} not found.`);
        }

        res.status(200).json({ message: "Todo updated successfully", data: todo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong while updating the todo.');
    }
};

const isComplete = async (req, res) => {
    try {
        const { _id, isActive } = req.body
        const todo = await ToDo.findOneAndUpdate(
            { _id },
            { isActive: !isActive },
            { new: true }
        );
        if (!todo) {
            return res.status(404).send(`Todo with id ${_id} not found.`);
        }

        res.status(200).json({ message: "Todo updated successfully", data: todo });
    } catch (error) {

    }
}


module.exports = { createtodo, getTodo, deleteTodo, updateTodo, isComplete }