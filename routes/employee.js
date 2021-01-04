const Employee = require("../models/Employee");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

router.route("/login").post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const employee = await Employee.findOne({ username });
        if (employee) {
            const parsedEmployee = JSON.parse(JSON.stringify(employee));
            compareHashedPassword(password, parsedEmployee.password)
                .then(result => {
                    if (result)
                        return res
                            .status(200)
                            .json({ result: parsedEmployee, error: false });
                    else
                        return res.status(403).json({
                            result: "Invalid password !",
                            error: true,
                        });
                })
                .catch(error => console.log(error.message));
        } else {
            return res
                .status(403)
                .json({ result: "Employee is not registered !", error: true });
        }
    } catch (error) {
        return res.status(500).json({
            result: "Employee Login Failed !",
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
            team,
            role,
        } = req.body;
        const employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(409).send({
                result: "Employee Already Exists !",
                error: true,
            });
        } else {
            returnHashedPassowrd(password)
                .then(hashPassord => {
                    const newEmployee = new Employee({
                        username,
                        name,
                        email,
                        phone,
                        password: hashPassord,
                        team,
                        role,
                    });
                    newEmployee
                        .save()
                        .then(emp => res.json(emp))
                        .catch(error => console.log(error.message));
                })
                .catch(error => console.log(error.message));
            return res.status(200).json({
                result: "Employee Registeration Successful !",
                error: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            result: "Employee Registeration Failed !",
            error: true,
        });
    }
});

module.exports = router;
