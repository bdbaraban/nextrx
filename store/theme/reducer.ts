import { SET_DARK, SET_LIGHT, ThemeState, ThemeActionTypes } from './types';
import { lightTheme } from '../../lib/themes';

const initialState: ThemeState = {
  type: 'light',
  object: lightTheme
};

const themeReducer = (
  state: ThemeState = initialState,
  action: ThemeActionTypes
): ThemeState => {
  switch (action.type) {
    case SET_LIGHT:
      return {
        type: 'light',
        object: action.payload
      };

    case SET_DARK:
      return {
        type: 'dark',
        object: action.payload
      };

    default:
      return state;
  }
};

export default themeReducer;
