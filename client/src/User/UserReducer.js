import jwt from 'jsonwebtoken';
import { getCookieData } from '../util/cookies';
import { LOGIN } from './UserActions';

// Initial State
const token =  getCookieData('token');
const decoded = jwt.decode(token);

const initialState = { token, name: decoded && decoded.name };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN :
      return {
        name: action.user.name,
        token: action.user.token,
      };

    default:
      return state;
  }
};

// Export Reducer
export default UserReducer;
