import React from 'react';
import { Box, Heading } from 'grommet';
import { Athlete } from '../db/types';
import { ActivityChart } from '../components';

interface ActivityBoxProps {
  athlete: Athlete;
  size: string;
}

const ActivityBox = ({
  athlete,
  size
}: ActivityBoxProps): React.ReactElement => {
  return (
    <Box
      direction="column"
      align="center"
      width={size === 'small' ? '100%' : '45%'}
    >
      <Heading level="4" textAlign="center">
        Active days this week: {athlete.workouts.length}
      </Heading>
      <ActivityChart athlete={athlete} />
    </Box>
  );
};

export default ActivityBox;
