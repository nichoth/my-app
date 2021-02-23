import { render } from 'preact'
import { useState } from 'preact/hooks';
import { html } from 'htm/preact'
var evs = require('../EVENTS')

function Component ({ emit, state }) {
    const [_state, setState] = useState(state())

    state(function onChange (newState) {
        setState(newState)
    })

    return html`<form>
        <p>foos: ${_state.foo}</p>
        <button onClick=${emit(evs.test.foo)}>foo</button>
    </form>`
}

module.exports = function eventual ({ state, emit }) {
    var _html = html`<div>
        <p>Hello from JS</p>
        <${Component} emit=${emit} state=${state} />
    </div>`

    var el =  document.getElementById('content')

    render(_html, el)
}
