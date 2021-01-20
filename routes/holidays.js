const router = require("express").Router();
const { authEmployeeOrHR, authHR } = require("../middleware/auth");
const Holiday = require("../models/holiday");

router.route("/").get(authEmployeeOrHR, async (req, res) => {
    try {
        const records = await Holiday.find({});
        res.status(200).send(records);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.route("/").post(authHR, async (req, res) => {
    try {
        var holidayItem = new Holiday(req.body);
        await holidayItem.save();
        res.status(200).send("Holiday Saved Successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
