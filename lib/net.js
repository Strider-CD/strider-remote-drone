
var net = require('net')

module.exports = createSocket

function createSocket(config, next) {
  if (config.auth) return createSecureSocket(config, next)
  var client = net.connect({
    port: config.port,
    host: config.host
  }, function () {
    return next(client)
  })
}

function createSecureSocket(config, next) {
  console.error('Secure sockets not yet supported')
  process.exit(1)
}
