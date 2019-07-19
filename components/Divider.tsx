import React from 'react';
import { connect } from 'react-redux';
import { Box, Heading } from 'grommet';
import { ThemeState } from '../store/theme/types';
import { AppState } from '../store';
import Emoji from './Emoji';

interface DividerProps {
  theme: ThemeState;
  symbol: string;
  text: string;
  label: string;
}

/**
 * Emoji-styled section divider.
 */
const Divider = ({
  theme,
  symbol,
  text,
  label
}: DividerProps): React.ReactElement => {
  return (
    <Box fill="horizontal" align="center" justify="center">
      <Heading
        textAlign="center"
        level="4"
        style={
          theme.type === 'dark'
            ? {
                borderBottom: '2px dotted #666666',
                lineHeight: 0,
                minWidth: '85%'
              }
            : {
                borderBottom: '2px dotted #000',
                lineHeight: 0,
                minWidth: '85%'
              }
        }
      >
        <span
          style={
            theme.type === 'dark'
              ? {
                  background: '#181a1b'
                }
              : {
                  background: '#fff'
                }
          }
        >
          <Emoji label={label} symbol={symbol} />
          {` ${text} `}
          <Emoji label={label} symbol={symbol} />
        </span>
      </Heading>
    </Box>
  );
};

const mapStateToProps = (state: AppState): { theme: ThemeState } => {
  return { theme: state.theme };
};

export default connect(mapStateToProps)(Divider);
