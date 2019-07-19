import React from 'react';
import { connect } from 'react-redux';
import { Box, ResponsiveContext } from 'grommet';
import { AppState } from '../store';
import { Athlete } from '../db/types';
import { WorkoutCalendar, WorkoutCard } from '../components';

interface WorkoutSectionProps {
  athlete: Athlete;
}

const WorkoutSection = ({
  athlete
}: WorkoutSectionProps): React.ReactElement => {
  const [date, setDate] = React.useState(new Date());

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
          width={size === 'small' ? '100%' : '85%'}
          style={{ minHeight: 'min-content' }}
        >
          <WorkoutCalendar
            date={date}
            size={size}
            handleSelect={handleSelect}
          />
          <Box
            width={size === 'small' ? '100%' : '50%'}
            margin={size === 'small' ? { top: 'large' } : {}}
            align="center"
            justify="center"
          >
            <WorkoutCard athlete={athlete} date={date} />
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

const mapStateToProps = (state: AppState): { athlete: Athlete } => {
  return { athlete: state.athlete.profile };
};

export default connect(mapStateToProps)(WorkoutSection);
