const mongoose = require('mongoose');
const ignoredWiki = mongoose.Schema({
    year: Number,
    number: Number
})
module.exports = ignoredWiki;
