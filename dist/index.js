
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-arconnect.cjs.production.min.js')
} else {
  module.exports = require('./react-arconnect.cjs.development.js')
}
