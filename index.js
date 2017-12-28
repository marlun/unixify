const html = require('bel')
const morph = require('nanomorph')
const nanorouter = require('nanorouter')
const nanobus = require('nanobus')
const NoteList = require('./NoteList')

const bus = nanobus()
const router = nanorouter()
const state = { notes: [] }

// This variable will hold the current DOM tree which will be rendered in the
// web browser
let tree = null

// We listen for 'render' events and re-render the application, morphing from
// the DOM tree created from the last state into the the new.
bus.prependListener('render', function () {
  const newTree = router(window.location.pathname)
  morph(tree, newTree)
})

document.addEventListener('DOMContentLoaded', function () {
  tree = document.querySelector('body')
  const newTree = router(window.location.pathname)
  morph(tree, newTree)
})

// Setup which views should be loaded on which routes
router.on('/', mainView)

// A view has access to the application state
function mainView () {
  // A component only have access to state that it needs and we also send down
  // the behaviors that it needs like what happends when we hit the ENTER key
  const noteList = NoteList({
    notes: state.notes,
    onEnter: onEnter
  })
  return html`<body>${noteList}</body>`

  function onEnter (note) {
    state.notes.push(note)
    bus.emit('render')
  }
}
