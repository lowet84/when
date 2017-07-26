const Hapi = require('hapi')
// let CreateQuestion = require('./createQuestion')
// let DB = require('./db');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.start((err) => {
  console.log(`Server running at: ${server.info.uri}`);
});
server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }
  server.route({
    method: 'GET',
    path: '/unhandled',
    handler: function (request, reply) {
      reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
  });
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./frontend/dist/*');
    }
  });
});




let getValidQuestion = async () => {
  let data = await CreateQuestion.getData();
  if (data.data.length > 5 && data.data[0].texts.length > 5) {
    getValidQuestion()
  }
}

// let storeUnhandledQuestion = DB.addUnhandled;

