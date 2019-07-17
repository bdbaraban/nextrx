import React from 'react';
import Link from 'next/link';
import { Heading } from 'grommet';

const Title = (): React.ReactElement => (
  <Link href="/">
    <Heading level="3" margin="none">
      NextRX
    </Heading>
  </Link>
);

export default Title;
