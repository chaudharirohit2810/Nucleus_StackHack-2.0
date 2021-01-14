const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Leave = mongoose.model("Leave", new Schema({}, { strict: false }));

module.exports = Leave;
