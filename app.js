'use strict'

let CreateQuestion = require('./createQuestion')
let DB = require('./db');



let callback = data => {
  if (data.data.length>5 && data.data[0].texts.length>5) {
    DB.addUnhandled(data);
  }
  DB.queryUnhandled().then(
    data => {
        console.log('queryREsp',data.length);
        if(!data.length || data.length<10){
            getValidQuestion()
        } 
    },
    err => {console.error('failed query')}
  )
  
}
let getValidQuestion = () => {
    console.log('call', new Date().toISOString().split('T')[1])
    CreateQuestion.getData().then(callback)
}
getValidQuestion();
getValidQuestion();
getValidQuestion();