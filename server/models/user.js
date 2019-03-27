const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("../helpers/bcrypt");

const userSchema = new Schema({
    name: {
        type: String,
        minlength: [4, "name must be at least 4 characters long"]
    },

    email: {
        type: String,
        validate: [
            {
                validator: function(value) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
                },
                message: "invalid email format"
            },
            {
                isAsync: true,
                validator: function(value, callback) {
                    User.findOne({ email: value })
                        .then(user => {
                            if (user && user._id.toString() != this._id.toString()) {
                                callback(false);
                            } else {
                                callback(true);
                            }
                        })
                        .catch(err => {
                            throw err;
                        });
                },
                message: "email taken, please choose another email."
            }
        ]
    },

    password: {
        type: String,
        minlength: [6, "password must be at least 6 character long"]
    }
});

userSchema.pre("save", function(next) {
    this.password = bcrypt.encrypt(this.password);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
