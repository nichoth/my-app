import { render } from 'preact'
import { html } from 'htm/preact'

module.exports = function eventual () {
    render(html`<p>Hello from JS</p>`, document.getElementById('content'));
}
