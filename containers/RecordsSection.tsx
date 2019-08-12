import React from 'react';
import { Box } from 'grommet';
import { RecordsTable } from '../components';
import { Athlete } from '../db/types';

/**
 * RecordsSection container prop types
 */
interface RecordsSectionProps {
  athlete: Athlete;
}

/**
 * Section wrapping weightlifting benchmarks table
 */
const RecordsSection = ({
  athlete
}: RecordsSectionProps): React.ReactElement => {
  return (
    <Box
      flex
      direction="row"
      align="center"
      justify="center"
      width="85%"
      style={{ minHeight: 'min-content' }}
    >
      <RecordsTable athlete={athlete} />
    </Box>
  );
};

export default RecordsSection;
