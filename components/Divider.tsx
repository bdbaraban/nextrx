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
      <Heading textAlign="center" level="4">
        <span>
          <Emoji label={label} symbol={symbol} />
          {` ${text} `}
          <Emoji label={label} symbol={symbol} />
        </span>
      </Heading>
      <style jsx>
        {theme.type === 'dark'
          ? `
      h4 {
        border-bottom: '2px dotted #666666';
        line-height: 0;
        min-width: 85%;
      }
      span {
        background: #181a1b;
      }`
          : `
      h4 {
        border-bottom: '2px dotted black';
        line-height: 0;
        min-width: 85%;
      }
      span {
        background: #fff;
      }
      `}
      </style>
    </Box>
  );
};

const mapStateToProps = (state: AppState): { theme: ThemeState } => {
  return { theme: state.theme };
};

export default connect(mapStateToProps)(Divider);
