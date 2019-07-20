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
          >
            <Box direction="column">
              <Heading a11yTitle="Welcome title" level="1" textAlign="center">
                Welcome to NextRX!
              </Heading>
              <Heading
                a11yTitle="Welcome subtitle"
                level="3"
                textAlign="center"
              >
                Sign in or sign up to get started.&nbsp;
                <Emoji symbol="💪" label="muscle" />
              </Heading>
              <Heading level="5" textAlign="center">
                Or, <Link>view a dummy account.</Link>
              </Heading>
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
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Layer>
  );
};

export default withGrommet(IndexPage);
