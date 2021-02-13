var Server = require('ssb-server')
var config = require('ssb-config')

// var server = Server(config)

module.exports = function createServer () {

    var sbot = Server
        .use(require('ssb-master'))
        .use(require('ssb-gossip'))
        .use(require('ssb-replicate'))
        .use(require('ssb-backlinks'))
        .use(require('ssb-blobs'))
        .use(require('ssb-serve-blobs'))
        .use(require('ssb-invite'))
        .use(require('ssb-friends'))
        .call(null, config)

    return sbot
}
