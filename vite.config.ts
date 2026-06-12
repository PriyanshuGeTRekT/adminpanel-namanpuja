import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// react-admin + MUI ship a mix of ESM/CJS. We force Vite to pre-bundle the
// whole stack together (and dedupe React/MUI) so react-admin's internal
// default-imports of MUI icons resolve to real components rather than
// double-wrapped namespace objects — otherwise react-admin's own components
// throw "Element type is invalid: got object".
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: { sourcemap: false },
  resolve: {
    dedupe: ['react', 'react-dom', '@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-admin',
      'ra-core',
      'ra-ui-materialui',
      'ra-data-simple-rest',
      '@mui/material',
      '@mui/material/styles',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
    ],
    esbuildOptions: {
      // Treat the icon CJS modules with proper default-interop.
      mainFields: ['module', 'main'],
    },
  },
});
