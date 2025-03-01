import React from 'react';
import { Box, Image, Text } from 'grommet';
import { Athlete } from '../db/types';

interface AthleteAvatarProps {
  athlete: Athlete;
}

/**
 * Athlete image, name and affiliate
 */
const AthleteAvatar = ({ athlete }: AthleteAvatarProps): React.ReactElement => {
  return (
    <Box direction="row" align="center" gap="medium">
      <Box alignSelf="center" height="xsmall" width="xsmall">
        <Image
          a11yTitle="Athlete profile picture"
          src={athlete.profile_image_url}
        />
      </Box>
      <Box justify="between">
        <Text weight="bold" size="xlarge" truncate={true}>
          {`${athlete.first_name} ${athlete.last_name}`}
        </Text>
        <Text size="large" truncate={true}>
          {athlete.affiliate}
        </Text>
      </Box>
    </Box>
  );
};

export default AthleteAvatar;
