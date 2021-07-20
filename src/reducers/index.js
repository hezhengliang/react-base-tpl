import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import global from './global'
import user from './user'
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  global,
  user
})
export default createRootReducer