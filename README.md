# 🎯 每日单词老师 Agent

> 基于 Mastra + OpenAI + 外部API 的智能英语单词教学助手

一个现代化的 AI 驱动英语学习应用，支持多种教学风格和个性化学习体验。通过集成词典 API 和 OpenAI GPT-4，为每个单词生成生动有趣的教学内容。

![技术栈](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![技术栈](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript)
![技术栈](https://img.shields.io/badge/Mastra-Latest-FF6B6B?style=flat-square)
![技术栈](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai)
![部署](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare)

## ✨ 功能特性

- 🤖 **AI 驱动教学**: 使用 OpenAI GPT-4 生成个性化学习内容
- 🎭 **多种教学风格**: 幽默、严谨、故事、对话、学术等5种风格
- 📚 **权威词典数据**: 集成 Free Dictionary API 获取准确词汇信息
- 🎯 **个性化学习**: 支持初级、中级、高级3个学习层次
- 📱 **响应式设计**: 适配桌面和移动设备
- ⚡ **极速部署**: 支持 Cloudflare Workers 无服务器部署
- 🔊 **语音功能**: 内置单词发音播放
- 🎨 **现代 UI**: 精美的玻璃拟态设计风格

## 🏗️ 技术架构

```
用户输入 → React前端 → Mastra HTTP API → Mastra Agent → 
Dictionary API + OpenAI → 生动教学内容 → 用户
```

### 核心技术栈

**前端**:
- React 18 + TypeScript
- Vite (构建工具)
- 现代 CSS (玻璃拟态效果)

**后端**:
- Mastra (AI Agent 框架)
- OpenAI GPT-4 API
- Free Dictionary API
- TypeScript

**部署**:
- Cloudflare Workers (后端)
- Cloudflare Pages / Vercel (前端)

## 🚀 快速开始

### 前置要求

- Node.js 18+
- OpenAI API Key
- Git

### 一键启动

```bash
# 克隆项目
git clone https://github.com/593496637/daily-word-teacher.git
cd daily-word-teacher

# 快速启动 (自动安装依赖和配置)
bash start.sh
```

### 手动安装

```bash
# 1. 安装后端依赖
npm install

# 2. 安装前端依赖  
cd frontend && npm install && cd ..

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入 OpenAI API Key

# 4. 启动开发服务器
npm run dev:all
```

### 访问地址

- 🎨 **前端应用**: http://localhost:3000
- 🔌 **后端 API**: http://localhost:4111  
- 📖 **API 文档**: http://localhost:4111/swagger-ui

## 🎮 使用方法

1. **输入单词**: 在输入框中输入任何英文单词
2. **选择风格**: 选择你喜欢的教学风格（幽默、严谨等）
3. **设置级别**: 根据英语水平选择学习级别
4. **开始学习**: 点击"开始学习"获得AI生成的教学内容
5. **互动体验**: 浏览发音、含义、用法、趣味知识等内容

### 教学风格说明

| 风格 | 描述 | 适合人群 |
|------|------|----------|
| 🗣️ 对话式 | 轻松聊天的方式 | 日常学习者 |
| 😄 幽默式 | 风趣有趣的教学 | 喜欢轻松学习 |
| 📖 故事式 | 通过故事学习 | 想象力丰富 |
| 🎓 严谨式 | 专业权威的解释 | 学术研究者 |
| 🔬 学术式 | 深度学术分析 | 高级学习者 |

## 🔧 API 接口

### 核心接口

**POST /api/word-teacher**

```typescript
// 请求
{
  "word": "serendipity",
  "style": "humorous",
  "level": "intermediate"
}

// 响应
{
  "word": "serendipity",
  "style": "humorous",
  "enhancedContent": {
    "introduction": "AI生成的单词介绍",
    "pronunciation": {
      "guide": "发音指导",
      "tips": "发音技巧"
    },
    "meanings": [...],
    "usage": {...},
    "funFacts": [...],
    "summary": "学习总结"
  },
  "success": true,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

详细 API 文档请访问: http://localhost:4111/swagger-ui

## 📦 项目结构

```
daily-word-teacher/
├── src/
│   ├── agents/             # Mastra Agent 核心逻辑
│   │   └── wordTeacherAgent.ts
│   ├── services/           # 外部服务集成
│   │   ├── dictionaryService.ts  # 词典API
│   │   └── openaiService.ts      # OpenAI API
│   └── types/              # TypeScript 类型定义
│       └── word.ts
├── frontend/               # React 前端
│   ├── src/
│   │   ├── components/     # React 组件
│   │   │   ├── WordInput.tsx   # 单词输入组件
│   │   │   └── WordDisplay.tsx # 单词展示组件
│   │   ├── services/       # API 服务
│   │   │   └── api.ts
│   │   ├── App.tsx        # 主应用
│   │   └── App.css        # 样式文件
│   └── vite.config.ts     # Vite 配置
├── mastra.config.ts       # Mastra 配置
└── package.json
```

## 🚀 部署指南

### 部署到 Cloudflare Workers

```bash
# 1. 构建后端
npm run build

# 2. 部署到 Cloudflare Workers
npm run deploy

# 3. 配置环境变量
wrangler secret put OPENAI_API_KEY
```

### 部署前端

```bash
# 1. 构建前端
cd frontend
npm run build

# 2. 部署到 Cloudflare Pages
# 或其他静态托管服务 (Vercel, Netlify)
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Mastra](https://www.mastra.ai) - 强大的 AI Agent 框架
- [OpenAI](https://openai.com) - GPT-4 API 支持
- [Free Dictionary API](https://dictionaryapi.dev) - 免费词典数据源
- [Cloudflare](https://cloudflare.com) - 无服务器部署平台

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
