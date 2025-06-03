import { createTheme, alpha } from '@mui/material/styles';
import type { ThemeOptions, Theme } from '@mui/material/styles';

// UdeA Color Palette with enhanced variants
const colors = {
  primary: {
    main: '#026937', // Verde institucional
    light: '#35944b',
    dark: '#014925',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#ef434d', // Rojo complementario
    light: '#ff7a7e',
    dark: '#c4000a',
    contrastText: '#ffffff',
  },
  neutral: {
    main: '#137598', // Azul complementario
    light: '#4ba3c7',
    dark: '#0a4a6b',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
  },
  info: {
    main: '#137598',
    light: '#4ba3c7',
    dark: '#0a4a6b',
  },
} as const;

// Typography configuration
const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.2,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.2,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.2,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.2,
  },
  subtitle1: {
    fontSize: '1rem',
    lineHeight: 1.5,
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
} as const;

// Custom shadows
const shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
  '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
  '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
  '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
  'none', 'none', 'none', 'none', 'none',
  'none', 'none', 'none', 'none', 'none',
  'none', 'none', 'none', 'none', 'none',
  'none', 'none', 'none', 'none', 'none'
];

// Component overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '8px 24px',
        '&:hover': {
          transform: 'translateY(-1px)',
          transition: 'transform 0.2s',
        },
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
        },
      },
      outlined: {
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2e2e2e',
          '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        borderRadius: 12,
        boxShadow: theme.palette.mode === 'light'
          ? '0px 2px 4px rgba(0,0,0,0.1)'
          : '0px 2px 4px rgba(0,0,0,0.3)',
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
      elevation1: ({ theme }: { theme: Theme }) => ({
        boxShadow: theme.palette.mode === 'light'
          ? '0px 2px 4px rgba(0,0,0,0.1)'
          : '0px 2px 4px rgba(0,0,0,0.3)',
      }),
      elevation2: ({ theme }: { theme: Theme }) => ({
        boxShadow: theme.palette.mode === 'light'
          ? '0px 4px 8px rgba(0,0,0,0.1)'
          : '0px 4px 8px rgba(0,0,0,0.3)',
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
} as const;

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      info: {
        main: colors.neutral.main,
        light: colors.neutral.light,
        dark: colors.neutral.dark,
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      },
      success: colors.success,
      error: colors.error,
      warning: colors.warning,
      grey: colors.grey,
    },
    typography,
    shape: {
      borderRadius: 8,
    },
    components,
  } as ThemeOptions) as Theme;
};