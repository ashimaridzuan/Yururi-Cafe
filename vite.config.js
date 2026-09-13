import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import'],
        additionalData: `@import "@/styles/abstracts/variables"; @import "@/styles/abstracts/mixins"; @import "@/styles/abstracts/functions"; @import "@/styles/abstracts/placeholders";`,
      },
    },
  },
});
