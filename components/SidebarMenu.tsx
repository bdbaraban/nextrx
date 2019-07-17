import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Box, Heading, Layer } from 'grommet';
import { logoutAthlete } from '../store/athlete/actions';
import { AppState } from '../store';
import { Athlete } from 'db/types';

interface SidebarMenuProps {
  athlete: Athlete;
  toggleOpen: VoidFunction;
}

const SidebarMenu = ({ toggleOpen }: SidebarMenuProps): React.ReactElement => {
  return (
    <Layer
      full="vertical"
      animate={false}
      position="right"
      onEsc={toggleOpen}
      onClickOutside={toggleOpen}
    >
      <Box
        flex
        align="center"
        alignSelf="center"
        justify="center"
        direction="column"
        margin={{ left: 'large', right: 'large', bottom: 'large' }}
      >
        <Box align="center" margin="large">
          <Heading level="4">Your Account</Heading>
          <Link href="/athlete/settings">
            <a>Settings</a>
          </Link>
          <Link href="/logout">
            <a>Log Out</a>
          </Link>
        </Box>
        <Box align="center" margin="large">
          <Heading level="4">About NextRX</Heading>
          <Link href="https://bdov.dev">
            <a>Author</a>
          </Link>
          <Link href="https://github.com/bdbaraban">
            <a>GitHub</a>
          </Link>
          <Link href="mailto:nextrx@bdov.dev">
            <a>Contact</a>
          </Link>
        </Box>
        <style jsx>{`
              a {
                text-decoration: none;
                color: inherit;
              }

              a:hover {
                opacity: 0.8;
            `}</style>
      </Box>
    </Layer>
  );
};

const mapStateToProps = (state: AppState): { athlete: Athlete } => {
  return { athlete: state.athlete.profile };
};

const mapDispatchToProps = { logoutAthlete };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarMenu);
