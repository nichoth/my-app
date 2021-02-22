var observ = require('observ')
var struct = require('observ-struct')

var state = struct({
    foo: observ(0)
})

module.exports = state
