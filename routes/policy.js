const Policy = require("../models/Policy");
const router = require("express").Router();

router.route("/add").post(async (req, res) => {
    try {
        const { policyData } = req.body;
        const policy = await Policy.find();
        if (policy !== undefined && policy !== null && policy.length !== 0) {
            const id = policy[0]._id;
            await Policy.updateOne({ _id: id }, { $set: { policyData } });
            return res.status(200).json({
                result: "Policy Updated !",
                error: false,
            });
        } else {
            const newPolicy = new Policy({
                policyData,
            });
            newPolicy
                .save()
                .then(p => res.json(p))
                .catch(error => console.log(error.message));
            return res.status(200).json({
                result: "Policy Saved !",
                error: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            result: "Policy was not saved !",
            error: true,
        });
    }
});

router.route("/get").get(async (req, res) => {
    try {
        const policy = await Policy.find();
        if (policy !== undefined && policy !== null && policy.length !== 0) {
            return res.status(200).json({
                result: policy[0],
                error: false,
            });
        } else {
            return res.status(200).json({
                result: "",
                error: false,
            });
        }
    } catch (error) {
        return res.status(500).json({
            result: "",
            error: true,
        });
    }
});

module.exports = router;
