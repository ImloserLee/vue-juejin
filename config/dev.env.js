'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_TIMElINE: '"/timeline"',
  API_AUTH: '"/auth"',
  API_USERINFO: '"/userinfo"',
  API_BROCHURE: '"/brochure"',
  API_BANNER: '"/banner"',
  API_STORAGE: '"/storage"',
  API_ENTRYVIEW: '"/entryview"',
  API_SHORT: '"/short"',
  API_SEARCH: '"/search"',
  API_LCCRO: '"/lccro"',
  API_USERLIKE: '"/userlike"',
  API_COLLECTION: '"/collection"'
})
 