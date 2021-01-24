const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Policy = mongoose.model("policies", new Schema({}, { strict: false }));

module.exports = Policy;
