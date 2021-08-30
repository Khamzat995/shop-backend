const { Router } = require("express");
const { brandsController } = require("../controllers/brands.controller");

const router = Router();

router.post("/", brandsController.createBrand);
router.get("/", brandsController.allBrands);
router.get("/:id", brandsController.getBrandById);
router.patch("/:id", brandsController.editBrand);
router.delete("/:id", brandsController.removeBrand);

module.exports = router;
