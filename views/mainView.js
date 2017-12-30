const html = require('bel')
const NoteList = require('../components/NoteList')

// A view has access to the application state
module.exports = function mainView (state, emit) {
  const notes = state.notes.input !== ''
    ? state.notes.items.filter(note => note.includes(state.notes.input))
    : state.notes.items

  // A component only have access to state that it needs and we also send down
  // the behaviors that it needs like what happends when we hit the ENTER key
  const noteList = NoteList({
    notes: notes,
    input: state.notes.input,
    onFilterInput: onFilterInput,
    onFilterKeyDown: onFilterKeyDown
  })

  return html`<body>${noteList}</body>`

  function onFilterInput (e) {
    emit('notes:input', e.target.value)
  }

  function onFilterKeyDown (e) {
    if (e.keyCode === 13) {
      emit('notes:create', e.target.value)
      emit('notes:input', '')
    }
  }
}
