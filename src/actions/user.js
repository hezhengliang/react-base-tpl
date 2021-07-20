export const LOGIN_REQUEST = 'LOGIN_REQUEST'

export const actions = {
  handleLogin: (data) => {
    console.log('user actions', data)
    return {
      type: LOGIN_REQUEST,
      payload: data
    }
  }
}