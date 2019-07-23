import React from 'react';
import { Box, Layer, Text } from 'grommet';

interface PopperProps {
  message: string;
}

/**
 * Settings form popper indicating saved changes
 */
const Popper = ({ message }: PopperProps): React.ReactElement => {
  return (
    <Layer margin="small" modal={false} position="left" responsive={false}>
      <Box
        flex
        align="center"
        justify="center"
        elevation="medium"
        pad="small"
        round="small"
        border={{
          color: 'brand',
          size: 'medium',
          style: 'solid',
          side: 'all'
        }}
      >
        <Text textAlign="center">{message}</Text>
      </Box>
    </Layer>
  );
};

export default React.memo(Popper);
