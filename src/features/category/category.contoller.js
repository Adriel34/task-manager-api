const CategoryService = require("./category.service");
const jwt = require("jsonwebtoken");


class CategoryController {
  categoryService = new CategoryService();

  createCategory = async (req, res)  => {
    const category = await this.categoryService.createCategory(req.body);
    return res.json(category);
  };

  updateCategory = async (req, res) => {
    const updatedCategory = await this.categoryService.updateCategory(req.body);
    return res.json(updatedCategory);
  };

  getCategoryByUser = async (req, res) => {
    console.log('ESTOU NO CONTROLLER')
    const authHeader = req.headers['authorization'];
    
  
    const decoded = jwt.verify(authHeader.split(' ')[1], "obuc");
    const category = await this.categoryService.getCategoriesByUser(decoded.userId);
    return res.json(category);
  };

  deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await this.categoryService.deleteCategory(id);
    return res.json(category);
  };
}

module.exports = new CategoryController();
