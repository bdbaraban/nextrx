import React from 'react';
import { Box, Text } from 'grommet';

const Footer = () => {
  return (
    <Box
      tag="footer"
      direction="row"
      align="center"
      justify="center"
      background="light-2"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      margin={{ top: 'medium' }}
    >
      <Text level="3" margin="none">
        RXAthlete Inc.
      </Text>
    </Box>
  );
};

export default React.memo(Footer);
