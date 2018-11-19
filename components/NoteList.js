var html = require('bel')

module.exports = function NoteList (options) {
  return html`
    <div>
      <input
        type="text"
        value="${options.input}"
        autofocus
        oninput=${options.onFilterInput}
        onkeydown=${options.onFilterKeyDown}>
      ${getBody(options.notes)}
    </div>
  `
}

function getBody (notes) {
  if (notes.length === 0) {
    return html`<p>You have no notes</p>`
  }
  return html`
    <ul>
      ${notes.map(Note)}
    </ul>
  `
}

function Note (note) {
  return html`<li>${note}</li>`
}
