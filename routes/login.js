const User = require("../models/User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
    try {
        return res.status(200).json({ result: "Auth success", error: false });
    } catch (error) {
        return res.status(403).json({ result: "Auth failed", error: false });
    }
});

module.exports = router;
