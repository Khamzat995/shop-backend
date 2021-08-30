const { Router } = require("express");
const { userController } = require("../controllers/users.controller");

const router = Router();

router.post("/user", userController.createUser);
router.get("/user/:id?", userController.getUserId);
router.patch("/user/:id", userController.editUser);
router.delete("/user/:id", userController.removeUser);
router.get("/users/:userId/buyProduct/:bookId", userController.buyProduct);
router.get("/users/:userId/returnProduct/:bookId", userController.returnProduct);



module.exports = router;
