const { Router } = require("express");
const verifyToken = require("../../midlewares/auth-midleware");
const CategoryController = require("./category.contoller");

const router = Router();

router
  .route("/categories")
  .get(verifyToken, CategoryController.getCategoryByUser)
  .post(verifyToken, CategoryController.createCategory);

router
  .route("/categories/:id")
  .delete(verifyToken, CategoryController.deleteCategory);

router
  .route("/categories/update")
  .patch(verifyToken, CategoryController.updateCategory);

module.exports = router;
