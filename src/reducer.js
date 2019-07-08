import { SET_LIGHT, SET_DARK } from './actions';
import { lightTheme } from './themes';

const initialState = {
  theme: {
    type: 'light',
    object: lightTheme
  }
};

const rootReducer = (state = initialState, action) => {
  if (action.type === SET_LIGHT) {
    return {
      theme: {
        type: 'light',
        object: action.payload
      }
    };
  }

  if (action.type === SET_DARK) {
    return {
      theme: {
        type: 'dark',
        object: action.payload
      }
    };
  }

  return state;
};

export default rootReducer;
