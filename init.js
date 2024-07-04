const mongoose = require("mongoose");
const Todo = require("./models/todo");
main()
  .then(() => {
    console.log("Connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/todo");
}

let allTodo = [
  {
    task: "Swimming Time",
    created_at: new Date(),
  },
  {
    task: "Reading time",
    created_at: new Date(),
  },
  {
    task: "Tv Time",
    created_at: new Date(),
  },
  {
    task: "Sleeping time",
    created_at: new Date(),
  },
  {
    task: "Go and Study",
    created_at: new Date(),
  },
  {
    task: "Coding time",
    created_at: new Date(),
  },
  {
    task: "Reels time",
    created_at: new Date(),
  },
];

Todo.insertMany(allTodo).then(() => {
  console.log("All todos are inserted successfully!");
});
