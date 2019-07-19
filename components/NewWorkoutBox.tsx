import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Add, Close } from 'grommet-icons';
import { Workout } from '../db/types';
import WorkoutForm from './WorkoutForm';

interface NewWorkoutBoxProps {
  toggleOpen: VoidFunction;
  date: Date;
  workout: Workout;
}

const NewWorkoutBox = ({
  toggleOpen,
  date
}: NewWorkoutBoxProps): React.ReactElement => {
  return (
    <Box
      fill
      flex
      justify="start"
      align="center"
      overflow="auto"
      margin={{ bottom: 'large' }}
    >
      <Box
        fill="horizontal"
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="accent-1"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      >
        <Button
          a11yTitle="button to close new workout dialog"
          icon={<Close />}
          onClick={toggleOpen}
        />
        <Button
          a11yTitle="button to post new workout"
          primary
          label="Post"
          icon={<Add />}
        />
      </Box>
      <Box
        flex
        align="center"
        height="min-content"
        width="medium"
        margin={{
          right: 'large',
          left: 'large',
          top: 'medium',
          bottom: 'large'
        }}
      >
        <Heading level="3" textAlign="center" margin="small">
          New Workout
        </Heading>
        <Heading level="3" textAlign="center" margin="small">
          {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
        </Heading>
        <WorkoutForm />
        <WorkoutForm />
        <WorkoutForm />
      </Box>
    </Box>
  );
};

export default NewWorkoutBox;
