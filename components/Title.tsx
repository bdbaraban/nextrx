import React from 'react';
import Link from 'next/link';
import { Heading } from 'grommet';

const Title = (): React.ReactElement => (
  <>
    <Heading level="3" margin="none">
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
  </>
);

export default Title;
