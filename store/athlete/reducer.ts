import {
  AthleteActionTypes,
  AthleteState,
  UPDATE_ATHLETE_FAILURE,
  UPDATE_ATHLETE_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS
} from './types';

// Initial athlete state
export const initialAthleteState: AthleteState = {
  profile: null,
  status: ''
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
        status: 'Changes saved!'
      };

    case UPDATE_ATHLETE_FAILURE:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_FAILURE:
      return {
        profile: state.profile,
        status: action.payload as string
      };

    default:
      return state;
  }
};

export default athleteReducer;
