const ToDo = require('../models/todo-model');

const createtodo = async (req, res) => {
    try {
        const { text } = req.body;
        const _id = new Date().toLocaleDateString().replaceAll('/', '-')
        console.log(_id)
        const todo = await ToDo.create({ date_id: _id, text, createdOn: new Date() })
        res.send(`Todo Successfully added, ${todo}`)
    } catch (error) {
        console.error(error);
        res.send('Something Went Wrong')
    }
}

const getTodo = async (req, res) => {
    try {
        const todos = await ToDo.find(); // Fetch all todos from the database
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
        const { id } = req.params; // Get the todo id from the route parameters
        const { text } = req.body; // Get the updated text from the request body

        console.log(`Updating todo with id: ${id}`);

        const todo = await ToDo.findOneAndUpdate(
            { _id: id }, // Find the todo by its id
            { text, updatedOn: new Date() }, // Update the text and optionally add a timestamp
            { new: true } // Return the updated document
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


module.exports = {createtodo, getTodo, deleteTodo, updateTodo}