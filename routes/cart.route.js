const { Router } = require("express");
const { cartController } = require("../controllers/carts.controller");

const router = Router();

router.post("/user/cart", cartController.createCart);
router.post("/user/product/:id/cart", cartController.addProductInCart);
router.delete("/user/product/:id/cart", cartController.deleteProductInCart);

module.exports = router;
