import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDarkTheme, setLightTheme } from '../actions';
import Link from 'next/link';
import { Box, Button, Heading, Layer, Anchor } from 'grommet';
import { Close, Info, Menu } from 'grommet-icons';
import { lightTheme, darkTheme } from '../themes';

const AppBar = props => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    if (props.theme.type === 'dark') {
      props.setLightTheme(lightTheme);
    } else {
      props.setDarkTheme(darkTheme);
    }
  };

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      margin={{ bottom: 'medium' }}
      elevation="medium"
      style={{ zIndex: '1' }}
    >
      <Heading level="3" margin="none">
        RXAthlete
      </Heading>
      <Box direction="row">
        <Button
          a11yTitle="theme toggle button"
          color="brand"
          icon={<Info />}
          onClick={toggleTheme}
        />
        <Button
          icon={open ? <Close color="accent-1" /> : <Menu />}
          onClick={toggleOpen}
          style={{ zIndex: '9999' }}
        />
        {open && (
          <Layer
            full="vertical"
            animate={false}
            position="right"
            background="dark-2"
            onEsc={toggleOpen}
            onClickOutside={toggleOpen}
          >
            <Box
              flex
              full="horizontal"
              align="center"
              alignSelf="center"
              justify="center"
              direction="column"
              margin={{ left: 'large', right: 'large', bottom: 'large' }}
            >
              <Box align="center" margin="large">
                <Heading level="4">Your Account</Heading>
                <Anchor>
                  <Link href="user">
                    <a>Settings</a>
                  </Link>
                </Anchor>
                <Anchor>
                  <Link href="logout">
                    <a>Log Out</a>
                  </Link>
                </Anchor>
              </Box>
              <Box align="center" margin="large">
                <Heading level="4">About RXAthlete</Heading>
                <Anchor>
                  <Link href="user">
                    <a>Author</a>
                  </Link>
                </Anchor>
                <Anchor>
                  <Link href="logout">
                    <a>GitHub</a>
                  </Link>
                </Anchor>
                <Anchor>
                  <Link href="logout">
                    <a>Contact</a>
                  </Link>
                </Anchor>
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
        )}
      </Box>
    </Box>
  );
};

AppBar.propTypes = {
  theme: PropTypes.object.isRequired,
  setDarkTheme: PropTypes.func.isRequired,
  setLightTheme: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { theme: state.theme };
};

const mapDispatchToProps = { setDarkTheme, setLightTheme };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar);
