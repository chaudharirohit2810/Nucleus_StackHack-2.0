const router = require("express").Router();
const { authEmployeeOrHR, authHR } = require("../middleware/auth");
const FAQ = require("../models/faq");

router.route("/").post(authHR, async (req, res) => {
    try {
        var faq = new FAQ(req.body);
        await faq.save();
        res.status(200).send("FAQ Saved");
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.route("/").get(authEmployeeOrHR, async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).send(faqs);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
