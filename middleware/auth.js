const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
    const token = req.header("employeetoken");
    if (!token) return res.status(401);

    try {
        const decoded = jwt.verify(token, config.get("jwtEmployeeSecret"));

        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(400).json({ msg: "Token is not valid" });
    }
};

module.exports = { auth };
