import React from 'react';
import App, { AppProps, Container, AppContext } from 'next/app';
import Head from 'next/head';
import { DeepPartial, Store } from 'redux';
import { Provider } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import { Grommet } from 'grommet';
import { AppState, initializeStore } from '../store';
import { AthleteState } from '../store/athlete/types';
import { ThemeState } from '../store/theme/types';

interface AppWithReduxProps {
  pageProps: {};
  initialState: {
    athlete: AthleteState;
    theme: ThemeState;
  };
}

const getOrCreateStore = (
  initialState?: DeepPartial<AppState>
): Store<AppState> => {
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  if (!(window as any)['__NEXT_REDUX_STORE__']) {
    (window as any)['__NEXT_REDUX_STORE__'] = initializeStore(initialState);
  }
  return (window as any)['__NEXT_REDUX_STORE__'];
};

class AppWithRedux extends App {
  public static async getInitialProps({
    Component,
    ctx
  }: AppContext): Promise<AppWithReduxProps> {
    const store = getOrCreateStore();

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    let athlete = null;
    if (ctx.req && ctx.req['session'].passport) {
      const email = ctx.req['session'].passport.user.email;
      const res = await fetch(`http://localhost:3000/api/athletes/${email}`);
      athlete = await res.json();
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
          <Grommet theme={this.store.getState().theme.object} full>
            <Component {...pageProps} />
          </Grommet>
        </Provider>
      </Container>
    );
  }
}

export default AppWithRedux;
