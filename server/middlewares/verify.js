const jwt = require("jsonwebtoken");

module.exports = {
    authorize: (req, res, next) => {
        let decoded = jwt.decode(req.headers.token);

        if (decoded.userFound.role !== "admin") {
            res.status(403).json({
                message: "user not authorized."
            });
        } else {
            next();
        }
    },

    authenticate: (req, res, next) => {
        jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, data) => {
            console.log("masok authentication", req.headers.token);
            if (err) {
                res.status(403).json({
                    message: "user not authenticated."
                });
            } else {
                console.log("success authenticated");
                next();
            }
        });
    }
};
