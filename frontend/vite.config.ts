// frontend/vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 开发服务器配置
  server: {
    port: 3000,
    host: '0.0.0.0',
    // 代理到后端 API
    proxy: {
      '/api': {
        target: 'http://localhost:4111',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  },
  
  // 环境变量配置
  define: {
    // 确保在客户端代码中可以访问环境变量
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  
  // 优化配置
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})