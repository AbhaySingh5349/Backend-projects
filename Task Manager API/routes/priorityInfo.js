const priorityRouter = require("express").Router(); // rediretion within app

// controllers
const { getTasksWithPriority } = require("../controllers/priority.js");

// GET task based on priorities
priorityRouter.route("/:level").get(getTasksWithPriority);

module.exports = priorityRouter;
