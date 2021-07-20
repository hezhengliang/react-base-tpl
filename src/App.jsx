import '@/assets/styles/index.less';
import React from 'react';
import { connect } from 'react-redux'
import {actions as userActions} from '@/actions/user'
function App(props){
  console.log(props)
  const handleLogin = () => {
    //--
    props.onLogin('username', 1234566)
  }
  return (
    <div className="app-box">
     <h1>Hello React App</h1>
     <button onClick={handleLogin}>登录</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.userInfo
  }
};
const mapDispatchToProps = (dispatch) => ({
  onLogin: (
    username,
    password,
  ) => {
    dispatch(userActions.handleLogin({ username, password }));
    return true;
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App)