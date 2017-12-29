const events = require('../events')

module.exports = function Notes (state, bus) {
  state.notes = {
    input: '',
    all: []
  }
  bus.on(events.DOMCONTENTLOADED, function () {
    bus.on('notes:input', onInput)
    bus.on('notes:create', onCreate)
  })

  function onInput (text) {
    state.notes.input = text
  }

  function onCreate (text) {
    state.notes.all.push(text)
    bus.emit('render')
  }
}
