const { Router } = require("express");
const verifyToken = require("../../midlewares/auth-midleware");
const TaskController = require("./task.controller");
const router = Router();

router.route("/tasks").post(TaskController.createTask);

router.route("/tasks").get(verifyToken, TaskController.getTasksByUser);

router
  .route("/tasks/:id")
  .delete(TaskController.deleteTask);

router.route("/tasks/update").post(TaskController.updateTask);

module.exports = router;
