// Reducer state
export interface ThemeState {
  type: string;
  object: object;
}

// Action types
export const SET_LIGHT = 'SET_LIGHT';
export const SET_DARK = 'SET_DARK';

interface SetLightThemeAction {
  type: typeof SET_LIGHT;
  payload: object;
}

interface SetDarkThemeAction {
  type: typeof SET_DARK;
  payload: object;
}

export type ThemeActionTypes = SetLightThemeAction | SetDarkThemeAction;
