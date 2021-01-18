const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Team = mongoose.model("team", new Schema({}, { strict: false }));

module.exports = Team;
