'use strict'
const mongoose = require('mongoose');

const unhandledSchema = mongoose.Schema({
    title: String,
    data: [{year:Number,texts:[String]}]
})

const unhandledModel = mongoose.model('unhandled', unhandledSchema);


mongoose.connect('mongodb://taco:tacos123@ds159112.mlab.com:59112/when');
const db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log('DB UP!');
});

let queryUnhandled = () => new Promise(res => {
    unhandledModel.find({},(err,unhandled)=>{
        res(unhandled)
    })
});

let addUnhandled = add => new Promise((res,rej) => {
    console.log('addUnhandled',add)
    let newUnhandled = new unhandledModel(add);
    console.log('newUnhandled',newUnhandled)
    newUnhandled.save((err,doc)=>{
        if(err){
            rej(err)
        }
        res(doc);
    })
})


module.exports = {
    queryUnhandled,
    addUnhandled
}