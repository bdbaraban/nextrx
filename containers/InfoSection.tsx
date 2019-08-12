import React from 'react';
import { Box, ResponsiveContext } from 'grommet';
import { Athlete } from '../db/types';
import { AthleteAvatar, ActivityChart, AthleteInfo } from '../components';

/**
 * InfoSection container prop types
 */
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
          justify="around"
          height="min-content"
          width="85%"
        >
          <Box
            direction="column"
            gap="medium"
            margin={size === 'small' ? 'large' : 'small'}
          >
            <AthleteAvatar athlete={athlete} />
            <AthleteInfo athlete={athlete} />
          </Box>
          <Box
            direction="column"
            align="center"
            margin={size === 'small' ? 'large' : 'small'}
            width={size === 'small' ? '100%' : '45%'}
          >
            <ActivityChart athlete={athlete} />
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default InfoSection;
