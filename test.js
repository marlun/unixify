const test = require('tape')
const nanobus = require('nanobus')
const snap = require('assert-snapshot')
const notesStore = require('./stores/notes')
const NoteList = require('./components/NoteList')

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

test('NoteList', function (t) {
  t.test('renders correctly with zero element', function (t) {
    const options = {
      input: '',
      notes: [],
      onFilterInput: function () {},
      onFilterKeyDown: function () {}
    }
    const str = NoteList(options).toString()
    snap(t, str)
    t.end()
  })

  t.test('renders correctly with one element', function (t) {
    const options = {
      input: '',
      notes: ['test'],
      onFilterInput: function () {},
      onFilterKeyDown: function () {}
    }
    const str = NoteList(options).toString()
    snap(t, str)
    t.end()
  })

  t.test('renders correctly with three element', function (t) {
    const options = {
      input: '',
      notes: ['one', 'two', 'three'],
      onFilterInput: function () {},
      onFilterKeyDown: function () {}
    }
    const str = NoteList(options).toString()
    snap(t, str)
    t.end()
  })
})
