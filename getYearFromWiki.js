'use strict'
const fetch = require('node-fetch');
const cheerio = require('cheerio')

let getPageLink = page => `https://sv.wikipedia.org/wiki/${page||2016}`;
let getTextFromEl = el => el.children && el.children.reduce((acc, child) => acc + getTextFromEl(child), '') || el.data;

let getData = page => new Promise(function(res) {
    fetch(getPageLink(page)).then(res => res.text()).then(body => {
        let $body = cheerio.load(body);
        let title = $body('#firstHeading').html()
        let data = [].map.call($body('#bodyContent ul>li'), getTextFromEl);
        res({
            title,
            data
        })
    });
})

module.exports = getData;
