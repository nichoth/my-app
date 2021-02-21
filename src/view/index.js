import { render } from 'preact'
import { html } from 'htm/preact'
var evs = require('../EVENTS')

module.exports = function eventual ({ emit }) {
    var _html = html`<div>
        <p>Hello from JS</p>
        <form>
            <button onClick=${emit(evs.test.foo)}>foo</button>
        </form>
    </div>`

    var el =  document.getElementById('content')
    render(_html, el);
}
