# 🎯 每日单词老师 Agent

> 基于 Mastra + OpenAI + React 的智能英语单词教学助手

一个现代化的 AI 驱动英语学习应用，支持多种教学风格和个性化学习体验。通过集成词典 API 和 OpenAI GPT-4，为每个单词生成生动有趣的教学内容。

![技术栈](https://img.shields.io/badge/Mastra-Latest-FF6B6B?style=flat-square)
![技术栈](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![技术栈](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript)
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
React前端 → Mastra Client SDK → Mastra Agent → Dictionary API + OpenAI → 教学内容
```

### 核心技术栈

**后端**:
- Mastra AI Agent 框架
- OpenAI GPT-4 API
- Free Dictionary API
- TypeScript

**前端**:
- React 18 + TypeScript
- Mastra Client SDK
- Vite (构建工具)
- 现代 CSS (玻璃拟态效果)

**部署**:
- Cloudflare Workers (后端)
- Cloudflare Pages / Vercel (前端)

## 🚀 快速开始

### 方式一：一键重构（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/593496637/daily-word-teacher.git
cd daily-word-teacher

# 2. 运行重构脚本
chmod +x refactor-to-mastra.sh
./refactor-to-mastra.sh

# 3. 配置OpenAI API Key
nano mastra-backend/.env
# 填入: OPENAI_API_KEY=your_openai_api_key_here

# 4. 启动开发服务器
npm run dev:all
```

### 方式二：手动设置

```bash
# 1. 克隆项目
git clone https://github.com/593496637/daily-word-teacher.git
cd daily-word-teacher

# 2. 创建Mastra后端
npm create mastra@latest mastra-backend
cd mastra-backend && npm install openai && cd ..

# 3. 安装依赖
npm install
cd frontend && npm install && cd ..

# 4. 配置环境变量
cp mastra-backend/.env.example mastra-backend/.env
# 编辑.env文件填入API密钥

# 5. 启动服务
npm run dev:all
```

### 访问地址

- 🎨 **前端应用**: http://localhost:3000
- 🔌 **Mastra后端**: http://localhost:4111  
- 📖 **API 文档**: http://localhost:4111/docs

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

## 📦 项目结构

```
daily-word-teacher/
├── mastra-backend/             # Mastra AI后端
│   ├── src/
│   │   ├── agents/            # AI Agents
│   │   ├── tools/             # 工具集成
│   │   ├── workflows/         # 工作流
│   │   └── types/             # 类型定义
│   ├── mastra.config.ts       # Mastra配置
│   └── package.json
├── frontend/                  # React前端
│   ├── src/
│   │   ├── components/        # React组件
│   │   ├── services/          # API服务
│   │   └── App.tsx           # 主应用
│   └── package.json
├── PROJECT_TASKS.md           # 项目任务指南
├── refactor-to-mastra.sh      # 快速重构脚本
└── README.md
```

## 🛠️ 开发脚本

```bash
# 开发
npm run dev              # 启动Mastra后端
npm run frontend:dev     # 启动React前端  
npm run dev:all          # 同时启动前后端

# 构建
npm run build            # 构建Mastra后端
npm run frontend:build   # 构建React前端
npm run build:all        # 构建整个项目

# 部署
npm run deploy           # 部署Mastra到Cloudflare Workers

# 工具
npm run setup            # 安装所有依赖
npm run clean            # 清理node_modules
npm run type-check       # TypeScript类型检查
```

## 🚀 部署指南

### 部署到 Cloudflare Workers

```bash
# 1. 配置Cloudflare凭据
export CLOUDFLARE_API_TOKEN=your_api_token
export CLOUDFLARE_ACCOUNT_ID=your_account_id

# 2. 部署后端
cd mastra-backend
npm run deploy

# 3. 配置生产环境变量
wrangler secret put OPENAI_API_KEY
```

### 部署前端

```bash
# 1. 构建前端
cd frontend
npm run build

# 2. 部署到Cloudflare Pages
# 上传dist目录到Cloudflare Pages
# 或使用其他静态托管服务
```

## 🔧 环境变量配置

### Mastra后端 (.env)
```bash
# 必需
OPENAI_API_KEY=your_openai_api_key_here

# 部署相关（可选）
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# 开发配置
NODE_ENV=development
PORT=4111
```

### 前端 (.env)
```bash
# API基础URL
VITE_API_BASE_URL=http://localhost:4111

# 应用配置
VITE_APP_TITLE=每日单词老师
```

## 📋 开发任务

当前实现状态和后续计划请查看 [PROJECT_TASKS.md](./PROJECT_TASKS.md)

### 立即可用功能 ✅
- [x] 单词查询和AI内容生成
- [x] 5种教学风格支持
- [x] 响应式现代UI
- [x] 错误处理和加载状态
- [x] 语音发音功能

### 计划中功能 📋
- [ ] 用户系统和收藏功能
- [ ] 学习历史和进度追踪
- [ ] 社交分享和讨论
- [ ] MCP协议集成
- [ ] 移动应用开发

## 🔍 故障排除

### 常见问题

**Q: OpenAI API 调用失败**
- 检查 API Key 是否正确设置在 `mastra-backend/.env`
- 确认账户余额充足
- 检查网络连接

**Q: 前端无法连接后端**
- 确认Mastra后端正在运行 (http://localhost:4111)
- 检查代理配置和CORS设置

**Q: 部署失败**
- 确认Cloudflare凭据正确
- 检查环境变量是否正确设置

### 获取帮助

- 📖 查看 [PROJECT_TASKS.md](./PROJECT_TASKS.md) 详细指南
- 🐛 提交 [Issue](../../issues)
- 💬 参与 [讨论](../../discussions)

## 🤝 贡献指南

欢迎贡献代码！请遵循以下流程：

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

📧 联系我们: [593496637@qq.com](mailto:593496637@qq.com)