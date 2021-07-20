import { call, put, takeEvery, takeLatest,all,delay } from 'redux-saga/effects'
import {actions as globalActions, } from '@/actions/global'
import {actions as userActions, LOGIN_REQUEST } from '@/actions/user'

function* login(action) {
  try {
    const loginData = action.payload;
    console.log('login', loginData)
    yield put(globalActions.showLoading('Logging in...'));

    //--TODO
    yield put(userActions.handleLogin(userInfo));
  } catch (err) {
    yield put(globalActions.hideLoading())
  }
}

function* watchLoginMiddle(){
  console.log('watchLoginMiddle')
  yield takeEvery(LOGIN_REQUEST, login)
}

export default function* saga() {
  yield all([
    watchLoginMiddle()
  ])
}