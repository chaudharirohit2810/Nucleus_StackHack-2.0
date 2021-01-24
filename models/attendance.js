const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Attendance = mongoose.model(
    "attendance",
    new Schema({}, { strict: false })
);

module.exports = Attendance;
