import { combineReducers, createStore, DeepPartial, Store } from 'redux';
import athleteReducer, { initialAthleteState } from './athlete/reducer';
import themeReducer, { initialThemeState } from './theme/reducer';
import { AthleteState } from './athlete/types';
import { ThemeState } from './theme/types';

const defaultState: DeepPartial<{
  theme: ThemeState;
  athlete: AthleteState;
}> = {
  athlete: initialAthleteState,
  theme: initialThemeState
};

const rootReducer = combineReducers({
  athlete: athleteReducer,
  theme: themeReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const initializeStore = (
  initialState = defaultState
): Store<AppState> => {
  return createStore(rootReducer, initialState);
};
