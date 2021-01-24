const jwt = require("jsonwebtoken");
const config = require("config");

const authEmployee = async (req, res, next) => {
    const token = req.header("employeetoken");
    if (!token) return res.status(401).send("Invalid employee token");

    try {
        const decoded = await jwt.verify(
            token,
            config.get("jwtEmployeeSecret")
        );
        req.headers["employeeID"] = decoded["employeeID"];
        next();
    } catch (e) {
        res.status(403).json({ msg: "Token is not valid" });
    }
};

const authHR = async (req, res, next) => {
    const token = req.header("hrtoken");
    if (!token) {
        return res.status(401).send("Invalid token");
    }
    try {
        await jwt.verify(token, config.get("jwtHRSecret"));
        next();
    } catch (e) {
        res.status(403).json({ msg: "Token is not valid" });
    }
};

const authEmployeeOrHR = async (req, res, next) => {
    const hrtoken = req.header("hrtoken");
    const employeetoken = req.header("employeetoken");
    if (!hrtoken && !employeetoken) {
        return res.status(401).send("Invalid token");
    }
    try {
        if (hrtoken) {
            await jwt.verify(hrtoken, config.get("jwtHRSecret"));
        } else {
            const decoded = await jwt.verify(
                employeetoken,
                config.get("jwtEmployeeSecret")
            );
            req.headers["employeeID"] = decoded["employeeID"];
        }
        next();
    } catch (error) {
        res.status(403).json({ msg: "Invalid token" });
    }
};

module.exports = { authEmployee, authHR, authEmployeeOrHR };
