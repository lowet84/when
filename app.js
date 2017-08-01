'use strict'

const Hapi = require('hapi')
const GetYearFromWiki = require('./getYearFromWiki')
const DB = require('./db');

let routes = [{
  method: 'GET',
  path: '/api/wiki/{year}',
  handler: function(request, reply) {
    reply(GetYearFromWiki(request.params.year))
  }
}, {
  path: '/api/{path}/{query?}',
  method: '*',
  handler: (req, rep) => {
    rep(DB[req.method + 'Generic'](req.params.path, req.params.query, req.payload))
  }
}, {
  method: 'GET',
  path: '/static/{param*}',
  handler: {
    directory: {
      path: 'frontend/dist/static'
    }
  }
}, {
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.file('frontend/dist/index.html')
  }
}];

console.log(process.env.PORT)
const server = new Hapi.Server();
let connectionConfig = {
  port: process.env.PORT,
}
if (process.env.IP) {
  connectionConfig.address = process.env.IP;
}
server.connection(connectionConfig)
server.start(() => console.log(`Server running at: ${server.info.uri}`))
server.register(require('inert'), () => routes.forEach(route => server.route(route)));
