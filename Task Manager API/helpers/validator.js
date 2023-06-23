class validator {
  static validateTaskInfo(taskInput, taskData) {
    // if object has key with given property name & id is unique
    if (
      !taskInput.hasOwnProperty("id") ||
      !taskInput.hasOwnProperty("description") ||
      !taskInput.hasOwnProperty("is_completed")
    ) {
      return {
        status: false,
        message: "data is malformed, please provide all details",
      };
    }

    if (!this.validateUniqueTaskId(taskInput, taskData)) {
      return {
        status: false,
        message: "task id has to be unique",
      };
    }
    return {
      status: true,
      message: "new task added successfully",
    };
  }

  static validateUniqueTaskId(taskInput, taskData) {
    let valueFound = taskData.tasks_list.some(
      (task) => task.id == taskInput.id
    );

    if (valueFound) return false;
    return true;
  }
}

module.exports = validator;
