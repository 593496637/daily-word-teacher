#!/bin/bash

# 🎯 每日单词老师 Agent - 快速重构脚本
# 将当前项目重构为标准Mastra架构

echo "🚀 开始重构为标准Mastra项目架构..."
echo "========================================"

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装 Node.js"
    echo "请先安装 Node.js 18+: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 错误: Node.js 版本过低 (当前: $(node -v), 需要: v18+)"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node -v)"

# 1. 创建标准Mastra后端项目
echo ""
echo "📦 步骤1: 创建Mastra后端项目..."
if [ ! -d "mastra-backend" ]; then
    npm create mastra@latest mastra-backend --template=typescript
    echo "✅ Mastra后端项目创建完成"
else
    echo "⚠️  mastra-backend 目录已存在，跳过创建"
fi

# 2. 安装Mastra后端依赖
echo ""
echo "📦 步骤2: 安装Mastra后端依赖..."
cd mastra-backend
npm install openai
cd ..
echo "✅ Mastra后端依赖安装完成"

# 3. 移动现有代码到Mastra项目
echo ""
echo "📁 步骤3: 重组项目结构..."

# 备份现有src目录
if [ -d "src" ]; then
    echo "📋 备份现有src目录..."
    cp -r src src_backup
    
    # 移动到Mastra项目
    echo "📂 移动代码到Mastra项目..."
    cp -r src/* mastra-backend/src/ 2>/dev/null || true
    
    # 移动mastra.config.ts
    if [ -f "mastra.config.ts" ]; then
        cp mastra.config.ts mastra-backend/
    fi
    
    echo "✅ 代码移动完成"
fi

# 4. 更新根目录package.json
echo ""
echo "⚙️  步骤4: 更新根目录配置..."

cat > package.json << 'EOF'
{
  "name": "daily-word-teacher",
  "version": "1.0.0",
  "description": "Daily Word Teacher Agent using Mastra + OpenAI + React",
  "type": "module",
  "scripts": {
    "dev": "cd mastra-backend && npm run dev",
    "frontend:dev": "cd frontend && npm run dev",
    "dev:all": "concurrently \"npm run dev\" \"npm run frontend:dev\"",
    "build": "cd mastra-backend && npm run build",
    "frontend:build": "cd frontend && npm run build",
    "build:all": "npm run build && npm run frontend:build",
    "deploy": "cd mastra-backend && npm run deploy",
    "setup": "cd mastra-backend && npm install && cd ../frontend && npm install",
    "clean": "rm -rf mastra-backend/node_modules frontend/node_modules",
    "type-check": "cd mastra-backend && npm run type-check && cd ../frontend && npm run type-check"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  },
  "keywords": [
    "ai",
    "education",
    "english",
    "vocabulary",
    "mastra",
    "openai",
    "react"
  ],
  "author": "593496637",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

echo "✅ 根目录package.json更新完成"

# 5. 创建环境变量文件
echo ""
echo "🔐 步骤5: 创建环境变量文件..."

cat > mastra-backend/.env.example << 'EOF'
# OpenAI API Key - 必需
OPENAI_API_KEY=your_openai_api_key_here

# Cloudflare Workers 部署配置（可选）
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token

# 开发环境配置
NODE_ENV=development
PORT=4111
EOF

# 复制到实际环境文件
if [ ! -f "mastra-backend/.env" ]; then
    cp mastra-backend/.env.example mastra-backend/.env
    echo "📝 请编辑 mastra-backend/.env 文件，填入你的 OpenAI API Key"
fi

echo "✅ 环境变量文件创建完成"

# 6. 安装根目录依赖
echo ""
echo "📦 步骤6: 安装根目录依赖..."
npm install

# 7. 安装前端依赖（如果还没有）
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 安装前端依赖..."
    cd frontend && npm install && cd ..
fi

echo "✅ 所有依赖安装完成"

# 8. 显示下一步操作
echo ""
echo "🎉 项目重构完成！"
echo ""
echo "📁 新的项目结构:"
echo "  daily-word-teacher/"
echo "  ├── mastra-backend/         # Mastra AI后端"
echo "  ├── frontend/               # React前端"
echo "  ├── src_backup/             # 原始代码备份"
echo "  └── README.md"
echo ""
echo "🚀 接下来的操作:"
echo "  1. 编辑环境变量: nano mastra-backend/.env"
echo "  2. 启动开发服务器: npm run dev:all"
echo "  3. 访问应用:"
echo "     - 前端: http://localhost:3000"
echo "     - 后端: http://localhost:4111"
echo ""
echo "📚 更多信息请查看: PROJECT_TASKS.md"
echo ""

# 9. 询问是否立即启动
read -p "🤔 是否现在启动开发服务器? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 启动开发服务器..."
    npm run dev:all
fi