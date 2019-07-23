import {
  AthleteActionTypes,
  AthleteState,
  UPDATE_ATHLETE_FAILURE,
  UPDATE_ATHLETE_SUCCESS
} from './types';

// Initial athlete state
export const initialAthleteState: AthleteState = {
  profile: null,
  error: ''
};

/**
 * Reduce an action into a new athlete state.
 * @param state - Current athlete state.
 * @param action - Redux action to reduce.
 */
const athleteReducer = (
  state: AthleteState = initialAthleteState,
  action: AthleteActionTypes
): AthleteState => {
  switch (action.type) {
    case UPDATE_ATHLETE_SUCCESS:
      return {
        profile: Object.assign({}, state.profile, action.payload),
        error: ''
      };

    case UPDATE_ATHLETE_FAILURE:
      return {
        profile: state.profile,
        error: action.payload
      };

    default:
      return state;
  }
};

export default athleteReducer;
