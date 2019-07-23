import { Athlete } from '../../db/types';

// Reducer state
export interface AthleteState {
  profile: Athlete | null;
  error: string;
}

// Action types
export const UPDATE_ATHLETE_FAILURE = 'UPDATE_ATHLETE_FAILURE';
export const UPDATE_ATHLETE_SUCCESS = 'UPDATE_ATHLETE_SUCCESS';

interface UpdateAthleteFailure {
  type: typeof UPDATE_ATHLETE_FAILURE;
  payload: string;
}

interface UpdateAthleteSuccess {
  type: typeof UPDATE_ATHLETE_SUCCESS;
  payload: Partial<Athlete>;
}

export type AthleteActionTypes = UpdateAthleteFailure | UpdateAthleteSuccess;
