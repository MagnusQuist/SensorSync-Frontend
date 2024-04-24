import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import AppRouter from './router/Router'
import Store from './stores/Store'

const app = createApp(App)
app.use(AppRouter)
app.use(Store)
app.mount('#app')
