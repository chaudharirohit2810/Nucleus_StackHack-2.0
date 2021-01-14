const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Holiday = mongoose.model("holiday", new Schema({}, { strict: false }));

module.exports = Holiday;
