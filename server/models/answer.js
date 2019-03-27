const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    createdAt: Date,
    questionId: { type: Schema.Types.ObjectId, ref: "Question" },
    votes: [
        {
            voteUserId: { type: Schema.Types.ObjectId, ref: "User" },
            status: Number
        }
    ]
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
