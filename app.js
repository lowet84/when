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
        if(!data.length || data.length<5){
            getValidQuestion()
        } 
    },
    err => {console.error('failed query')}
  )
  
}
let getValidQuestion = () => {
    console.log('call')
    CreateQuestion.getData().then(callback)
}
getValidQuestion();