const taskRouter = require("express").Router(); // rediretion within app
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs"); // to handle file operations

// middlewares
taskRouter.use(bodyParser.urlencoded({ extended: false }));
taskRouter.use(bodyParser.json());

// controllers
const {
  getAllTasks,
  getTaskWithId,
  addTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.js");

// GET all tasks
taskRouter.route("/").get(getAllTasks);

// GET task with specific id
taskRouter.route("/:taskId").get(getTaskWithId); // ':' represents dynamic parameter which can change with request

// POST task
taskRouter.route("/").post(addTask);

// DELETE task with specific id
taskRouter.route("/:taskId").delete(deleteTask);

// UPDATE task with specific id
taskRouter.route("/:taskId").put(updateTask);

module.exports = taskRouter;
