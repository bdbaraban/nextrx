import { AthleteActionTypes, AthleteState, LOGOUT_ATHLETE } from './types';

export const initialAthleteState: AthleteState = {
  profile: null
};

const athleteReducer = (
  state: AthleteState = initialAthleteState,
  action: AthleteActionTypes
): AthleteState => {
  switch (action.type) {
    case LOGOUT_ATHLETE:
      return {
        profile: action.payload
      };

    default:
      return state;
  }
};

export default athleteReducer;
