const documentReady = require('document-ready')
const html = require('bel')
const morph = require('nanomorph')
const nanorouter = require('nanorouter')
const nanobus = require('nanobus')

const bus = nanobus()
const router = nanorouter()

const state = { msg: 'hello, world' }

let tree = null

bus.prependListener('render', function () {
  var newTree = router(window.location.pathname)
  morph(tree, newTree)
})

router.on('/', function () {
  return html`<body><div>${state.msg}</div></body>`
})

setTimeout(function () {
  state.msg = 'awesome'
  bus.emit('render')
}, 2000)

documentReady(function () {
  tree = document.querySelector('body')
  var newTree = router(window.location.pathname)
  morph(tree, newTree)
})
