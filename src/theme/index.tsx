import { createTheme, styled, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

interface Gradient {
  gradient1: string
}

interface Height {
  header: string
  mobileHeader: string
  footer: string
}
interface Width {
  sidebar: string
  maxContent: string
}

declare module '@mui/material/styles' {
  interface Theme {
    gradient: Gradient
    height: Height
    width: Width
  }
}

declare module '@mui/material/styles/createTheme' {
  interface ThemeOptions {
    gradient: Gradient
    height: Height
    width: Width
  }
  interface Theme {
    gradient: Gradient
    height: Height
    width: Width
  }
}

export const theme = {
  palette: {
    primary: {
      light: '#ADDFB5',
      main: '#31B047',
      dark: '#129026',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#31B047',
      main: '#D4F3D8',
      dark: '#129026',
      contrastText: '#ffffff'
    },
    error: {
      main: '#FA0E0E',
      light: '#FA0E0E10'
    },
    warning: {
      main: '#F0B90B'
    },
    info: {
      main: '#F0B90B'
    },
    success: {
      main: '#31B047'
    },
    background: {
      default: '#F2F5FA',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#252525',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: '#F2F5FA'
    },
    action: {
      disabledOpacity: 0.8
    },
    grey: {
      A700: '#191919',
      A400: '#252525',
      A200: '#303030',
      A100: '#A1A1A1'
    }
  },
  gradient: {
    gradient1: '#ffffff linear-gradient(154.62deg, #77C803 9.44%, #28A03E 59.25%);'
  },
  height: {
    header: '80px',
    mobileHeader: '51px',
    footer: '60px'
  },
  width: {
    sidebar: '250px',
    maxContent: '1110px'
  },
  shape: {
    border: '1px solid',
    borderRadius: 10
  },
  spacing: (factor: number) => `${1 * factor}px`
  // gray: {
  //   main: '#333333',
  //   dark: '#262626',
  // },
}

export const override: any = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: theme.palette.background.default,
        fontSize: 16,
        overflow: 'auto!important',
        paddingRight: '0px!important'
      },
      'html, input, textarea, button, body': {
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
        fontDisplay: 'fallback'
      },
      '@supports (font-variation-settings: normal)': {
        'html, input, textarea, button, body': {
          fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
          fontDisplay: 'fallback'
        }
      }
    }
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif!important'
      }
    }
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained'
    },
    styleOverrides: {
      root: {
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif!important',
        color: theme.palette.primary.contrastText,
        borderRadius: theme.shape.borderRadius,
        transition: '.3s',
        textTransform: 'none' as const,
        width: '100%',
        height: 60,
        fontSize: 16,
        fontWeight: 500
      },
      contained: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: 'unset',
        '&:hover, :active': {
          boxShadow: 'unset',
          backgroundColor: theme.palette.primary.dark
        },
        '&:disabled': {
          backgroundColor: theme.palette.primary.light,
          color: '#464647'
        }
      },
      containedSecondary: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: 'unset',
        '&:hover, :active': {
          boxShadow: 'unset',
          backgroundColor: theme.palette.secondary.dark
        },
        '&:disabled': {
          opacity: theme.palette.action.disabledOpacity,
          backgroundColor: theme.palette.secondary.light
        }
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          borderColor: theme.palette.primary.dark,
          color: theme.palette.primary.dark
        },
        '&:disabled': {
          opacity: theme.palette.action.disabledOpacity
        }
      },
      outlinedSecondary: {
        backgroundColor: 'transparent',
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          borderColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.dark
        },
        '&:disabled': {
          opacity: theme.palette.action.disabledOpacity
        }
      },
      text: {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        fontWeight: 500,
        '&:hover, :active': {
          backgroundColor: 'transparent',
          color: theme.palette.primary.dark,
          opacity: 1
        }
      },
      textPrimary: {
        color: theme.palette.primary.main,
        '&:hover, :active': {
          color: theme.palette.primary.dark
        }
      },
      textSecondary: {
        color: theme.palette.secondary.main,
        backgroundColor: 'transparent',
        '&:hover, :active': {
          backgroundColor: 'transparent',
          color: theme.palette.secondary.dark
        }
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        lineHeight: 1.2,
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif!important'
      },
      body1: {
        fontSize: 14
      },
      body2: {
        fontSize: 12
      },
      h5: {
        fontSize: 28,
        fontWeight: 500
      },
      h6: {
        fontSize: 22,
        fontWeight: 500
      },
      caption: {
        fontSize: 12
      },
      subtitle1: {},
      subtitle2: {}
    }
  }
}

export const HideOnMobile = styled('div', {
  shouldForwardProp: () => true
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'none'
  }
}))

export const ShowOnMobile = styled('div', {
  shouldForwardProp: () => true
})<{ breakpoint?: 'sm' | 'md' }>(({ theme, breakpoint }) => ({
  display: 'none',
  [theme.breakpoints.down(breakpoint ?? 'sm')]: {
    display: 'block'
  }
}))

export default createTheme({
  ...theme,
  components: {
    ...override
  }
})

export function ThemeProvider({ children, theme }: any) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
