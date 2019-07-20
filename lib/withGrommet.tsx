import React from 'react';
import { NextPage } from 'next';
import { connect } from 'react-redux';
import { Grommet } from 'grommet';
import { AppState } from '../store';
/* eslint-disable @typescript-eslint/explicit-function-return-type */

interface AppWithGrommetProps {
  theme: object;
}

/**
 * Wrap Next pages with Grommet.
 */
export default (App: NextPage<{}>) => {
  const mapStateToProps = ({ theme }: AppState): AppWithGrommetProps => {
    return { theme: theme.object };
  };

  return connect(mapStateToProps)(
    ({ theme }: AppWithGrommetProps): React.ReactElement => (
      <>
        <Grommet theme={theme} full>
          <App />
        </Grommet>
        <style jsx global>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol';
          }
        `}</style>
      </>
    )
  );
};
