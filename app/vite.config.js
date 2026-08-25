import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/nuglass/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NuGlass — 3D Neutrino Oscillations',
        short_name: 'NuGlass',
        description: 'A fast and interactive 3D visualization of neutrino oscillations, running entirely in your browser.',
        start_url: '/nuglass/',
        scope: '/nuglass/',
        display: 'standalone',
        orientation: 'any',
        background_color: '#0e1116',
        theme_color: '#0e1116',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        globIgnores: ['og.png'],
      },
    }),
  ],
});
