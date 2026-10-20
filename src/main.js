import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/tokens.css';
import './assets/base.css';

createApp(App).use(createPinia()).mount('#app');
