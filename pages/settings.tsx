import React from 'react';
import { NextPage } from 'next';
import { Box, Heading, Tabs, Tab } from 'grommet';
import { Footer, SettingsForm, ChangePasswordForm } from '../components';
import { AppBar } from '../containers';
import withGrommet from '../lib/withGrommet';
import Link from 'next/link';

const SettingsPage: NextPage<{}> = (): React.ReactElement => {
  return (
    <>
      <AppBar />
      <Box flex align="center" justify="center">
        <Heading level="3">Your Account Settings</Heading>
        <Tabs>
          <Tab title="Profile">
            <Box pad={{ top: 'small' }}>
              <SettingsForm />
            </Box>
          </Tab>
          <Tab title="Password">
            <Box pad={{ top: 'small' }}>
              <ChangePasswordForm />
            </Box>
          </Tab>
        </Tabs>
        <Box direction="row" justify="around" width="medium">
          <Link href="/verify">
            <a>Verify Email</a>
          </Link>
          <Link href="/delete">
            <a>Delete Account</a>
          </Link>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default withGrommet(SettingsPage);
