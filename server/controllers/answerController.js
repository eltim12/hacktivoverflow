const Answer = require("../models/answer");

module.exports = {
    create(req, res) {
        Answer.create({
            userId: req.body.userId,
            content: req.body.content,
            createdAt: new Date(),
            questionId: req.query.questionId
        })
            .then(createdAnswer => {
                res.status(201).json(createdAnswer);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    },

    findAll(req, res) {
        Answer.find({})
            .populate("userId")
            .populate("votes.voteUserId")
            .then(allAnswers => {
                res.status(200).json(allAnswers);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    },

    findOne(req, res) {
        Answer.findById(req.query.id)
            .populate("userId")
            .populate("votes.voteUserId")
            .then(foundAnswer => {
                res.status(200).json(foundAnswer);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    },

    findByQuestion(req, res) {
        let answers = [];
        Answer.find({})
            .populate("userId")
            .populate("votes.voteUserId")
            .then(allAnswers => {
                allAnswers.map(e => {
                    if (e.questionId.toString() === req.query.id) {
                        answers.push(e);
                    }
                });
                res.status(200).json(answers);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    },

    edit(req, res) {
        console.log("QUERY: ", req.query.id);

        Answer.findByIdAndUpdate(req.query.id, req.body)
            .then(updated => {
                console.log("BODY:", updated);
                res.status(200).json(updated);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    },

    vote(req, res) {
        if (req.body.vote !== "true" && req.body.vote !== "false") {
            res.status(400).json({
                msg: "wrong input type."
            });
        } else {
            let vote = "";
            if (req.body.vote === "true") {
                vote = true;
            } else {
                vote = false;
            }
            Answer.findOneAndUpdate(
                {
                    _id: req.body.answerId
                },
                {
                    $push: {
                        votes: {
                            voteUserId: req.query.userId,
                            status: vote
                        }
                    }
                }
            )
                .then(updatedAnswer => {
                    console.log("success update answer vote");
                    res.status(200).json(updatedAnswer);
                })
                .catch(err => {
                    res.status(400).json({
                        msg: err
                    });
                });
        }
    },

    delete(req, res) {
        Answer.findByIdAndDelete(req.query.id)
            .then(deletedAnswer => {
                res.status(200).json(deletedAnswer);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    }
};
