const { Op } = require("sequelize");
const Category = require("../category/category.model");
const Task = require("./task.model");

class TaskRepository {
  async createTask(data, categoryIds) {
    const task = await Task.create(data);

    await task.addCategories(categoryIds);

    return task;
  }

  async getTasksByUser(userId) {
    return Task.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Category,
          as: "categories",
          through: { attributes: [] },
        },
      ],
    });
  }

  async getTasksByIds(ids){
    const result = await  Task.findAll({
      where: {
        id: {
          [Op.in]: ids, 
        },
      },
      include: [
        {
          model: Category,
          as: "categories",
          through: { attributes: [] },
        },
      ],
    });
    return result;
  }

  async updateTask(id, data) {
    const task = await Task.findByPk(id);
    return task.update(data);
  }

  async deleteTask(id) {
    const user = await Task.findByPk(id);
    return user.destroy();
  }

  async getTaskByCategoryId(categoryId) {
    const tasks = await Task.findAll({
      include: [
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
          required: false, 
        },
      ],
      where: {
        '$categories.id$': { [Op.in]: [categoryId] }
      },
    });
   const taskIds = tasks.map(item => item.dataValues.id);

   const result = await this.getTasksByIds(taskIds);

    return result;
  }
}

module.exports = TaskRepository;
