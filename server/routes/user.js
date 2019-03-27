const router = require("express").Router();
const userController = require("../controllers/userController");

//get all users data
router.get("/", userController.findAll);

//get one user data find by any
router.get("/find", userController.findOne);

//register new user
router.post("/register", userController.register);

//login a user
router.post("/login", userController.login);

module.exports = router;