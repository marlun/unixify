const morph = require('nanomorph')
const nanorouter = require('nanorouter')
const nanobus = require('nanobus')
const mainView = require('./views/mainView')
const notesStore = require('./stores/notes')
const events = require('./events')

const bus = nanobus()
const router = nanorouter()
const state = {}

// This variable will hold the current DOM tree which will be rendered in the
// web browser
let tree = null

// We listen for 'render' events and re-render the application, morphing from
// the DOM tree created from the last state into the the new.
bus.prependListener(events.RENDER, function () {
  const newTree = router.emit(window.location.pathname)
  morph(tree, newTree)
})

// When calling a handler for a route (views) we send in the application state
// and a function which can be used to emit events. We don't send in the entire
// bus since we want to keep business logic and render logic separate. We also
// add the params to the state object so that views can access it
function addRoute (route, handler) {
  router.on(route, function (params) {
    state.params = params
    return handler(state, function (eventName, data) {
      bus.emit.apply(bus, arguments)
    })
  })
}

// Initialize all our stores which conatins all our business logic and handles
// the state of the application
notesStore(state, bus)

// Setup which views should be loaded on which routes
addRoute('/', mainView)

// Initialize the application after the HTML document has been completely
// loaded and parsed (DOMContentLoaded event) by calling a route handler and
// morphing the current document body DOM to the resulting tree.
document.addEventListener('DOMContentLoaded', function () {
  tree = document.querySelector('body')
  const newTree = router.emit(window.location.pathname)
  morph(tree, newTree)
})
