import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Info } from 'grommet-icons';
import { ThemeState } from '../store/theme/types';
import { setDarkTheme, setLightTheme } from '../store/theme/actions';
import { IconButton } from '../components';
import { AppState } from '../store';

/**
 * Light/dark theme toggler
 */
const ThemeToggleButton = (): React.ReactElement => {
  const theme = useSelector((state: AppState): ThemeState => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = (): void => {
    if (theme.type === 'dark') {
      dispatch(setLightTheme());
    } else {
      dispatch(setDarkTheme());
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

export default ThemeToggleButton;
