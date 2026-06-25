// Vite build/dev-server configuration.
// The React plugin enables JSX transform and Fast Refresh (hot reloading) in dev.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
