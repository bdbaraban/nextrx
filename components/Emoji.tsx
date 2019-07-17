import React from 'react';

interface EmojiProps {
  label: string;
  symbol: string;
}

const Emoji = ({ label, symbol }: EmojiProps): React.ReactElement => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);

export default React.memo(Emoji);
