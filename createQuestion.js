const fetch = require('node-fetch');

let getRandomPageLink = () => `https://sv.wikipedia.org/wiki/Special:Slumpsida`;

// let url = getRandomPageLink();
// let host = url.split('/').slice(0, 3).join('/');
// console.log('host', host);
// fetch(getRandomPageLink(), {
//   host: "proxyw.ppm.nu",
//   port: 8080,
//   path: url,
//   headers: { host }
// })
//   .then(function (res) {
//     return res.text();
//   }).then(function (body) {
//     console.log(body);
//   }, function (e) {
//     console.log('error', e);
//   });
console.log('isPM', process.argv.some(arg => arg === '--pm'));
let getData = url => new Promise((res, rej) => {
  require('https').get(process.argv.some(arg => arg === '--pm') ? {
    host: "proxyw.ppm.nu",
    port: 8080,
    path: url,
    headers: { host: url.split('/').slice(0, 3).join('/') }
  } : url,
    response => {
      let datas = '';
      console.log(Object.keys(response));
      console.log(response.statusCode);
      response.on('data', data => {
        console.log('?', data);
        datas += data.toString();
      });
      response.on('end', () => {
        try {
          console.log('datas', datas)
          res(datas);
        } catch (error) {
          rej(error);
        }
      })
      response.on('error', error => {
        console.error(error);
      })
    })
})

getData(getRandomPageLink()).then(data => {
  console.log(data);
})