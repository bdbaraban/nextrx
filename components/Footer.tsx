import React from 'react';
import { Box, Text } from 'grommet';

/**
 * Page footer component.
 */
const Footer = (): React.ReactElement => {
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
      <Text margin="none">Built with Next.js, Grommet, and MongoDB.</Text>
    </Box>
  );
};

export default Footer;
