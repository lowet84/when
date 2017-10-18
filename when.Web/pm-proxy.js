const express = require('express');
const app = express();

app.get('/api/*', async (req, res) => {
  let url = `http://when-mattza.c9users.io${req.path}`;
  console.log(url);
  res.send(await getJSON(url));
});
let getJSON = url => new Promise((res, rej) => {
  require('http').get({
    host: "proxyw.ppm.nu",
    port: 8080,
    path: url,
    headers: { host: url.split('/').slice(0, 3).join('/') }
  },
    response => {
      let datas = '';
      response.on('data', data => {
        datas += data.toString();
      });
      response.on('end', () => {
        try {
          const json = JSON.parse(datas);
          json ? res(json) : rej(datas);
        } catch (error) {
          rej(error);
        }
      })
    })
})
app.listen(process.env.PORT || 8081);