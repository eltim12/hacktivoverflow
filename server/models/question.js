const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    content: String,
    createdAt: Date,
    votes: [
        {
            voteUserId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            status: Boolean
        }
    ],
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Answer"
        }
    ]
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
