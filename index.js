const html = require('bel')
const morph = require('nanomorph')
const nanorouter = require('nanorouter')
const nanobus = require('nanobus')

const bus = nanobus()
const router = nanorouter()
const state = {}

// This variable will hold the current DOM tree which will be rendered in the
// web browser
let tree = null

// We listen for 'render' events and re-render the application, morphing from
// the DOM tree created from the last state into the the new.
bus.prependListener('render', function () {
  var newTree = router(window.location.pathname)
  morph(tree, newTree)
})

router.on('/', function () {
  return html`<body><div>${state.msg}</div></body>`
})

document.addEventListener('DOMContentLoaded', function () {
  state.msg = 'hello, world'
  tree = document.querySelector('body')
  var newTree = router(window.location.pathname)
  morph(tree, newTree)
})

setTimeout(function () {
  state.msg = 'awesome'
  bus.emit('render')
}, 2000)
