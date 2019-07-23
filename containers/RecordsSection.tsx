import React from 'react';
import { Box } from 'grommet';
import { RecordsTable } from '../components';

const RecordsSection = (): React.ReactElement => {
  return (
    <Box
      flex
      direction="row"
      align="center"
      justify="center"
      width="85%"
      style={{ minHeight: 'min-content' }}
    >
      <RecordsTable />
    </Box>
  );
};

export default RecordsSection;
