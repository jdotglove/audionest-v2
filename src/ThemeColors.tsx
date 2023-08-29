import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { COLOR } from './utils/colors';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: COLOR.primary,
      contrastText: COLOR.secondary,
    },
    secondary: {
      main: COLOR.secondary,
    },
  },
});

class ThemeColors extends React.PureComponent<{
  children: React.ReactNode
}> {
  render() {
    return (
      <ThemeProvider theme={mainTheme}>{this.props.children}</ThemeProvider>
    );
  }
}

export default ThemeColors;
