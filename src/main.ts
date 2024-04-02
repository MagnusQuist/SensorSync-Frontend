import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AppRouter from './router/Router'

const app = createApp(App)
app.use(AppRouter)
app.mount('#app')
