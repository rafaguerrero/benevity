import { LOGIN } from './UserActions';

// Initial State
const initialState = { name: null, token: null };

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
