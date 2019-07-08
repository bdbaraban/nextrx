export const SET_LIGHT = 'SET_LIGHT';
export const SET_DARK = 'SET_DARK';

export const setLightTheme = payload => {
  return { type: SET_LIGHT, payload };
};

export const setDarkTheme = payload => {
  return { type: SET_DARK, payload };
};
