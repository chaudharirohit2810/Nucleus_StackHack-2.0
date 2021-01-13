const router = require("express").Router();
const Attendance = require("../models/attendance");

router.route("/:id").get(async (req, res) => {
    try {
        const employeeId = req.params.id;
        var record = await Attendance.findOne({ employeeId });
        if (record) {
            res.status(200).send(record);
        } else {
            throw Error("Record does not exists");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.route("/").post(async (req, res) => {
    try {
        // console.log(req.body);
        var record = await Attendance.findOne({
            employeeId: req.body.employeeId,
        });

        if (record) {
            record = JSON.stringify(record);
            record = JSON.parse(record);
            await Attendance.findByIdAndUpdate(record._id, {
                presentDays: req.body.presentDays,
            });
        } else {
            const attend = new Attendance(req.body);
            await attend.save();
        }
        res.status(200).send("Attendance Marked");
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

module.exports = router;
