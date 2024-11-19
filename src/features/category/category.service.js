const TaskService = require("../task/task.service");
const CategoryRepository = require("./category.repository");

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.taskService = new TaskService();
  }

  async createCategory(data) {
    const { name } = data;
    const category = await this.categoryRepository.createTask({ name });
    return category;
  }

  async updateCategory(data) {
    const { id, ...req } = data;
    const updatedCategory = await this.categoryRepository.updateCategory(id, {
      ...req,
    });
    return updatedCategory.dataValues;
  }

  async getCategoriesByUser(userId) {
    const categories = await this.categoryRepository.getCategoriesByUser(
      userId
    );
    return categories;
  }

  async deleteCategory(id) {
    const tasksWithCategory = await this.taskService.getTaskByCategoryId(id);
    if (tasksWithCategory && tasksWithCategory.length > 0) {
      tasksWithCategory.forEach((task) => {
        const categoryIndex = task.dataValues.categories.findIndex(
          (category) => category.id === id
        );

        if (categoryIndex !== -1) {
          if (task.dataValues.categories.length === 1) {
            this.taskService.deleteTask(task.id);
          } else {
            task.dataValues.categories.splice(categoryIndex, 1);
            this.taskService.updateTask({body: task.dataValues});
          }
        } else {
          this.taskService.updateTask(task.dataValues);
        }
      });
    }

    const category = await this.categoryRepository.deleteCategory(id);

    return category;
  }
}

module.exports = CategoryService;
