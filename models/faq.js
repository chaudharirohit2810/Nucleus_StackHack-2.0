const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FAQ = mongoose.model("faqs", new Schema({}, { strict: false }));

module.exports = FAQ;
