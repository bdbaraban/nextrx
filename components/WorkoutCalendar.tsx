import React from 'react';
import { Box, Calendar } from 'grommet';

interface WorkoutCalendarProps {
  date: Date;
  size: string;
  handleSelect: (newDate: any) => void;
}

/**
 * Interactive calendar for selecting active workout.
 */
const WorkoutCalendar = ({
  date,
  size,
  handleSelect
}: WorkoutCalendarProps): React.ReactElement => {
  return (
    <Box width={size === 'small' ? '100%' : '50%'} justify="center">
      <Calendar
        size="small"
        alignSelf="center"
        daysOfWeek
        date={date.toISOString()}
        onSelect={handleSelect}
      />
    </Box>
  );
};

export default React.memo(WorkoutCalendar);
