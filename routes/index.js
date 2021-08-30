const { Router } = require("express");
const router = Router();



router.use('/product', require("./products.route"));
router.use('/category', require("./categories.route"));
router.use('/brand', require("./brands.route"));
router.use('/', require("./users.route"));

module.exports = router;
