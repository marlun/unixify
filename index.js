const assert = require('assert')
const documentReady = require('document-ready')
const html = require('bel')
const morph = require('nanomorph')
const nanorouter = require('nanorouter')
const nanobus = require('nanobus')

const router = nanorouter()
let state = { msg: 'hello, world' }
let tree = null

router.on('/', function () {
  return html`<body><div>${state.msg}</div></body>`
})

documentReady(function () {
  tree = document.querySelector('body')
  var newTree = router(window.location.pathname)
  morph(tree, newTree)
})
