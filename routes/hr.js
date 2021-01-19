const HR = require("../models/HR");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

async function compareHashedPassword(password, dbpassword) {
    try {
        const compared = await bcrypt.compare(password, dbpassword);
        return compared;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

async function returnHashedPassowrd(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error.message);
        return password;
    }
}

router.route("/verify").post(async (req, res) => {
    const token = req.body.headers["hrtoken"];
    if (!token) return res.status(400).json({ result: false });
    try {
        await jwt.verify(token, config.get("jwtHRSecret"));
        return res.status(200).json({ result: true });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ result: false });
    }
});

router.route("/login").post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const employee = await HR.findOne({ username });
        if (employee) {
            const parsedEmployee = JSON.parse(JSON.stringify(employee));
            compareHashedPassword(password, parsedEmployee.password)
                .then(result => {
                    if (result) {
                        jwt.sign(
                            { hrID: parsedEmployee._id },
                            config.get("jwtHRSecret"),
                            { expiresIn: 36000 },
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({
                                    result: { parsedEmployee, token },
                                    error: false,
                                });
                            }
                        );
                    } else
                        return res.status(403).json({
                            result: "Invalid password !",
                            error: true,
                        });
                })
                .catch(error => console.log(error.message));
        } else {
            return res
                .status(403)
                .json({ result: "HR is not registered !", error: true });
        }
    } catch (error) {
        return res.status(500).json({
            result: "HR Login Failed !",
            error: true,
        });
    }
});

router.route("/register").post(async (req, res) => {
    try {
        const {
            username,
            name,
            email,
            phone,
            password,
            confirmPassword,
        } = req.body;
        const employee = await HR.findOne({ email });
        if (employee) {
            return res.status(409).send({
                result: "HR Already Exists !",
                error: true,
            });
        } else {
            returnHashedPassowrd(password)
                .then(hashPassord => {
                    const newEmployee = new HR({
                        username,
                        name,
                        email,
                        phone,
                        password: hashPassord,
                    });
                    newEmployee
                        .save()
                        .then(emp => res.json(emp))
                        .catch(error => console.log(error.message));
                })
                .catch(error => console.log(error.message));
            return res.status(200).json({
                result: "HR Registeration Successful !",
                error: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            result: "HR Registeration Failed !",
            error: true,
        });
    }
});

module.exports = router;
