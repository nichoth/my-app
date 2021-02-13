var Server = require('ssb-server')
var ssbConfigInject = require('ssb-config/inject')
var ws = require('pull-ws/server')
var WS_PORT = process.env.WS_PORT || 8000
var caps = require('ssb-caps')
var manifest = require('../manifest.json')
var path = require('path')
var ssbKeys = require('ssb-keys')
var http = require('http')

// var server = Server(config)

function createServer () {
    var appName = 'ssb-ev'

    if (process.env.APP_NAME) {
        appName += ('-' + process.env.APP_NAME)
    }

    console.log('node env', process.env.NODE_ENV)
    // use dev database
    if (process.env.NODE_ENV === 'development' && !process.env.APP_NAME) {
        appName = 'ssb-ev-DEV'
    } else if (process.env.NODE_ENV === 'test') {
        appName = 'ssb-ev-TEST-' + Math.random()
    }


    if (process.env.NODE_ENV === 'test') {
        process.on('exit', function () {
            rimraf.sync(path.join(home, '.' + appName))
        })
    }

    console.log('app name', appName)




    var opts = {}
    opts.caps = caps

    var config = ssbConfigInject(appName, opts)
    var keyPath = path.join(config.path, 'secret')
    config.keys = ssbKeys.loadOrCreateSync(keyPath)
    config.logging.level = 'notice'




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


    var httpServer = http.createServer(function onRequest (req, res) {
        console.log('got request')
        var { pathname } = url.parse(req.url)
        console.log('req pathname', pathname)
    }).listen(WS_PORT, function (err) {
        if (err) throw err
        console.log('**listening on ' + WS_PORT)

        // for electron .fork
        if (process.send) process.send('ok')
    })

    ws({ server: httpServer }, function onConnection (wsStream) {
        console.log('got ws connection')

        // arguments are (remote, local)
        var rpcServer = muxrpc(null, manifest)(sbot)
        var rpcServerStream = rpcServer.createStream(function onEnd (err) {
            if (err) console.log('rpc stream close', err)
        })

        S(wsStream, rpcServerStream, wsStream)
    })
    
    return sbot
}



if (require.main === module) {
    createServer()
}

// for tests in test-browser
process.on('SIGTERM', function () {
    process.exit(0)
})

module.exports = createServer
