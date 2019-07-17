import React from 'react';
import { connect } from 'react-redux';
import { Box, ResponsiveContext } from 'grommet';
import { AthleteAvatar } from '../components';
import { AppState } from '../store';
import { Athlete } from '../db/types';
import { ActivityBox } from 'containers';

interface InfoSectionProps {
  athlete: Athlete;
}

/**
 * Athlete avatar and activity table section.
 */
const InfoSection = ({ athlete }: InfoSectionProps): React.ReactElement => {
  return (
    <ResponsiveContext.Consumer>
      {(size: string): React.ReactElement => (
        <Box
          flex
          direction={size === 'small' ? 'column' : 'row'}
          align="center"
          alignSelf="center"
          justify="between"
          width={size === 'small' ? '100%' : '85%'}
          style={{ minHeight: 'min-content' }}
        >
          <AthleteAvatar athlete={athlete} />
          <ActivityBox size={size} athlete={athlete} />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

const mapStateToProps = (state: AppState): { athlete: Athlete } => {
  return { athlete: state.athlete.profile };
};

export default connect(mapStateToProps)(InfoSection);
