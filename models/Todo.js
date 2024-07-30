// models/Todo.js
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please add a task"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
