var namespace = require('@nichoth/events/namespace')

var evs = namespace({
    test: ['foo'],
    profile: ['setAvatar', 'save']
})

module.exports = evs
