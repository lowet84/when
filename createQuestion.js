'use strict'
const fetch = require('node-fetch');
const cheerio = require('cheerio')

let getRandomPageLink = () => `https://sv.wikipedia.org/wiki/Special:Slumpsida`;


let getAllIndexes = (arr, val) => {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

let getBody = url => fetch(url)
  .then(res =>res.text());

let getData = () => new Promise(function(res) {
  getBody(getRandomPageLink()).then(body => {
    let $body = cheerio.load(body);
    let title = $body('#firstHeading').html()
    let content = $body('#bodyContent').text();
    let years = Array(500).fill(0).map((v,i) => 1500+i);
    let noChars = 50
    let omg = years.filter(year => !!~content.indexOf(year))
    .reduce((acc,year) => acc.concat(getAllIndexes(content,year).map(index => ({index,year}))),[])
    .reduce((acc,obj) => {
      let item = acc.find(item => item.year === obj.year);
      if(!item){
        item = {year: obj.year,index:[]}
        acc.push(item);
      }
      item.index.push(obj.index);
      return acc;
    },[])
    .filter(item => item.index.length >1)
    .sort((a,b) => a.index.length<b.index.length)
    .map(item => ({year:item.year, texts: item.index.map(index => content.slice(index-noChars,index+noChars))}))
    res({title, data:omg})
  });
})
  
  
let results = [];
let loop = () => {
  getData().then(data => {
    if (data.length>3 && data[0].texts.length>3) {
      console.log( data);
      results.push(data);
    } else {
      console.log('failed');
      loop();
    }
  }, err => console.error(err))
}



// while(results.length<5){
//   loop()
// }

// let get = getData
module.exports = { getData }