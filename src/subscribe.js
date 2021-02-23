var Bus = require('@nichoth/events')
var evs = require("./EVENTS")

function subscribe ({ state }) {
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

    return bus
}

module.exports = subscribe
