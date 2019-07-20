import React from 'react';
import App, { AppProps, Container, AppContext } from 'next/app';
import Head from 'next/head';
import { DeepPartial, Store } from 'redux';
import { Provider } from 'react-redux';
import { AppState, initializeStore } from '../store';
import { AthleteState } from '../store/athlete/types';
import { ThemeState } from '../store/theme/types';

/**
 * Fetches existing stored Redux state or initializes new one.
 * @param initialState {AppState} - Redux state object.
 */
const getOrCreateStore = (
  initialState?: DeepPartial<AppState>
): Store<AppState> => {
  // Initialize new state if on server
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  // Store Redux store on window if non-existant
  if (!(window as any)['__NEXT_REDUX_STORE__']) {
    (window as any)['__NEXT_REDUX_STORE__'] = initializeStore(initialState);
  }

  // Fetch Redux store from window
  return (window as any)['__NEXT_REDUX_STORE__'];
};

interface AppWithReduxProps {
  pageProps: {};
  initialState: {
    athlete: AthleteState;
    theme: ThemeState;
  };
}

/**
 * Wrap Next pages with Redux.
 */
class AppWithRedux extends App {
  public static async getInitialProps({
    Component,
    ctx
  }: AppContext): Promise<AppWithReduxProps> {
    // Initialize store
    const store = getOrCreateStore();

    // Fetch any NextPage props
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Fetch athlete from passport session if existant
    let athlete = store.getState().athlete;
    if (!athlete.profile && ctx.req && ctx.req['user']) {
      athlete.profile = ctx.req['user'];
    }

    return {
      pageProps,
      initialState: {
        athlete,
        theme: store.getState().theme
      }
    };
  }

  private store: Store<AppState>;

  public constructor(props: AppWithReduxProps & AppProps) {
    super(props);
    this.store = getOrCreateStore(props.initialState);
  }

  public render(): React.ReactElement {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>NextRX</title>
        </Head>
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default AppWithRedux;
