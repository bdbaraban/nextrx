import React from 'react';
import { Box, Heading, Image } from 'grommet';

const AthleteInfo = props => {
  return (
    <React.Fragment>
      <Box
        alignSelf="center"
        height="xsmall"
        width="xsmall"
        margin={{ right: 'medium' }}
      >
        <Image src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/46857583_1939285332773307_9124487703423877120_n.jpg?_nc_cat=101&_nc_oc=AQkPTt0sxNWzpg_Pl0EsflTCE-GRCMiyDTkq_ZoAYkSeHKaCA38LJ3Fc-ajnotWOeqg&_nc_ht=scontent-sjc3-1.xx&oh=1373649fb4681b631eb4bb9fc39d8164&oe=5DC53061" />
      </Box>
      <Box direction="column">
        <Heading level="2" textAlign="center" margin="xsmall">
          Brennan D Baraban
        </Heading>
        <Box
          flex
          direction={props.size === 'small' ? 'column' : 'row'}
          justify="center"
          align="center"
        >
          <Heading level="4" textAlign="center" margin="xsmall">
            Affiliate:
          </Heading>
          <Heading level="4" textAlign="center" margin="xsmall">
            CrossFit Novato
          </Heading>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AthleteInfo;
