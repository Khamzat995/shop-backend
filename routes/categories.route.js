const { Router } = require("express");
const {
  categoriesController,
} = require("../controllers/categories.controller");

const router = Router();

router.post("/admin/category", categoriesController.createCategory);
router.get("/user/categories", categoriesController.getAllCategories);
router.get("/user/category/:id", categoriesController.getCategoryById);
router.patch("/admin/category/:id", categoriesController.editCategory);
router.delete("/admin/category/:id", categoriesController.removeCategory);

module.exports = router;
