const express = require("express");
const router = express.Router();
const { isAuth } = require("../util/auth");

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", isAuth, userController.logout);
router.post("/refresh-token", userController.refreshToken);

router.get("/data-table", isAuth, userController.getDataTable);
router.post("/avatar/:id", isAuth, userController.changeAvatar);
router.get("/", isAuth, userController.userAll);
router.get("/:id", isAuth, userController.userOne);
router.put("/:id", isAuth, userController.userUpdate);
router.delete("/:id", isAuth, userController.userDelete);

module.exports = router;
