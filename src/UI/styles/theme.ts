import {Theme} from '@mui/material'
import {CSSProperties} from 'react'
import {createTheme} from '@mui/material/styles'
import {STYLES_POLICY} from '../../READONLY-shared-kernel/policies/styles.policy'


const headingGenericStyle: CSSProperties = {
  color: STYLES_POLICY.accentColor[0],
  fontWeight: 'bold'
}

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: STYLES_POLICY.accentColor[0]
    },
    success: {
      main: STYLES_POLICY.statusColors[0]
    },
    error: {
      main: STYLES_POLICY.statusColors[1]
    },
    warning: {
      main: STYLES_POLICY.statusColors[2]
    },
    background: {
      default: STYLES_POLICY.backgroundColor[0],
      paper: STYLES_POLICY.backgroundColor[1]
    }
  },
  typography: {
    h1: {
      ...headingGenericStyle,
      fontSize: STYLES_POLICY.fontSize[4],
      marginTop: STYLES_POLICY.spacing[2],
      marginBottom: STYLES_POLICY.spacing[3],
    },
    h2: {
      ...headingGenericStyle,
      fontSize: STYLES_POLICY.fontSize[3]
    },
    h3: {
      ...headingGenericStyle,
      fontSize: STYLES_POLICY.fontSize[2],
      marginBottom: STYLES_POLICY.spacing[2],
      marginTop: STYLES_POLICY.spacing[1]
    },
    body1: {
      fontSize: STYLES_POLICY.fontSize[1]
    },
    body2: {
      fontSize: STYLES_POLICY.fontSize[0]
    },
    caption: {
      lineHeight: '1.25',
      paddingTop: STYLES_POLICY.spacing[0],
      paddingBottom: STYLES_POLICY.spacing[0],
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    subtitle2: {
      fontSize: STYLES_POLICY.fontSize[1]
    }
  },
  components: {
    MuiContainer: {
      defaultProps: {
        component: 'section',
        maxWidth: 'sm'
      },
      styleOverrides: {
        root: {
          height: '100%'
        }
      }
    },
    MuiStack: {
      defaultProps: {
        component: 'section'
      }
    },
    MuiDivider: {
      defaultProps: {
        color: STYLES_POLICY.contourColor[0]
      },
      styleOverrides: {
        root: {
          margin: STYLES_POLICY.spacing[2]
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: STYLES_POLICY.borderRadius[2],
          margin: STYLES_POLICY.spacing[1],
          minHeight: '30px',
          minWidth: '80px',
          lineHeight: 'normal'
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          padding: STYLES_POLICY.spacing[2],
          maxWidth: 'fit-content',
          borderRadius: 0,
          borderColor: STYLES_POLICY.contourColor[0]
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          letterSpacing: '-0.4px'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '::before': {
            borderColor: STYLES_POLICY.accentColor[0]
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          'fieldset': {
            borderWidth: '2px'
          }
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard'
      },
      styleOverrides: {
        root: {
          minWidth: '210px',
          width: '100%',
          margin: `${STYLES_POLICY.spacing[2]} auto`,
          'input': {
            fontSize: STYLES_POLICY.fontSize[1],
          },
          'fieldset': {
            borderColor: STYLES_POLICY.accentColor[0]
          }
        },
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          minWidth: '100%',
          minHeight: '50px',
          transform: 'translateY(-10px)'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: '59px',
          margin: `${STYLES_POLICY.spacing[2]} 0`
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          bottom: STYLES_POLICY.spacing[1],
          left: 0
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px'
        },
        sizeMedium: {
          fontSize: STYLES_POLICY.fontSize[1]
        },
        sizeSmall: {
          opacity: 0.9
        }
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'primary',
        fontSize: 'large'
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          ':hover': {
            background: 'none'
          }
        },
      }
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'top'
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          minWidth: '100%',
          bottom: STYLES_POLICY.appBarDimension
        }
      }
    },
    MuiStepLabel: {
      styleOverrides: {
        iconContainer: {
          minHeight: '34px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    }
  }
})
