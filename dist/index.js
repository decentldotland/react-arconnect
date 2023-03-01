
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ans-for-all.cjs.production.min.js')
} else {
  module.exports = require('./ans-for-all.cjs.development.js')
}
