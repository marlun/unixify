const test = require('tape')
const notesStore = require('./stores/notes')
const nanobus = require('nanobus')

test('notes store', function (t) {
  t.test('should initialize state', function (t) {
    const bus = nanobus()
    const state = {}
    notesStore(state, bus)
    t.equal(state.notes.input, '')
    t.ok(Array.isArray(state.notes.items))
    t.equal(state.notes.items.length, 0)
    t.end()
  })

  t.test('should set text in state on input and call render', function (t) {
    const bus = nanobus()
    const state = {}
    bus.on('render', function () {
      t.end()
    })
    notesStore(state, bus)
    bus.emit('notes:input', 'test')
    t.equal(state.notes.input, 'test')
  })

  t.test('should add note on create and call render', function (t) {
    const bus = nanobus()
    const state = {}
    bus.on('render', function () {
      t.end()
    })
    notesStore(state, bus)
    bus.emit('notes:create', 'test')
    t.equal(state.notes.items[0], 'test')
  })
})
