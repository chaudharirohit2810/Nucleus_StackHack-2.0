const router = require("express").Router();
const Attendance = require("../models/attendance");
const jwt = require("jsonwebtoken");
const config = require("config");
const { authEmployee } = require("../middleware/auth");

// const jwtUtils = require("../middleware");

router.route("/").get(authEmployee, async (req, res) => {
    try {
        const employeeId = req.headers["employeeID"];
        var record = await Attendance.findOne({ employeeId });
        if (record) {
            res.status(200).send(record);
        } else {
            throw Error("Record does not exists");
        }
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

router.route("/").post(authEmployee, async (req, res) => {
    try {
        const employeeId = req.headers["employeeID"];
        // console.log(req.body);
        var record = await Attendance.findOne({
            employeeId: employeeId,
        });

        if (record) {
            record = JSON.stringify(record);
            record = JSON.parse(record);
            await Attendance.findByIdAndUpdate(record._id, {
                presentDays: req.body.presentDays,
            });
        } else {
            const data = { employeeId, ...req.body };
            const attend = new Attendance(data);
            await attend.save();
        }
        res.status(200).send("Attendance Marked");
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

module.exports = router;
