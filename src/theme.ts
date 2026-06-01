import { defaultTheme } from 'react-admin';
import type { RaThemeOptions } from 'react-admin';

// Saffron / white brand theme to match namanpuja.com
export const namanTheme: RaThemeOptions = {
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: { main: '#EA580C', light: '#F97316', dark: '#C2410C', contrastText: '#fff' },
    secondary: { main: '#9A3412' },
    background: { default: '#FFFBF5', paper: '#ffffff' },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
  },
  shape: { borderRadius: 10 },
  components: {
    ...defaultTheme.components,
    MuiButton: { defaultProps: { disableElevation: true } },
    RaSidebar: { styleOverrides: { root: { backgroundColor: '#FFFBF5' } } },
  },
};
