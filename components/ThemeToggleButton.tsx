import React from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'grommet-controls';
import { Info } from 'grommet-icons';
import { ThemeActionTypes, ThemeState } from '../store/theme/types';
import { setDarkTheme, setLightTheme } from '../store/theme/actions';
import { AppState } from '../store';
import { darkTheme, lightTheme } from '../lib/themes';

interface ThemeToggleButtonProps {
  theme: ThemeState;
  setLightTheme: (payload: object) => ThemeActionTypes;
  setDarkTheme: (payload: object) => ThemeActionTypes;
}

const ThemeToggleButton = ({
  theme,
  setLightTheme,
  setDarkTheme
}: ThemeToggleButtonProps): React.ReactElement => {
  const toggleTheme = (): void => {
    if (theme.type === 'dark') {
      setLightTheme(lightTheme);
    } else {
      setDarkTheme(darkTheme);
    }
  };

  return (
    <IconButton
      a11yTitle="dark theme toggle button"
      color="brand"
      icon={<Info />}
      onClick={toggleTheme}
    />
  );
};

const mapStateToProps = (state: AppState): { theme: ThemeState } => {
  return { theme: state.theme };
};

const mapDispatchToProps = { setDarkTheme, setLightTheme };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeToggleButton);
