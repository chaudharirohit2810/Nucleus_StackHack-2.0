const router = require("express").Router();
const Team = require("../models/team");
const Role = require("../models/role");
const { authEmployeeOrHR, authHR } = require("../middleware/auth");

router.route("/").get(async (req, res) => {
    try {
        const teams = await Team.findOne();
        const roles = await Role.findOne();
        res.status(200).send({ teams, roles });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.route("/team").put(authHR, async (req, res) => {
    try {
        let teams = await Team.findOne();
        if (!teams) {
            const team = new Team(req.body);
            await team.save();
        } else {
            teams = JSON.stringify(teams);
            teams = JSON.parse(teams);
            const result = await Team.findByIdAndUpdate(teams._id, req.body);
        }
        res.status(200).send("Teams updated successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.route("/role").put(authHR, async (req, res) => {
    try {
        let roles = await Role.findOne();
        if (!roles) {
            const role = new Role(req.body);
            await role.save();
        } else {
            roles = JSON.stringify(roles);
            roles = JSON.parse(roles);
            const result = await Role.findByIdAndUpdate(roles._id, req.body);
        }
        res.status(200).send("Roles updated successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.route("/team/:item").delete(async (req, res) => {
    try {
        const { item } = req.params;
        let teams = await Team.findOne();
        teams = JSON.stringify(teams);
        teams = JSON.parse(teams);
        var data = teams.data;
        data.splice(
            data.findIndex(it => it === item),
            1
        );
        var newTeams = { data };
        await Team.findByIdAndUpdate(teams._id, newTeams);
        res.status(200).send("Team deleted Successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.route("/role/:item").delete(async (req, res) => {
    try {
        const { item } = req.params;
        let roles = await Role.findOne();
        roles = JSON.stringify(roles);
        roles = JSON.parse(roles);
        var data = roles.data;
        data.splice(
            data.findIndex(it => it === item),
            1
        );
        var newRoles = { data };
        await Role.findByIdAndUpdate(roles._id, newRoles);
        res.status(200).send("Role deleted Successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
