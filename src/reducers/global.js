import {ACTION_LOADING_SHOW, ACTION_LOADING_HIDE} from '@/actions/global'
const initState = {
  loading: false
}
export default function global(state=initState, action){
  switch (action.type) {
    case ACTION_LOADING_SHOW: {
      const { loadingText } = action.payload;
      return { ...state, loading: true, loadingText };
    }
    case ACTION_LOADING_HIDE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};