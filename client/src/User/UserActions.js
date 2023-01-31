import callApi from '../util/apiCaller';
import { setCookieData } from '../util/cookies';

// Export Constants
export const LOGIN = 'LOGIN';

// Export Actions
export function login(name, token) {
  setCookieData('token', token, 24 * 60 * 60 * 1000)

  return {
    type: LOGIN,
    user: { name, token },
  };
}

export function loginRequest(user) {
  return (dispatch) => {
    return callApi('login', 'post', { user })
            .then(res => dispatch(login(user.name, res.token)));
  };
}

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('user', 'post', { user })
            .then(res => dispatch(login(user.name, res.token)));
  };
}
