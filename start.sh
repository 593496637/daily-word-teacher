#!/bin/bash

# 每日单词老师 Agent - 快速启动脚本
# 使用方法: bash start.sh

echo "🎯 每日单词老师 Agent - 快速启动"
echo "=================================="

# 检查 Node.js 版本
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装 Node.js"
    echo "请先安装 Node.js 18+ : https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 错误: Node.js 版本过低 (当前: v$NODE_VERSION, 需要: v18+)"
    echo "请升级 Node.js : https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node -v)"

# 检查环境变量
if [ ! -f ".env" ]; then
    echo "⚠️  警告: 未找到 .env 文件"
    echo "📝 正在创建 .env 文件..."
    
    cp .env.example .env
    
    echo ""
    echo "🔑 请编辑 .env 文件，填入你的 OpenAI API Key:"
    echo "   OPENAI_API_KEY=your_openai_api_key_here"
    echo ""
    echo "   获取 API Key: https://platform.openai.com/api-keys"
    echo ""
    
    read -p "按 Enter 继续，或 Ctrl+C 退出去配置 API Key..."
fi

# 检查依赖安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装后端依赖..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 安装前端依赖..."
    cd frontend && npm install && cd ..
fi

# 检查 OpenAI API Key
if ! grep -q "^OPENAI_API_KEY=sk-" .env 2>/dev/null; then
    echo ""
    echo "⚠️  警告: OpenAI API Key 未配置或格式不正确"
    echo "请确保在 .env 文件中设置了有效的 API Key"
    echo ""
fi

echo ""
echo "🚀 启动开发服务器..."
echo ""
echo "后端服务将在: http://localhost:4111"
echo "前端服务将在: http://localhost:3000"
echo "API 文档将在: http://localhost:4111/swagger-ui"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

# 启动服务
if command -v concurrently &> /dev/null; then
    # 如果安装了 concurrently，同时启动前后端
    npx concurrently \
        --names "Backend,Frontend" \
        --prefix-colors "blue,green" \
        "npm run dev" \
        "cd frontend && npm run dev"
else
    echo "🔧 安装 concurrently 以同时启动前后端服务..."
    npm install -g concurrently
    
    npx concurrently \
        --names "Backend,Frontend" \
        --prefix-colors "blue,green" \
        "npm run dev" \
        "cd frontend && npm run dev"
fi