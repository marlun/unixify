var html = require('bel')

module.exports = function NoteList (props) {
  return html`
    <div>
      <input
        type="text"
        autofocus
        onkeydown=${props.onKeyDown}>
      ${getBody(props.notes)}
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
