const Bonus = require("../models/Bonus");
const router = require("express").Router();
const { authEmployee, authHR } = require("../middleware/auth");
const Types = require("mongoose").Types;

router.route("/updateBonus").post(authHR, async (req, res) => {
    try {
        const { ID, status } = req.body;
        await Bonus.updateOne({ _id: ID }, { $set: { status } });
        res.status(200).json({
            result: "Bonus Status Updated !",
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to update Bonus Status !",
            error: true,
        });
    }
});

router.route("/getAllBonus").get(authHR, async (req, res) => {
    try {
        await Bonus.aggregate([
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
                res.status(400).json({
                    result:
                        "Failed to fetch Bonus, Error joining collections !",
                    error: true,
                });
            }
            res.status(200).json({ result: data, error: false });
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to fetch Bonus !",
            error: true,
        });
    }
});

router.route("/getBonusByID").get(authEmployee, async (req, res) => {
    try {
        const employeeID = req.headers["employeeID"];
        const EID = Types.ObjectId(employeeID);
        const bonus = await Bonus.find({ employeeID: EID });
        res.status(200).json({
            result: bonus,
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to fetch bonus !",
            error: true,
        });
    }
});

router.route("/lend").post(authHR, async (req, res) => {
    try {
        const { reason, amount, status, employeeID } = req.body;
        const EID = Types.ObjectId(employeeID);
        const newBonus = new Bonus({
            employeeID: EID,
            reason,
            amount,
            status,
        });
        newBonus
            .save()
            .then(p => res.json(p))
            .catch(error => console.log(error.message));
        res.status(200).json({
            result: "Bonus Approved !",
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to approve Bonus !",
            error: true,
        });
    }
});

router.route("/request").post(authEmployee, async (req, res) => {
    try {
        const employeeID = req.headers["employeeID"];
        const { reason, amount, status } = req.body;
        const EID = Types.ObjectId(employeeID);
        const newBonus = new Bonus({
            employeeID: EID,
            reason,
            amount,
            status,
        });
        newBonus
            .save()
            .then(p => res.json(p))
            .catch(error => console.log(error.message));
        res.status(200).json({
            result: "Bonus Requested !",
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to request Bonus !",
            error: true,
        });
    }
});

module.exports = router;
