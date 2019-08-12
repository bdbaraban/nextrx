import React from 'react';
import { Box, ResponsiveContext } from 'grommet';
import { Athlete } from '../db/types';
import { WODCalendar, WODCard } from '../components';

/**
 * WODSection prop types
 */
interface WODSectionProps {
  athlete: Athlete;
}

const WODSection = ({ athlete }: WODSectionProps): React.ReactElement => {
  // Current selected date on WODCalender
  const [date, setDate] = React.useState(new Date());

  // Handle WODCalendar date changes
  const handleSelect = (newDate: any): void => {
    setDate(new Date(newDate));
  };

  return (
    <ResponsiveContext.Consumer>
      {(size: string): React.ReactElement => (
        <Box
          flex
          direction={size === 'small' ? 'column' : 'row'}
          align="center"
          justify="center"
          width="85%"
          style={{ minHeight: 'min-content' }}
        >
          <WODCalendar date={date} size={size} handleSelect={handleSelect} />
          <Box
            width={size === 'small' ? '100%' : '50%'}
            margin={size === 'small' ? { top: 'large' } : {}}
            align="center"
            justify="center"
          >
            <WODCard athlete={athlete} date={date} />
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default WODSection;
