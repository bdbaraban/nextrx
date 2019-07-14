import { combineReducers, createStore, DeepPartial, Store } from 'redux';
import themeReducer from './theme/reducer';
import { ThemeState } from './theme/types';
import { lightTheme } from '../lib/themes';

const defaultState: DeepPartial<{ theme: ThemeState }> = {
  theme: {
    type: 'light',
    object: lightTheme
  }
};

const rootReducer = combineReducers({
  theme: themeReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const initializeStore = (
  initialState = defaultState
): Store<AppState> => {
  return createStore(rootReducer, initialState);
};
