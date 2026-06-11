import ui from '@nuxt/ui/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import MotionResolver from 'motion-v/resolver';
// import fs from 'fs';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    ui({
      components: {
        dts: true,
        resolvers: [MotionResolver()],
      },
      ui: {
        colors: {
          neutral: 'neutral',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // server: {
  //   host: 'dashboard.croffledev.kr',
  //   port: 5173,
  //   https: {
  //     key: fs.readFileSync('./dashboard.croffledev.kr-key.pem'),
  //     cert: fs.readFileSync('./dashboard.croffledev.kr.pem'),
  //   },
  // },
});
