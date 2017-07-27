'use strict'
const mongoose = require('mongoose');
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

const questionSchema = mongoose.Schema({
    question: String,
    category: String,
    extraInfo: String,
    year: Number
})




const unhandledModel = mongoose.model('unhandled', unhandledSchema);
const questionModel = mongoose.model('question', questionSchema)
    // const ignoredWikiModel = mongoose.model('ignoredWiki', ignoredWiki)

mongoose.connect('mongodb://taco:tacos123@ds159112.mlab.com:59112/when');
const db = mongoose.connection;

db.on('error', function(err) {
    console.log(err);
});
db.once('open', function() {
    console.log('DB UP!');
});

let queryUnhandled = () => new Promise(res => {
    unhandledModel.find({}, (err, unhandled) => {
        res(unhandled)
    })
});

let addUnhandled = add => new Promise((res, rej) => {
    let newUnhandled = new unhandledModel(add);
    newUnhandled.save((err, doc) => {
        if (err) {
            rej(err)
        }
        res(doc);
    })
})

let getQuestion = query => new Promise((res, rej) => {
    questionModel.find(query || {}, (err, data) => {
        err && rej(err);
        res(data)
    })
})

let addQuestion = payload => new Promise((res, rej) => {
    new questionModel(payload).save((err, doc) => {
        err && rej(err);
        res(doc);
    })
})


let getGeneric = schema => new Promise((res, rej) => {
    const model = mongoose.model(schema, schemas[schema])
    model.find({}, (err, data) => {
        err && rej(err) || res(data);
    })
})
let postGeneric = (schema, payload) => new Promise((res, rej) => {
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
