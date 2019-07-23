import React from 'react';
import { NextPage } from 'next';
import { Box } from 'grommet';
import { Divider, Footer } from '../components';
import {
  AppBar,
  InfoSection,
  WorkoutSection,
  RecordsSection
} from '../containers';
import withGrommet from '../lib/withGrommet';

/**
 * Athlete profile page
 */
const AthletePage: NextPage<{}> = (): React.ReactElement => {
  return (
    <>
      <AppBar />
      <Box flex direction="column" align="center" justify="center">
        <InfoSection />
        <Divider text="WOD's" symbol="💪" label="muscle" />
        <WorkoutSection />
        <Divider text="Records" symbol="🏅" label="medal" />
        <RecordsSection />
      </Box>
      <Footer />
    </>
  );
};

export default withGrommet(AthletePage);
