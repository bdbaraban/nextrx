import { Athlete } from '../../db/types';

// Reducer state
export interface AthleteState {
  profile: Athlete | null;
  status: string;
}

// Action types
export const UPDATE_ATHLETE_FAILURE = 'UPDATE_ATHLETE_FAILURE';
export const UPDATE_ATHLETE_SUCCESS = 'UPDATE_ATHLETE_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_ATHLETE_SUCCESS';

interface UpdateAthleteFailure {
  type: typeof UPDATE_ATHLETE_FAILURE;
  payload: string;
}

interface UpdateAthleteSuccess {
  type: typeof UPDATE_ATHLETE_SUCCESS;
  payload: Partial<Athlete>;
}

interface UpdatePasswordFailure {
  type: typeof UPDATE_PASSWORD_FAILURE;
  payload: string;
}

interface UpdatePasswordSuccess {
  type: typeof UPDATE_PASSWORD_SUCCESS;
  payload: string;
}

export type AthleteActionTypes =
  | UpdateAthleteFailure
  | UpdateAthleteSuccess
  | UpdatePasswordFailure
  | UpdatePasswordSuccess;
