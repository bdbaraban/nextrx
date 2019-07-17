import { SET_DARK, SET_LIGHT, ThemeActionTypes } from './types';
import { darkTheme, lightTheme } from '../../lib/themes';

export const setLightTheme = (): ThemeActionTypes => {
  return { type: SET_LIGHT, payload: lightTheme };
};

export const setDarkTheme = (): ThemeActionTypes => {
  return { type: SET_DARK, payload: darkTheme };
};
