const html = require('bel')
const NoteList = require('../components/NoteList')

// A view has access to the application state
module.exports = function mainView (state, emit) {
  // A component only have access to state that it needs and we also send down
  // the behaviors that it needs like what happends when we hit the ENTER key
  const noteList = NoteList({
    notes: state.notes,
    onKeyDown: onKeyDown
  })

  return html`<body>${noteList}</body>`

  function onKeyDown (e) {
    const value = e.target.value
    if (!value) return
    if (e.keyCode === 13) {
      state.notes.push(value)
      emit('render')
    }
  }
}
