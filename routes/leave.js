const router = require("express").Router();
const Leave = require("../models/Leave");
const Types = require("mongoose").Types;

router.route("/getByEmployee").get(async (req, res) => {
    try {
        const employeeID = Types.ObjectId(req.headers.employeeid);
        const employeeLeaves = await Leave.findOne({
            employeeID,
        });
        if (employeeLeaves !== undefined && employeeLeaves !== null) {
            return res.status(200).json({
                result: employeeLeaves,
                error: false,
            });
        } else {
            return res.status(200).json({
                result: {},
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
        const { employeeID, leaveData } = req.body;
        const EID = Types.ObjectId(employeeID);
        const existLeave = await Leave.findOne({
            employeeID: EID,
        });
        if (existLeave !== undefined && existLeave !== null) {
            let parsedExistLeave = JSON.parse(JSON.stringify(existLeave));
            const id = parsedExistLeave._id;
            let leaves = parsedExistLeave.leaveData;
            leaves.push(leaveData);
            await Leave.updateOne({ _id: id }, { $set: { leaveData: leaves } });
            return res.status(200).json({
                result: "Leave Submitted !",
                error: false,
            });
        } else {
            let leaves = [];
            leaves.push(leaveData);
            const newLeave = new Leave({
                employeeID: EID,
                leaveData: leaves,
            });
            newLeave
                .save()
                .then(p => res.json(p))
                .catch(error => console.log(error.message));
            return res.status(200).json({
                result: "Leave Submitted !",
                error: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            result: "Leave was not added !",
            error: true,
        });
    }
});

module.exports = router;
