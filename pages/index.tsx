import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Box, Heading, Layer, ResponsiveContext, Tab, Tabs } from 'grommet';
import withGrommet from '../lib/withGrommet';
import { Emoji, LoginForm, SignUpForm } from '../components';

/**
 * Entry point login page.
 */
const IndexPage: NextPage<{}> = (): React.ReactElement => {
  return (
    <Layer full position="center">
      <ResponsiveContext.Consumer>
        {(size: string): React.ReactElement => (
          <Box
            fill
            flex
            direction={size === 'small' ? 'column' : 'row'}
            justify="around"
            align="center"
            background="brand"
            overflow="auto"
          >
            <Box direction="column" align="center" justify="center">
              <Heading level="1" textAlign="center" margin="small">
                Welcome to NextRX!
              </Heading>
              <Box align="center" justify="center">
                <Heading level="3" textAlign="center" margin="small">
                  Sign in or sign up to get started.&nbsp;
                  <Emoji symbol="💪" label="muscle" />
                </Heading>
                <Heading level="4" textAlign="center" margin={{ top: 'small' }}>
                  Or,{' '}
                  <Link href="/dummy">
                    <a>view a dummy account.</a>
                  </Link>
                </Heading>
              </Box>
            </Box>
            <Box direction="row">
              <Tabs>
                <Tab title="Sign In">
                  <Box pad={{ top: 'small' }}>
                    <LoginForm />
                  </Box>
                </Tab>
                <Tab title="Sign Up">
                  <Box pad={{ top: 'small' }}>
                    <SignUpForm />
                  </Box>
                </Tab>
              </Tabs>
            </Box>
            <style jsx>{`
              a {
                color: #fff;
              }

              a:hover {
                opacity: 0.6;
              }
            `}</style>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Layer>
  );
};

export default withGrommet(IndexPage);
