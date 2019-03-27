const Question = require("../models/question");

module.exports = {
    create(req, res) {
        Question.create({
            userId: req.query.id,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date()
        })
            .then(createdQuestion => {
                res.status(201).json(createdQuestion);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    },

    findAll(req, res) {
        Question.find({})
            .populate("userId")
            .populate("votes.voteUserId")
            .then(allQuestions => {
                res.status(200).json(allQuestions);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    },

    findOne(req, res) {
        Question.findById(req.query.id)
            .populate("userId")
            .populate("votes.voteUserId")
            .then(foundQuestion => {
                res.status(200).json(foundQuestion);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    },

    edit(req, res) {
        console.log("QUERY: ", req.query.id);

        Question.findByIdAndUpdate(req.query.id, req.body)
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
        console.log("body", req.body, "query", req.query, "params", req.params);
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
            Question.findOneAndUpdate(
                {
                    _id: req.body.questionId
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
                .then(updatedQuestion => {
                    console.log("success update vote: ", vote);
                    res.status(200).json(updatedQuestion);
                })
                .catch(err => {
                    res.status(400).json({
                        msg: err
                    });
                });
        }
    },

    delete(req, res) {
        Question.findByIdAndDelete(req.query.id)
            .then(deletedQuestion => {
                res.status(200).json(deletedQuestion);
            })
            .catch(err => {
                res.status(400).json({
                    msg: err
                });
            });
    }
};
