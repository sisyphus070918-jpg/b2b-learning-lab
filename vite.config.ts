import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  // Relative asset paths keep the same build usable on Cloudflare Pages and
  // under GitHub Pages' repository subdirectory.
  base: './',
  plugins: [react()],
});
