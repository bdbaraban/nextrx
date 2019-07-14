import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Heading } from 'grommet';
import Emoji from './Emoji';

const mapStateToProps = state => {
  return { theme: state.theme };
};

const Divider = props => (
  <Box fill="horizontal" align="center" justify="center">
    <Heading
      style={
        props.theme.type === 'dark'
          ? {
              borderBottom: '2px dotted #666666',
              lineHeight: 0,
              minWidth: '85%'
            }
          : {
              borderBottom: '2px dotted black',
              lineHeight: 0,
              minWidth: '85%'
            }
      }
      textAlign="center"
      level="4"
    >
      <span
        style={
          props.theme.type === 'dark'
            ? { background: '#181a1b' }
            : { background: 'white' }
        }
      >
        <Emoji symbol={props.text === "WOD's" ? '💪' : '🎖'} />
        {` ${props.text} `}
        <Emoji symbol={props.text === "WOD's" ? '💪' : '🎖'} />
      </span>
    </Heading>
  </Box>
);

Divider.propTypes = {
  text: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Divider);
