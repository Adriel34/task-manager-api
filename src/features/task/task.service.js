const TaskRepository = require("./task.repositoty");

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(data) {
    const { description, status, assignedTo, user_id, categoryIds } = data;
    const task = await this.taskRepository.createTask({
      description,
      status,
      assignedTo,
      user_id,
    }, categoryIds);
    return task;
  }

  async updateTask(data) {
    const { id, ...req } = data.body;
    const updatedTask = await this.taskRepository.updateTask(id, {...req});
    return updatedTask.dataValues;
  }

  async getTasksByUser(userId) {
    const tasks = await this.taskRepository.getTasksByUser(userId);
    return tasks;
  }

  async getTaskByCategoryId(categoryId){
    return this.taskRepository.getTaskByCategoryId(categoryId)
  }

  async deleteTask(id) {
    const task = await this.taskRepository.deleteTask(id);
    return task;
  }
}

module.exports = TaskService;
