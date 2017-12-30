const events = require('../events')

module.exports = function Notes (state, bus) {
  state.notes = {
    input: '',
    items: []
  }
  bus.on(events.DOMCONTENTLOADED, function () {
    bus.on('notes:input', onInput)
    bus.on('notes:create', onCreate)
  })

  function onInput (text) {
    state.notes.input = text
    bus.emit('render')
  }

  function onCreate (text) {
    state.notes.items.push(text)
    bus.emit('render')
  }
}
