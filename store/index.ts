import {
  applyMiddleware,
  combineReducers,
  createStore,
  DeepPartial,
  Store
} from 'redux';
import thunk from 'redux-thunk';
import athleteReducer, { initialAthleteState } from './athlete/reducer';
import themeReducer, { initialThemeState } from './theme/reducer';
import { AthleteState } from './athlete/types';
import { ThemeState } from './theme/types';

// Configure default Redux state
const defaultState: DeepPartial<{
  theme: ThemeState;
  athlete: AthleteState;
}> = {
  athlete: initialAthleteState,
  theme: initialThemeState
};

// Combine athlete and theme reducers
const rootReducer = combineReducers({
  athlete: athleteReducer,
  theme: themeReducer
});

// Redux state type
export type AppState = ReturnType<typeof rootReducer>;

/**
 * Instantiate the Redux store.
 * @param initialState - Default Redux state.
 */
export const initializeStore = (
  initialState = defaultState
): Store<AppState> => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};
