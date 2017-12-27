var html = require('bel')

// Create a stand-alone DOM tree
var tree = html`<div>hello, world</div>`

// Append the tree form above to the current web browser DOM tree
document.body.appendChild(tree)
