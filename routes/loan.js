const Loan = require("../models/Loan");
const router = require("express").Router();
const { authEmployee, authHR } = require("../middleware/auth");
const Types = require("mongoose").Types;

router.route("/updateLoan").post(authHR, async (req, res) => {
    try {
        const { ID, status } = req.body;
        await Loan.updateOne({ _id: ID }, { $set: { status } });
        res.status(200).json({
            result: "Loan Status Updated !",
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to update Loan Status !",
            error: true,
        });
    }
});

router.route("/getAllLoans").get(authHR, async (req, res) => {
    try {
        await Loan.aggregate([
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
                        "Failed to fetch Loans, Error joining collections !",
                    error: true,
                });
            }
            res.status(200).json({ result: data, error: false });
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to fetch Loans !",
            error: true,
        });
    }
});

router.route("/getLoansByID").get(authEmployee, async (req, res) => {
    try {
        const employeeID = req.headers["employeeID"];
        const EID = Types.ObjectId(employeeID);
        const loans = await Loan.find({ employeeID: EID });
        res.status(200).json({
            result: loans,
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to fetch Loans !",
            error: true,
        });
    }
});

router.route("/request").post(authEmployee, async (req, res) => {
    try {
        const employeeID = req.headers["employeeID"];
        const { reason, amount, status } = req.body;
        const EID = Types.ObjectId(employeeID);
        const newLoan = new Loan({
            employeeID: EID,
            reason,
            amount,
            status,
        });
        newLoan
            .save()
            .then(p => res.json(p))
            .catch(error => console.log(error.message));
        res.status(200).json({
            result: "Loan Requested !",
            error: false,
        });
    } catch (error) {
        res.status(400).json({
            result: "Failed to request Loan !",
            error: true,
        });
    }
});

module.exports = router;
