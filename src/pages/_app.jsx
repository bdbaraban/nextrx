import React from 'react';
import App, { NextContainer } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../store';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <NextContainer>
        <Head>
          <title>RXAthlete</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </NextContainer>
    );
  }
}

export default MyApp;
