import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { COLOR } from './utils/colors';

const mainTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: COLOR.primary,
      dark: COLOR.primaryDark,
      contrastText: COLOR.text,
    },
    secondary: {
      main: COLOR.secondary,
      contrastText: COLOR.text,
    },
    background: {
      default: COLOR.background,
      paper: COLOR.surface,
    },
    text: {
      primary: COLOR.text,
      secondary: COLOR.textSecondary,
    },
    success: {
      main: COLOR.success,
      contrastText: COLOR.text,
    },
    divider: COLOR.border,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: COLOR.background,
          color: COLOR.text,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: COLOR.primaryDark,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: COLOR.surface,
          backgroundImage: 'none',
        },
      },
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
