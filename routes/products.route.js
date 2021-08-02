const { Router } = require("express");
const { productsController } = require("../controllers/products.controller");

const router = Router();

router.post("/admin/product", productsController.createProduct);
router.get("/user/products", productsController.getAllProducts);
router.get("/product/:id", productsController.getProductById);
router.get(
  "/products/category/:id",
  productsController.getProductsByCategoryId
);
router.get("/products/brand/:id", productsController.getProductsByBrandId);
router.patch("/admin/product/:id", productsController.editProduct);
router.delete("/admin/product/:id", productsController.removeProduct);

module.exports = router;
