const mongoose = require("mongoose");
let toSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
    maxLength: 50,
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Todo = new mongoose.model("Todo", toSchema);
module.exports = Todo;
