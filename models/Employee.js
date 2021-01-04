const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Employee = mongoose.model("employees", new Schema({}, { strict: false }));

module.exports = Employee;
