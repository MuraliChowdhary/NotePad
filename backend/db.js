const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Todo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error: ', err));

const schemaTodo = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    id:String
});

const TodoSchema = mongoose.model("Todo", schemaTodo);

module.exports = { TodoSchema };
