const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const PORT = 3036;
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connected To Database!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/todo");
}

// let todo1 = new Todo({
//   task: "Play Cricket",
// });

// todo1.save().then(() => {
//   console.log("Inserted");
// });

app.get("/todo", async (req, res) => {
  let Todos = await Todo.find();
  // console.log(Todos);
  res.render("index.ejs", { Todos });
});

app.get("/todo/new", async (req, res) => {
  res.render("new.ejs");
});

app.post("/todo", (req, res) => {
  let { task } = req.body;
  // console.log(task);
  // res.send("Working");
  let newTask = new Todo({
    task: task,
    created_at: new Date(),
  });

  newTask
    .save()
    .then(() => [console.log("Task inserted successfully!")])
    .catch((err) => console.log(err));
  res.redirect("/todo");
});

app.get("/todo/:id/edit", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let Todos = await Todo.findById(id);
  // console.log(Todos);
  // res.send("working");
  res.render("edit.ejs", { Todos });
});

app.put("/todo/:id", async (req, res) => {
  let { id } = req.params;
  let { newTask } = req.body;
  console.log(newTask);
  let updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { task: newTask },
    {
      runValidators: true,
      new: true,
    }
  );
  console.log(updatedTodo);
  res.redirect("/todo");
});

app.delete("/todo/:id", async (req, res) => {
  let { id } = req.params;
  let deletedTodo = await Todo.findByIdAndDelete(id);
  console.log(deletedTodo);
  res.redirect("/todo");
});

app.listen(PORT, () => {
  console.log(`The Server is Listening at http://localhost:${PORT}/todo`);
});
