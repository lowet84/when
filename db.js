'use strict'
const mongoose = require('mongoose');
const querystring = require('querystring');
const schemas = {};

const normalizedPath = require("path").join(__dirname, "schemas");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
    schemas[file.slice(0, -3)] = require("./schemas/" + file);
});

console.log('Availble schemas:', Object.keys(schemas));

const unhandledSchema = mongoose.Schema({
    title: String,
    data: [{
        year: Number,
        texts: [String]
    }]
})




mongoose.connect('mongodb://taco:tacos123@ds159112.mlab.com:59112/when');
const db = mongoose.connection;

db.on('error', function(err) {
    console.log(err);
});
db.once('open', function() {
    console.log('DB UP!');
});

let getGeneric = (schema, query) => new Promise((res, rej) => {
    const model = mongoose.model(schema, schemas[schema])
    model.find(querystring.parse(query) || {}, (err, data) => {
        err && rej(err) || res(data);
    })
})
let postGeneric = (schema, query, payload) => new Promise((res, rej) => {
    const model = mongoose.model(schema, schemas[schema])
    new model(payload).save((err, doc) => {
        err && rej(err);
        res(doc);
    })
})


module.exports = {
    getGeneric,
    postGeneric
}
