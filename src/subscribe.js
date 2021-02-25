var evs = require("./EVENTS")
var Bus = require('@nichoth/events')
var getAvatar = require('ssb-avatar')

function subscribe ({ sbot, state }) {
    var bus = Bus({
        memo: true
    })

    bus.on(evs.test.foo, ev => {
        ev.preventDefault()
        console.log('got a foo', ev)
        state.foo.set(state.foo() + 1)
    })

    bus.on(evs.route.change, path => {
        console.log('subscribed on route', path)
        state.route.set(path)
    })

    bus.on(evs.profile.get, () => {
        getProfile(function (err, profile) {
            if (err) throw err
            state.me.set(profile)
        })
    })

    function getProfile (cb) {
        sbot.whoami(function (err, res) {
            if (err) throw err
            var { id } = res

            getAvatar(sbot, id, id, function (err, profile) {
                cb(err, profile)
            })
        })
    }

    return bus
}


module.exports = subscribe
