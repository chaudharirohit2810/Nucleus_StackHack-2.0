const Employee = require("../models/Employee");
const Attendance = require("../models/attendance");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const { authEmployee, authHR } = require("../middleware/auth");

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
    const token = req.body.headers["employeetoken"];
    if (!token) res.status(400).json({ result: false });
    try {
        await jwt.verify(token, config.get("jwtEmployeeSecret"));
        res.status(200).json({ result: true });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ result: false });
    }
});

router.route("/login").post(async (req, res) => {
    try {
        const { username, password } = req.body;
        const employee = await Employee.findOne({ username });
        if (employee) {
            const parsedEmployee = JSON.parse(JSON.stringify(employee));
            compareHashedPassword(password, parsedEmployee.password)
                .then(result => {
                    if (result) {
                        jwt.sign(
                            { employeeID: parsedEmployee._id },
                            config.get("jwtEmployeeSecret"),
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
                        res.status(403).json({
                            result: "Invalid password !",
                            error: true,
                        });
                })
                .catch(error => console.log(error.message));
        } else {
            res.status(403).json({
                result: "Employee is not registered !",
                error: true,
            });
        }
    } catch (error) {
        res.status(400).json({
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
            salary,
        } = req.body;
        const employee = await Employee.findOne({ username });
        if (employee) {
            res.status(409).send({
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
                        salary,
                    });
                    newEmployee
                        .save()
                        .then(emp => res.json(emp))
                        .catch(error => console.log(error.message));
                })
                .catch(error => console.log(error.message));
            res.status(200).json({
                result: "Employee Registeration Successful !",
                error: false,
            });
        }
    } catch (error) {
        res.status(400).json({
            result: "Employee Registeration Failed !",
            error: true,
        });
    }
});

router.route("/details/").get(authEmployee, async (req, res) => {
    try {
        const employeeID = req.headers["employeeID"];
        const employee = await Employee.findById(employeeID);
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.route("/hrdetails").get(authHR, async (req, res) => {
    try {
        const username = req.header("username");
        let employee = await Employee.findOne({ username });
        employee = JSON.stringify(employee);
        employee = JSON.parse(employee);

        let attendance = await Attendance.findOne({ employeeId: employee._id });
        attendance = JSON.stringify(attendance);
        attendance = JSON.parse(attendance);

        const data = {
            ...employee,
            attendanceData: {
                presentDays:
                    attendance !== undefined && attendance !== null
                        ? attendance.presentDays
                        : [],
            },
        };
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.route("/promote").put(authHR, async (req, res) => {
    try {
        const { salary, team, role } = req.body;
        const username = req.header("username");
        await Employee.findOneAndUpdate(
            { username },
            {
                salary: salary,
                team: team,
                role: role,
            }
        );
        res.status(200).send("Employee Promoted / Demoted!");
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});

router.route("/getTeamMembers").get(authEmployee, async (req, res) => {
    try {
        const { team, username } = req.headers;
        const members = await Employee.find({ team });
        if (members !== undefined && members !== null && members.length !== 0) {
            let newMembers = JSON.parse(JSON.stringify(members));
            let data = [];
            data = newMembers.filter(member => member.username !== username);
            res.status(200).json({
                result: data,
                error: false,
            });
        } else {
            res.status(200).json({
                result: [],
                error: false,
            });
        }
    } catch (error) {
        res.status(400).json({
            result: "Failed to fetch Employee Team Members !",
            error: true,
        });
    }
});

router.route("/updateProfile").post(authEmployee, async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const employeeID = req.headers["employeeID"];
        await Employee.findOneAndUpdate(
            { _id: employeeID },
            { name, email, phone }
        );
        res.status(200).json({
            result: "Updated your Profile !",
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to update your profile !",
            error: true,
        });
    }
});

router.route("/").get(authHR, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
