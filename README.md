# MindEscape（情绪逃离舱）

> 说出你的感受，AI 帮你逃离。

面向高压人群的零决策微度假规划手机应用。用户用一句话描述情绪状态，AI 在 30 秒内输出一份包含目的地的个性化「情绪处方」行程。

## 📱 产品截图

<!-- 首页截图 -->
<!-- ![首页](./assets/screenshots/home.png) -->

<!-- 方案页截图 -->
<!-- ![方案页](./assets/screenshots/plan.png) -->

<!-- 探索页截图 -->
<!-- ![探索页](./assets/screenshots/explore.png) -->

## ✨ 核心功能

- 🎯 **情绪输入**：一句话描述感受，30 秒生成专属逃离计划
- ⭐ **情绪价值标注**：隐蔽性、单人友好度、自然指数、白噪音星级评分
- 🌊 **灵感瀑布流**：分类浏览目的地，发现适合自己的逃离方式

## 🛠️ 技术栈

[![Vite](https://img.shields.io/badge/Vite-6.x-yellow)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-purple)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React%20Router-v6-orange)](https://reactrouter.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-pink)](https://www.framer.com/motion/)
[![Lucide React](https://img.shields.io/badge/Lucide%20React-green)](https://lucide.dev/)

- **构建工具**：Vite 8
- **前端框架**：React 18
- **类型系统**：TypeScript 5
- **样式方案**：Tailwind CSS 3
- **路由管理**：React Router v6（HashRouter）
- **动画库**：Framer Motion
- **图标库**：Lucide React
- **包管理器**：pnpm

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:5173/

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   ├── ui/             # 基础 UI 组件（Button, Card, Tag, Slider 等）
│   └── layout/         # 布局组件（TabBar）
├── pages/              # 页面组件
│   ├── Home/           # 情绪输入页
│   ├── Plan/           # 方案页
│   ├── Explore/        # 探索页（瀑布流）
│   ├── History/        # 历史记录页
│   └── Profile/        # 我的页
├── data/               # Mock 数据
├── types/              # TypeScript 类型定义
├── styles/             # 全局样式
├── App.tsx             # 路由配置
└── main.tsx            # 入口文件
```

## 🚢 部署

### 手动部署

```bash
pnpm deploy
```

### 自动部署

项目已配置 GitHub Actions，push 到 `main` 分支时自动构建部署到 GitHub Pages。

部署后访问：`https://clanzhang.github.io/MindEscape/`

## ⚠️ MVP 说明

当前为 MVP 阶段，所有数据为本地 Mock，不包含以下功能：

- 真实 AI 服务
- 后端 API
- 地图导航
- 支付预订
- 语音输入
- 登录注册
