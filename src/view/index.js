import { render } from 'preact'
import { html } from 'htm/preact'

module.exports = function eventual () {
    render(html`<p>Hello earth</p>`, document.getElementById('content'));
}
