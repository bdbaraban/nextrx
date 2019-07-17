import { SET_DARK, SET_LIGHT, ThemeState, ThemeActionTypes } from './types';
import { lightTheme } from '../../lib/themes';

export const initialThemeState: ThemeState = {
  type: 'light',
  object: lightTheme
};

const themeReducer = (
  state: ThemeState = initialThemeState,
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
