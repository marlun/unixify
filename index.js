const morph = require('nanomorph')
const nanorouter = require('nanorouter')
const nanobus = require('nanobus')
const mainView = require('./views/mainView')

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

// When calling a handler for a router we send in the application state and
// a function which can be used to emit events. We don't send in the entire
// bus since we want to keep business logic and render logic separate.
function addRoute (route, handler) {
  router.on(route, function (params) {
    return handler(state, function (eventName, data) {
      bus.emit.apply(bus, arguments)
    })
  })
}

// Set the loaded document body as the tree and then morph it into a new tree
// generated from the application state
document.addEventListener('DOMContentLoaded', function () {
  tree = document.querySelector('body')
  const newTree = router(window.location.pathname)
  morph(tree, newTree)
})

// Setup which views should be loaded on which routes
addRoute('/', mainView)
