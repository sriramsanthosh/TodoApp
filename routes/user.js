const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.post("/sign-up-session", userController.signUpSession);
router.post("/sign-in-session", userController.signInSession);
router.get("/sign-in-session", userController.signInSession);
router.post("/user-profile", userController.userProfile);
router.get("/sign-out", userController.signOut);
router.post("/sign-in/add-task", userController.addTask);
// router.get("/user/sign-in-session", userController.signIn);
router.post("/sign-in/delete-task", userController.deleteTask);

module.exports = router;