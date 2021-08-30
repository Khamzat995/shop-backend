const { Router } = require("express");
const { categoriesController } = require("../controllers/categories.controller");

const router = Router();

router.post("/", categoriesController.createCategory);
//router.get("/", categoriesController.allCategories);
router.get("/:id", categoriesController.getCategoryById);
router.patch("/:id", categoriesController.editCategory);
router.delete("/:id", categoriesController.removeCategory);

module.exports = router;
