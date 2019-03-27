require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
let nodemailer = require("nodemailer");
const User = require("./models/user");
const app = express();
const env = require("dotenv").config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS
    }
});

let allUserEmails = [];

User.find({}).then(data => {
    data.map(e => {
        allUserEmails.push(e);
    });
});

cron.schedule("* * * * Friday", function() {
    console.log("---------------------");
    console.log("cron job berjalan");

    allUserEmails.map(e => {
        let mailOptions = {
            from: "wstorm248@gmail.com",
            to: e,
            subject: `Happy friday!`,
            text: `Hi there, its weekend now and happy weekend!`
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                throw error;
            } else {
                console.log("Email successfully sent!");
            }
        });
    });
});

const port = 3000;

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// mongoose.connect("mongodb://localhost/stack-overflow", { useNewUrlParser: true });
mongoose.connect(`mongodb+srv://eltim:${process.env.MONGO_PASSWORD}@cluster0-sfchz.gcp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

//routes register
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
const answerRoutes = require("./routes/answer");

//for user
app.use("/users", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);

module.exports = app;
app.listen(port, () => console.log("listening on port" + port));
