import { LOGIN_REQUEST } from '@/actions/user'
const initState = {
  userInfo: null
}
export default function user(state=initState, action){
  console.log('user reducer', action)
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, ...action.payload};
    }
    default:
      return state;
  }
};