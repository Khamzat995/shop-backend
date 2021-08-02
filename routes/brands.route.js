const { Router } = require("express");
const { brandsController } = require("../controllers/brands.controller");

const router = Router();

router.post("/admin/brand", brandsController.createBrand);
router.get("/brands", brandsController.getAllBrands);
router.get("/brand/:id", brandsController.getBrandById);
router.patch("/admin/brand/:id", brandsController.editBrand);
router.delete("/admin/brand/:id", brandsController.removeBrand);

module.exports = router;
