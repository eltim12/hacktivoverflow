const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("../helpers/bcrypt");
const env = require("dotenv").config()

module.exports = {
    findAll(req, res) {
        User.find({})
            .then(allUsers => {
                res.status(200).json(allUsers);
            })
            .catch(err => {
                console.log("error!!", err);
                res.status(400).json({
                    msg: err
                });
            });
    },

    findOne(req, res) {
        let key = req.body.key;
        let val = req.body.val;
        User.findById(req.query.id)
            .then(userFound => {
                res.status(200).json(userFound);
            })
            .catch(err => {
                console.log("error!!", err);
                res.status(400).json({
                    msg: err
                });
            });
    },

    register(req, res) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(createdUser => {
                res.status(201).json(createdUser);
            })
            .catch(err => {
                console.log("error!!", err);
                res.status(400).json({
                    msg: err
                });
            });
    },

    login(req, res) {
        console.log(req.body);
        User.findOne({
            email: req.body.email
        })
            .then(userFound => {
                if (!userFound) {
                    throw new Error("email/password wrong.");
                } else {
                    if (bcrypt.compare(req.body.password, userFound.password) === false) {
                        throw new Error("email/password wrong.");
                    } else {
                        let token = jwt.sign({ userFound }, process.env.SECRET_KEY);
                        res.status(200).json({
                            token,
                            userId: userFound._id,
                            role: userFound.role
                        });
                    }
                }
            })
            .catch(err => {
                console.log(err.message);
                res.status(500).json({
                    msg: err.message
                });
            });
    }
};
