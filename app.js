'use strict'

const Hapi = require('hapi')
const GetYearFromWiki = require('./getYearFromWiki')
const DB = require('./db');

let routes = [{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'frontend/dist'
    }
  }
}, {
  method: 'GET',
  path: '/api/wiki/{year}',
  handler: function (request, reply) {
    reply(GetYearFromWiki(request.params.year))
  }
}, {
  path: '/api/{path}/{query?}',
  method: '*',
  handler: (req, rep) => {
    rep(DB[req.method + 'Generic'](req.params.path, req.params.query, req.payload))
  }
}];

const server = new Hapi.Server();
server.connection({
  port: process.env.PORT,
  address: process.env.IP,
  host: 'localhost'
})
server.start(() => console.log(`Server running at: ${server.info.uri}`))
server.register(require('inert'), () => routes.forEach(route => server.route(route)));
