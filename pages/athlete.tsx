import React from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { Box } from 'grommet';
import withGrommet from '../lib/withGrommet';
import { AppState } from '../store';
import { Athlete } from '../db/types';
import { Divider, Footer } from '../components';
import { AppBar, InfoSection, RecordsSection, WODSection } from '../containers';

/**
 * Athlete profile page
 */
const AthletePage: NextPage<{}> = (): React.ReactElement => {
  // Select current logged in athlete from Redux store
  const athlete = useSelector(
    (state: AppState): Athlete => state.athlete.profile
  );

  return (
    <>
      <AppBar />
      <Box flex direction="column" align="center" justify="center">
        <InfoSection athlete={athlete} />
        <Divider text="WOD's" symbol="🏋️" label="person-lifting-weights" />
        <WODSection athlete={athlete} />
        <Divider text="Records" symbol="🏅" label="medal" />
        <RecordsSection athlete={athlete} />
      </Box>
      <Footer />
    </>
  );
};

export default withGrommet(AthletePage);
