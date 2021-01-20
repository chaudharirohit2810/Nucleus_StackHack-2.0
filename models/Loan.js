const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Loan = mongoose.model("loans", new Schema({}, { strict: false }));

module.exports = Loan;
