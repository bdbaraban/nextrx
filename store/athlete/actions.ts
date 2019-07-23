import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import fetch from 'isomorphic-unfetch';
import {
  AthleteState,
  UPDATE_ATHLETE_FAILURE,
  UPDATE_ATHLETE_SUCCESS
} from './types';
import { Athlete } from 'db/types';

/**
 * Update the athlete.
 * @param attributes - Athlete attributes to update.
 */
export const updateAthlete: ActionCreator<
  ThunkAction<void, AthleteState, null, Action<string>>
> = (
  attributes: Partial<Athlete>
): ThunkAction<void, AthleteState, null, Action<string>> => async (
  dispatch
): Promise<Action<string>> => {
  const response = await fetch('/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(attributes)
  });

  const data = await response.json();

  if (!data.success) {
    return dispatch({
      type: UPDATE_ATHLETE_FAILURE,
      payload: data.message
    });
  } else {
    return dispatch({
      type: UPDATE_ATHLETE_SUCCESS,
      payload: attributes
    });
  }
};
