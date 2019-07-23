import React from 'react';
import Link from 'next/link';
import { Heading, Box } from 'grommet';
import { Logo } from './';

const Title = (): React.ReactElement => (
  <Box direction="row" align="center" justify="start">
    <Logo size={42} />
    <Heading
      level="3"
      margin={{ left: 'small', top: 'none', bottom: 'none', right: 'none' }}
    >
      <Link href="/athlete">
        <a>NextRX</a>
      </Link>
    </Heading>
    <style jsx>
      {`
        a {
          text-decoration: none;
          color: #fff;
        }
      `}
    </style>
  </Box>
);

export default Title;
