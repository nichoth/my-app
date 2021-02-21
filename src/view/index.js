import { render } from 'preact'
import { html } from 'htm/preact'
var evs = require('../EVENTS')
var Bus = require('@nichoth/events')

module.exports = function eventual ({ emit }) {
    var bus = Bus({
        memo: true
    })
    var emit = bus.emit.bind(bus)

    var _html = html`<div>
        <p>Hello from JS</p>
        <form>
            <button onClick=${emit(evs.test.foo)}>foo</button>
        </form>
    </div>`

    var el =  document.getElementById('content')

    render(_html, el)
    return { bus }
}
