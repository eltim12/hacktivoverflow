const router = require("express").Router();
const answerController = require("../controllers/answerController");
const { authenticate, authorize } = require("../middlewares/verify");

//create new answer
router.post("/", authenticate, answerController.create);

//get all answers data
router.get("/", answerController.findAll);

//get one answer data find by id
router.get("/find", answerController.findOne);

//get one answer data find by question id
router.get("/questionFind", answerController.findByQuestion);

//update an answer
router.put("/edit", authenticate, answerController.edit); //tambahin authorization, yang bisa update or delete hanya yang membuat question tersesbut

//vote an answer
router.put("/", authenticate, answerController.vote);

//delete an answer
router.delete("/", authenticate, answerController.delete);

module.exports = router;
