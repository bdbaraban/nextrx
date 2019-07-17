import { Athlete } from '../../db/types';

export interface AthleteState {
  profile: Athlete | null;
}

export const LOGOUT_ATHLETE = 'LOGOUT_ATHLETE';

interface LogoutAthleteAction {
  type: typeof LOGOUT_ATHLETE;
  payload: null;
}

export type AthleteActionTypes = LogoutAthleteAction;
