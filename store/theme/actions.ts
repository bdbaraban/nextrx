import { SET_DARK, SET_LIGHT, ThemeActionTypes } from './types';

export const setLightTheme = (payload: object): ThemeActionTypes => {
  return { type: SET_LIGHT, payload };
};

export const setDarkTheme = (payload: object): ThemeActionTypes => {
  return { type: SET_DARK, payload };
};
