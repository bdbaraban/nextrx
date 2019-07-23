import { SET_DARK, SET_LIGHT, ThemeActionTypes } from './types';
import { darkTheme, lightTheme } from '../../lib/themes';

/**
 * Set the global theme to light mode.
 */
export const setLightTheme = (): ThemeActionTypes => {
  return { type: SET_LIGHT, payload: lightTheme };
};

/**
 * Set the global theme to dark mode.
 */
export const setDarkTheme = (): ThemeActionTypes => {
  return { type: SET_DARK, payload: darkTheme };
};
