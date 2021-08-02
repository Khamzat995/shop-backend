const { Router } = require("express");
const router = Router();

router.use(require("./brands.route"));
router.use(require("./cart.route"));
router.use(require("./categories.route"));
router.use(require("./products.route"));
router.use(require("./reviews.route"));
router.use(require("./users.route"));

module.exports = router;
