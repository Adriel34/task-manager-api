const TaskService = require("./task.service");
const jwt = require("jsonwebtoken");

class TaskController {
  taskService = new TaskService();

  createTask = async (req, res)  => {
    const task = await this.taskService.createTask(req.body);
    return res.json(task);
  };

  updateTask = async (req, res) => {
    const updatedTask = await this.taskService.createTask(req.body);
    return res.json(updatedTask);
  };

  getTasksByUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    
    const decoded = jwt.verify(authHeader.split(' ')[1], "obuc");
    
    const user = await this.taskService.getTasksByUser(decoded.userId);
    return res.json(user);
  };

  deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await this.taskService.deleteTask(id);
    return res.json(task);
  };
}

module.exports = new TaskController();
