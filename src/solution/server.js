const Hapi = require('hapi');

const server = new Hapi.Server();
const routes = require('./routes/index.js');

server.connection({
  host: 'localhost',
  port: 9000,
});

server.route(routes.api);

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server started');
  });
}
module.exports = server;

