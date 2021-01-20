const Loan = require("../models/Loan");
const router = require("express").Router();
const { authEmployee } = require("../middleware/auth");
const Types = require("mongoose").Types;

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
