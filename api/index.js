const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/auth-route');
const todo_router = require('./routes/todo-route');
const db = require('./utils/utils')

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true
  }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/', router)
app.use('/todo/', todo_router)

app.options('*', cors());
const PORT = 5000;  
db().then(() => app.listen(PORT, (req, res) => {
    console.log('Server is runningsss');
}))


module.exports = app