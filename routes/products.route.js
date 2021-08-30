const { Router } = require("express");
const { productsController } = require("../controllers/products.controller");

const router = Router();


router.get("/", productsController.allProducts);
router.get("/:id", productsController.getProductId);
router.get("/category/:id", productsController.getProductCat);
router.get("/brand/:id", productsController.getProductBrand);
router.post("/admin/product", productsController.createProduct);
router.patch("/admin/product/:id", productsController.editProduct);
router.delete("/admin/product/:id", productsController.removeProduct);
router.get("/admin/user/:productId", productsController.takeProduct);

module.exports = router;
