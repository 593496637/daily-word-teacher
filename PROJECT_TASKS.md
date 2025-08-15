# 🎯 每日单词老师 Agent - 项目实施指南

## 📋 项目任务清单

### 🎯 当前项目：主应用仓库
**GitHub**: https://github.com/593496637/daily-word-teacher

---

## 🏗️ 标准Mastra项目架构

按照Mastra最佳实践，我们需要重新组织项目结构：

```
daily-word-teacher/
├── mastra-backend/              # 标准Mastra项目
│   ├── src/
│   │   ├── agents/             # Mastra Agents
│   │   ├── tools/              # 自定义工具
│   │   ├── workflows/          # 工作流
│   │   └── types/              # 类型定义
│   ├── mastra.config.ts        # Mastra配置
│   └── package.json
├── frontend/                   # React前端项目
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

---

## ✅ 任务一：重构为标准Mastra架构 (今天完成)

### 1. 创建标准Mastra后端
```bash
# 在项目根目录创建Mastra项目
npm create mastra@latest mastra-backend

# 进入Mastra项目
cd mastra-backend

# 安装依赖
npm install openai
```

### 2. 创建词典工具 (Tool)
**文件**: `mastra-backend/src/tools/dictionaryTool.ts`
- 集成Free Dictionary API
- 提供单词查询功能
- 数据验证和清理

### 3. 创建OpenAI增强工具 (Tool)  
**文件**: `mastra-backend/src/tools/openaiTool.ts`
- GPT-4内容润色
- 多种教学风格支持
- JSON响应解析

### 4. 创建单词教师Agent
**文件**: `mastra-backend/src/agents/wordTeacherAgent.ts`
- 组合词典和OpenAI工具
- 实现教学逻辑
- 错误处理和回退

### 5. 配置Mastra
**文件**: `mastra-backend/mastra.config.ts`
- 注册Agent和Tools
- 配置API端点
- 环境变量管理

---

## ✅ 任务二：前端Mastra Client集成 (明天完成)

### 1. 安装Mastra客户端SDK
```bash
cd frontend
npm install @mastra/client
```

### 2. 更新API服务
**文件**: `frontend/src/services/mastraClient.ts`
- 使用Mastra Client SDK
- 替换直接HTTP调用
- 类型安全的API调用

### 3. 组件更新
- 保持现有UI组件不变
- 更新API调用方式
- 添加更好的错误处理

---

## ✅ 任务三：部署配置 (明天完成)

### 1. 本地开发环境
```bash
# 根目录脚本
npm run dev          # 启动Mastra后端
npm run frontend:dev # 启动React前端
npm run dev:all      # 同时启动前后端
```

### 2. Cloudflare Workers部署
```bash
# Mastra项目部署
cd mastra-backend
npm run deploy

# 前端部署到Cloudflare Pages
cd frontend  
npm run build
# 上传到Cloudflare Pages
```

### 3. 环境变量配置
- `OPENAI_API_KEY`: OpenAI API密钥
- `CLOUDFLARE_API_TOKEN`: 部署令牌
- `CLOUDFLARE_ACCOUNT_ID`: 账户ID

---

## 📁 具体文件创建清单

### Mastra后端文件
- [ ] `mastra-backend/src/tools/dictionaryTool.ts`
- [ ] `mastra-backend/src/tools/openaiTool.ts`  
- [ ] `mastra-backend/src/agents/wordTeacherAgent.ts`
- [ ] `mastra-backend/src/types/word.ts`
- [ ] `mastra-backend/mastra.config.ts`
- [ ] `mastra-backend/.env.example`

### 前端更新文件
- [ ] `frontend/src/services/mastraClient.ts`
- [ ] `frontend/src/hooks/useWordTeacher.ts`
- [ ] 更新现有组件以使用新的API

### 配置文件
- [ ] `package.json` (根目录，管理monorepo)
- [ ] `docker-compose.yml` (本地开发)
- [ ] 更新GitHub Actions工作流

---

## 🚀 实施步骤

### 第1步：立即开始 (今天)
1. **创建Mastra后端项目**
   ```bash
   npm create mastra@latest mastra-backend
   ```

2. **移动现有代码到正确位置**
   - 将`src/`目录内容移动到`mastra-backend/src/`
   - 调整导入路径
   - 更新配置文件

3. **测试本地运行**
   ```bash
   cd mastra-backend && npm run dev
   cd frontend && npm run dev
   ```

### 第2步：集成测试 (明天)
1. **更新前端使用Mastra Client**
2. **端到端测试**
3. **部署到生产环境**

### 第3步：优化和增强 (后续)
1. **添加缓存机制**
2. **性能优化**
3. **用户体验改进**

---

## 🔍 验证检查清单

### 功能验证
- [ ] 单词查询正常工作
- [ ] AI内容生成正确
- [ ] 5种教学风格都能使用
- [ ] 错误处理友好
- [ ] 响应时间< 5秒

### 技术验证
- [ ] Mastra Agent正确配置
- [ ] 前端Client SDK集成
- [ ] 环境变量正确设置
- [ ] 部署流程顺畅
- [ ] CI/CD自动化工作

### 用户体验验证
- [ ] 界面响应流畅
- [ ] 移动端适配良好
- [ ] 加载状态清晰
- [ ] 错误提示有用
- [ ] 操作直观易懂

---

## 📈 后续扩展计划

### 短期增强 (1-2周)
- [ ] 用户收藏功能
- [ ] 学习历史记录
- [ ] 单词发音播放
- [ ] 分享功能

### 中期功能 (1个月)
- [ ] 用户系统
- [ ] 学习进度追踪
- [ ] 个性化推荐
- [ ] 社交功能

### 长期愿景 (3个月)
- [ ] MCP协议集成
- [ ] 多语言支持
- [ ] 移动应用
- [ ] 高级AI功能

---

## 🛠️ 开发工具和资源

### 必需工具
- Node.js 18+
- Git
- VS Code (推荐)
- Cloudflare账户

### 有用资源
- [Mastra文档](https://docs.mastra.ai)
- [OpenAI API文档](https://platform.openai.com/docs)
- [Free Dictionary API](https://dictionaryapi.dev)
- [Cloudflare Workers文档](https://developers.cloudflare.com/workers)

---

🎯 **下一步行动**: 立即开始第1步，创建标准Mastra后端项目！