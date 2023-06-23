const taskData = require("../tasks.json");

const getTasksWithPriority = (req, res) => {
  let tasks_arr = taskData.tasks_list;
  const priority = req.params.level;

  let result = tasks_arr.filter((task) => task.priority == priority);

  if (result.length === 0) {
    res.status(400).send(`No task found with priority: ${priority}`);
    return;
  }

  res.status(200).send(result);
};

module.exports = {
  getTasksWithPriority,
};
