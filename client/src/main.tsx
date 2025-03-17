import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './assets/styles/index.css'
import './plugins/i18n.ts'
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL

createRoot(document.getElementById('root')!).render(
    <App />
)
