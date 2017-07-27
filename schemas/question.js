const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    question: String,
    category: String,
    extraInfo: String,
    year: Number
})


module.exports = questionSchema;
