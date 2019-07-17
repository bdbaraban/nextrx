import React from 'react';
import { Box } from 'grommet';
import { NextPage } from 'next';
import Link from 'next/link';

const IndexPage: NextPage<{}> = (): React.ReactElement => {
  return (
    <Box fill justify="center" align="center">
      <Link href="/login">Login</Link>
    </Box>
  );
};

export default IndexPage;
