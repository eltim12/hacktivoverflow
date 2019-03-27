const router = require("express").Router();
const questionController = require("../controllers/questionController");
const { authenticate, authorize } = require("../middlewares/verify");

//create new question
router.post("/", authenticate, questionController.create);

//get all questions data
router.get("/", questionController.findAll);

//get one question data find by any
router.get("/find", questionController.findOne);

//edit a question
router.put("/edit", authenticate, questionController.edit);  //tambahin authorization, yang bisa update or delete hanya yang membuat question tersesbut

//vote a question
router.put("/", authenticate, questionController.vote);

//delete a question
router.delete("/", authenticate, questionController.delete);

module.exports = router;
