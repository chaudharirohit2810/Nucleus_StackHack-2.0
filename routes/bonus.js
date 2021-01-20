const Bonus = require("../models/Bonus");
const router = require("express").Router();
const { authEmployee } = require("../middleware/auth");
const Types = require("mongoose").Types;

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
