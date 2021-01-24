const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bonus = mongoose.model("bonus", new Schema({}, { strict: false }));

module.exports = Bonus;
