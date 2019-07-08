import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Layer, Stack } from 'grommet';
import { AddCircle } from 'grommet-icons';
import NewWorkoutBox from './NewWorkoutBox';

const WODStack = ({ date }) => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stack anchor="top-right" style={{ width: '85%' }}>
      <Box
        border={{ color: 'brand', size: 'medium' }}
        alignSelf="center"
        align="center"
        justify="center"
        width="100%"
        height="min-content"
        round="small"
        pad="small"
        elevation="small"
      >
        <Heading level="4">
          {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
        </Heading>
        <Heading level="6">
          2 Rounds For Time:
          <ul>
            <li>5 Air Squats</li>
            <li>10 Pull-Ups</li>
          </ul>
        </Heading>
      </Box>
      <Button
        a11yTitle="Post new workout button"
        icon={<AddCircle color="accent-1" size="medium" />}
        onClick={toggleOpen}
      />
      {open && (
        <Layer onEsc={toggleOpen} onClickOutside={toggleOpen}>
          <NewWorkoutBox toggleOpen={toggleOpen} date={date} />
        </Layer>
      )}
    </Stack>
  );
};

WODStack.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired
};

export default WODStack;
