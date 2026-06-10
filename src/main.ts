import ui from '@nuxt/ui/vue-plugin';
import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/index.css';
import router from '@/router';
import { pinia } from './store/index.ts';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ui);

app.mount('#app');
