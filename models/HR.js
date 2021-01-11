const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HR = mongoose.model("humanResources", new Schema({}, { strict: false }));

module.exports = HR;
