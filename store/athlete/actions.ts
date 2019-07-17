import { AthleteActionTypes, LOGOUT_ATHLETE } from './types';

export const logoutAthlete = (): AthleteActionTypes => {
  return { type: LOGOUT_ATHLETE, payload: null };
};
