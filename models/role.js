const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = mongoose.model("role", new Schema({}, { strict: false }));

module.exports = Role;
