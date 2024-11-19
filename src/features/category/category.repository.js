const Category = require("./category.model");

class CategoryRepository {
  async createTask(data) {
    return await Category.create(data);
  }

  async getCategoriesByUser(userId) {
    return Category.findAll({
      include: [
        {
          association: "tasks",
          required: false,
          where: { user_id: userId },
        },
      ],
    });
  }

  async updateCategory(id, data) {
    const task = await Category.findByPk(id);
    return task.update(data);
  }

  async deleteCategory(id) {
    const user = await Category.findByPk(id);
    return user.destroy();
  }
}

module.exports = CategoryRepository;
