import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
const env = loadEnv('', "../.env", '')
export default defineConfig({
  plugins: [react()],
})
