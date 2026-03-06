# CLAUDE.md - 电商设计平台

## 项目概述

这是一个基于 React + Vite + Tailwind CSS 的电商设计平台，用于 AI 生成电商图片、海报、Banner 等设计素材。

## 技术栈

- **前端框架**: React 19 + Vite 7
- **样式**: Tailwind CSS 4
- **图标**: Lucide React
- **路由**: React Router DOM

## 项目结构

```
src/
├── App.jsx                 # 主应用组件，页面路由管理
├── main.jsx               # 入口文件
├── index.css              # 全局样式
├── components/
│   ├── common/            # 通用组件
│   │   ├── Button/       # 按钮组件
│   │   ├── Card/         # 卡片组件
│   │   ├── Badge/        # 标签组件
│   │   ├── Modal/        # 弹窗组件
│   │   ├── Input/        # 输入框组件
│   │   └── Empty/        # 空状态组件
│   ├── design/           # AI设计相关组件
│   │   └── DesignPlatform.jsx
│   └── layout/           # 布局组件
│       ├── Layout.jsx
│       ├── Header.jsx
│       └── Sidebar.jsx
└── pages/                # 页面组件
    ├── Home/              # 首页/灵感广场
    ├── Projects/          # 项目管理
    ├── Templates/         # 模板库
    ├── Models/            # 模型库
    ├── LoraTraining/      # 模型训练
    ├── BatchProduction/   # 批量任务
    └── Datasets/          # 数据集
```

## 页面路由

| 路由ID | 页面名称 | 说明 |
|--------|----------|------|
| home | 灵感广场 | 首页 |
| projects | 项目管理 | 项目列表 |
| templates | 模板库 | 模板展示 |
| design-platform | AI设计 | 单张图片生成 |
| models | 模型库 | LoRA模型 |
| lora-training | 模型训练 | 训练模型 |
| batch-production | 批量任务 | 批量生成/处理 |
| logs | 日志 | 系统日志 |
| settings | 设置 | 系统设置 |

## 开发规范

### 组件开发

1. **通用组件**放在 `src/components/common/` 目录下，每个组件一个文件夹
2. **页面组件**放在 `src/pages/` 目录下
3. 使用 Tailwind CSS 进行样式开发
4. 使用 Lucide React 图标库

### 状态管理

- 页面级别的状态使用 React `useState`
- 跨页面共享的状态在 `App.jsx` 中管理，通过 props 传递

### 常用命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint
```

### 注意事项

1. 修改颜色时使用深色/高端质感色调，避免过浅的颜色
2. 页面布局使用 Card 组件包裹
3. Tab 切换使用按钮样式，与模型库页面保持一致
4. 图片网格使用 `grid-cols-4` 布局

### 提交规范

**每次 commit 前**：
1. 检查本次改动是否涉及新增页面、组件、路由等项目结构变化
2. 如有变化，先更新 CLAUDE.md
3. 代码和文档一起提交
