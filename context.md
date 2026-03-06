# 电商设计平台

## 当前状态
- 版本: 1.0.0
- 最近更新: 2026-03-06
- 工作阶段: 修复批量任务动画问题，完善侧边栏用户菜单，替换个人中心和模型训练页面图片

## 快速链接
- 完整上下文: c:\claude-test\ecommerce-design-platform\src\App.jsx
- 个人中心页面: c:\claude-test\ecommerce-design-platform\src\pages\Profile\Profile.jsx
- AI设计页面: c:\claude-test\ecommerce-design-platform\src\components\design\DesignPlatform.jsx

## 最近完成
- 修复批量任务预览图快速跳动的问题
- 侧边栏底部添加用户头像+名字，点击弹出下拉菜单（帮助中心/语言切换/退出登录）
- 个人中心页面图片替换为补充图片文件夹的图片
- 模型训练页面图片替换为LoRA封面图片
- 添加 CLAUDE.md 和 context.md 项目文档

## 核心模块
- src/App.jsx: 主应用入口，页面路由管理
- src/components/layout/Sidebar.jsx: 侧边栏导航（常用/AI设计/工具/个人中心）
- src/components/design/DesignPlatform.jsx: AI设计核心页面（行业/风格/模板/模型/LoRA选择）
- src/pages/Profile/Profile.jsx: 个人中心页面（作品/模板/模型管理）
- src/pages/Models/Models.jsx: 模型库页面（LoRA模型库/我的训练）
- src/pages/BatchProduction/BatchProduction.jsx: 批量任务页面（任务列表/任务详情/图片管理）
- src/pages/Projects/Projects.jsx: 项目管理页面
- src/pages/Templates/Templates.jsx: 模板库页面

## 技术栈
- 前端: React + Vite + Tailwind CSS
- UI组件: lucide-react 图标库
- 状态管理: React useState/useEffect
- 构建工具: Vite
