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
      <Grommet theme={theme} full>
        <App />
      </Grommet>
    )
  );
};
