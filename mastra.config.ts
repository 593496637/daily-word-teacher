// mastra.config.ts

import { defineConfig } from '@mastra/core';
import { teachWord } from './src/agents/wordTeacherAgent';

export default defineConfig({
  name: 'daily-word-teacher',
  
  // 环境变量配置
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  },
  
  // HTTP API 路由配置
  apis: [
    {
      path: '/api/word-teacher',
      method: 'POST',
      handler: async (request) => {
        try {
          const body = await request.json();
          
          // 验证请求体
          if (!body.word) {
            return new Response(
              JSON.stringify({ 
                success: false, 
                error: 'Missing required field: word' 
              }), 
              { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
              }
            );
          }
          
          const result = await teachWord({
            word: body.word,
            style: body.style || 'conversational',
            level: body.level || 'intermediate'
          });
          
          const status = result.success ? 200 : 500;
          
          return new Response(
            JSON.stringify(result), 
            { 
              status, 
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
              } 
            }
          );
        } catch (error) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: `Server error: ${error instanceof Error ? error.message : String(error)}` 
            }), 
            { 
              status: 500, 
              headers: { 'Content-Type': 'application/json' } 
            }
          );
        }
      }
    },
    
    // 健康检查端点
    {
      path: '/api/health',
      method: 'GET',
      handler: async () => {
        return new Response(
          JSON.stringify({ 
            status: 'healthy', 
            service: 'daily-word-teacher',
            timestamp: new Date().toISOString()
          }), 
          { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
    },
    
    // CORS 预检请求
    {
      path: '/api/word-teacher',
      method: 'OPTIONS',
      handler: async () => {
        return new Response(null, {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400'
          }
        });
      }
    }
  ],
  
  // 开发服务器配置
  server: {
    port: 4111,
    host: '0.0.0.0'
  },
  
  // 部署配置（Cloudflare Workers）
  deploy: {
    cloudflare: {
      // 这些配置会在部署时使用
      compatibility_date: '2024-01-01',
      compatibility_flags: ['nodejs_compat'],
      vars: {
        // 环境变量会在部署时自动处理
      }
    }
  }
});