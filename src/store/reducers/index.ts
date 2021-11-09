import { combineReducers } from 'redux'
import feed from './feed'
import settings from './settings'
import article from './article'
// import auth from './auth'
// import sidebars from './sidebars'

export default combineReducers({
  feed,
  settings,
  article,
  // sidebars,
  // auth,
})
