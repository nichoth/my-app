import { render } from 'preact'
import { useState } from 'preact/hooks';
import { html } from 'htm/preact'
var Router = require('./routes')
var Shell = require('./shell')
var evs = require('../EVENTS')
var catchRoutes = require('@nichoth/catch-routes')

var router = Router()

function Component ({ emit, state }) {
    const [_state, setState] = useState(state())

    state(function onChange (newState) {
        setState(newState)
    })

    var match = router.match(_state.route.pathname || '/')
    var route = match ? match.action(match) : null
    var routeView = route ? route.view : null

    return html`<${Shell} emit=${emit} ...${_state}>
        <${routeView} emit=${emit} ...${_state} />
    <//>`

    // return html`<form>
    //     <p>foos: ${_state.foo}</p>
    //     <button onClick=${emit(evs.test.foo)}>foo</button>
    // </form>`
}

module.exports = function Eventual ({ state, emit }) {

    var _html = html`<div>
        <p>Hello from JS</p>
        <${Component} emit=${emit} state=${state} />
    </div>`

    var { setRoute } = catchRoutes(parsedUrl => {
        state.route.set(parsedUrl)

        var match = router.match(parsedUrl.pathname)
        var route = match ? match.action(match) : null
        var events = (route ? (route.events || []) : [])
        events.forEach(ev => {
            emit(ev, null)
        })
    })

    var el =  document.getElementById('content')

    render(_html, el)
}
