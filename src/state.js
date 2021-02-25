var observ = require('observ')
var struct = require('observ-struct')

var state = struct({
    foo: observ(0),
    route: observ('/'),
    me: observ({}),
    posts: observ(null),
    postUrls: observ({}),
    people: observ({})
})

module.exports = state
