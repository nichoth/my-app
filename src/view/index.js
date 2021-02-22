import { render } from 'preact'
import { html } from 'htm/preact'
var evs = require('../EVENTS')
var Bus = require('@nichoth/events')

function Component ({ emit }) {
    return html`
        <form>
            <button onClick=${emit(evs.test.foo)}>foo</button>
        </form>
    `
}

module.exports = function eventual () {
    var bus = Bus({
        memo: true
    })
    var emit = bus.emit.bind(bus)

    var _html = html`<div>
        <p>Hello from JS</p>
        <${Component} emit=${emit} />
    </div>`

    var el =  document.getElementById('content')

    render(_html, el)
    return { bus }
}
