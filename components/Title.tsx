import React from 'react';
import Link from 'next/link';
import { Heading, Box } from 'grommet';
import { Logo } from './';

const Title = (): React.ReactElement => (
  <Link href="/athlete">
    <a>
      <Box direction="row" align="center" justify="start">
        <Logo size={42} />
        <Heading
          level="1"
          size="small"
          margin={{ left: 'small', top: 'none', bottom: 'none', right: 'none' }}
        >
          NextRX
        </Heading>
      </Box>
      <style jsx>
        {`
          a {
            text-decoration: none;
            color: #fff;
          }
        `}
      </style>
    </a>
  </Link>
);

export default Title;
