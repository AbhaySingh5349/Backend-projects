const fs = require("fs"); // to handle file operations
const path = require("path");
const taskData = require("../tasks.json");
const validator = require("../helpers/validator.js");
const generic_functions = require("../helpers/generic_functions.js");

const getCompletedTasks = () => {
  let tasks_arr = taskData.tasks_list;

  let completed_tasks_arr = tasks_arr.filter(
    (task) => task.is_completed == true
  );

  completed_tasks_arr.sort((first, second) => {
    let d1 = new Date(first.date);
    let d2 = new Date(second.date);

    return d1 < d2 ? -1 : 1;
  });

  return completed_tasks_arr;
};

const getAllTasks = (req, res) => {
  let queries = Object.keys(req.query); // storing "keys" of queries in URL

  if (queries.length > 0 && req.query.completed_status == 'true') {
    let result = getCompletedTasks(res);

    if (result.length === 0) {
      res.status(400).send("No task was completed");
    } else {
      res.status(200).send(result);
    }
    return;
  }

  res.status(200).send(taskData.tasks_list);
};

const getTaskWithId = (req, res) => {
  let tasks_arr = taskData.tasks_list;
  const req_task_id = req.params.taskId;

  let idx = generic_functions.checkIdExists(tasks_arr, req_task_id);
  if (idx === -1) {
    res.status(400).send(`Task ID ${req_task_id} not found`);
    return;
  }

  res.status(200).send(tasks_arr[idx]);
};

const addTask = (req, res) => {
  let tasks_arr = taskData.tasks_list;
  const task = req.body;

  let validation_obj = validator.validateTaskInfo(task, taskData);

  if (validation_obj.status) {
    const writePath = path.join(__dirname, "..", "tasks.json");

    tasks_arr.push(task);
    generic_functions.writeFileSync(writePath, JSON.stringify(taskData));
    res.status(200);
  } else {
    res.status(400);
  }

  res.send(validation_obj);
};

const deleteTask = (req, res) => {
  let tasks_arr = taskData.tasks_list;
  const req_task_id = req.params.taskId;

  const idx = generic_functions.checkIdExists(tasks_arr, req_task_id);
  if (idx === -1) {
    res.status(400).send(`Task ID ${req_task_id} not found`);
    return;
  }

  tasks_arr.splice(idx, 1);

  taskData.tasks_list = tasks_arr;

  const writePath = path.join(__dirname, "..", "tasks.json");
  generic_functions.writeFileSync(writePath, JSON.stringify(taskData));

  res.status(200).send(`Task ID ${req_task_id} deleted successfully`);
};

const updateTask = (req, res) => {
  let tasks_arr = taskData.tasks_list;
  const req_task_id = req.params.taskId;
  const task = req.body;

  const idx = generic_functions.checkIdExists(tasks_arr, req_task_id);
  if (idx === -1) {
    res.status(400).send(`Task ID ${req_task_id} not found`);
    return;
  }

  tasks_arr[idx] = task;
  taskData.tasks_list = tasks_arr;

  const writePath = path.join(__dirname, "..", "tasks.json");
  generic_functions.writeFileSync(writePath, JSON.stringify(taskData));

  res.status(200).send(`Task with ID ${req_task_id} updated successfully`);
};

module.exports = {
  getAllTasks,
  getTaskWithId,
  addTask,
  deleteTask,
  updateTask,
};
