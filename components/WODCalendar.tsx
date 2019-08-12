import React from 'react';
import { Box, Calendar } from 'grommet';

/**
 * WODCalendar component prop types
 */
interface WODCalendarProps {
  date: Date;
  size: string;
  handleSelect: (newDate: any) => void;
}

/**
 * Interactive calendar for selecting active workout.
 */
const WODCalendar = ({
  date,
  size,
  handleSelect
}: WODCalendarProps): React.ReactElement => {
  return (
    <Box width={size === 'small' ? '100%' : '50%'} justify="center">
      <Calendar
        size="medium"
        alignSelf="center"
        daysOfWeek
        date={date.toISOString()}
        onSelect={handleSelect}
      />
    </Box>
  );
};

export default React.memo(WODCalendar);
