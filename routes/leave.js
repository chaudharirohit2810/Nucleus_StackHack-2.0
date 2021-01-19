const router = require("express").Router();
const Leave = require("../models/Leave");
const Types = require("mongoose").Types;
// const jwtUtils = require("../middleware");

router.route("/updateStatus").post(async (req, res) => {
    try {
        const { ID, status } = req.body;
        await Leave.updateOne({ _id: ID }, { $set: { status } });
        return res.status(200).json({
            result: "Leave Updated !",
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            result: "Failed to update Leave !",
            error: true,
        });
    }
});

router.route("/getAllLeaves").get(async (req, res) => {
    try {
        await Leave.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "employeeID",
                    foreignField: "_id",
                    as: "employeeData",
                },
            },
        ]).exec(function (err, data) {
            if (err) {
                res.status(500).json({
                    result:
                        "Failed to fetch Leaves, Error joining collections !",
                    error: true,
                });
            }
            res.status(200).json({ result: data, error: false });
        });
    } catch (error) {
        return res.status(500).json({
            result: "Failed to fetch Leaves !",
            error: true,
        });
    }
});

router.route("/getByEmployee").get(async (req, res) => {
    try {
        const employeeID = Types.ObjectId(req.headers.employeeid);
        const employeeLeaves = await Leave.find({
            employeeID,
        });
        if (employeeLeaves !== undefined && employeeLeaves !== null) {
            return res.status(200).json({
                result: employeeLeaves,
                error: false,
            });
        } else {
            return res.status(200).json({
                result: [],
                error: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            result: "Failed to fetch Leaves !",
            error: true,
        });
    }
});

router.route("/add").post(async (req, res) => {
    try {
        const { employeeID, reason, status, startDate, endDate } = req.body;
        const EID = Types.ObjectId(employeeID);
        const newLeave = new Leave({
            employeeID: EID,
            reason,
            status,
            startDate,
            endDate,
        });
        newLeave
            .save()
            .then(p => res.json(p))
            .catch(error => console.log(error.message));
        return res.status(200).json({
            result: "Leave Submitted !",
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            result: "Leave was not added !",
            error: true,
        });
    }
});

module.exports = router;
