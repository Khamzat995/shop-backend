const { Router } = require("express");
const { userController } = require("../controllers/users.controller");

const router = Router();

router.post("/user", userController.createUser);
router.get("/users", userController.getAllUser);
router.patch("/user/:id", userController.editUser);
router.delete("/user/:id", userController.removeUser);

module.exports = router;
