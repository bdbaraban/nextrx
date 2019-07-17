import React from 'react';
import { Box } from 'grommet';
import { Title, ThemeToggleButton } from '../components';
import { Sidebar } from '.';

/**
 * Top page navigation bar.
 */
const AppBar = (): React.ReactElement => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      margin={{ bottom: 'medium' }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <Title />
      <Box direction="row">
        <ThemeToggleButton />
        <Sidebar />
      </Box>
    </Box>
  );
};

export default AppBar;
