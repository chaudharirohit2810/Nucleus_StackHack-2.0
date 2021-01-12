const router = require("express").Router();
const FAQ = require("../models/faq");

router.route("/").post(async (req, res) => {
    try {
        var faq = new FAQ(req.body);
        await faq.save();
        res.status(200).send("FAQ Saved");
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.route("/").get(async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).send(faqs);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
