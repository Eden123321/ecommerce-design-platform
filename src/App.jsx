import React, { useState } from 'react';
import { Sparkles, Play, ArrowLeft } from 'lucide-react';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import DesignPlatform from './components/design/DesignPlatform';
import Projects from './pages/Projects/Projects';
import Datasets from './pages/Datasets/Datasets';
import Templates from './pages/Templates/Templates';
import Models from './pages/Models/Models';
import LoraTraining from './pages/LoraTraining/LoraTraining';
import Button from './components/common/Button/Button';

function App() {
  const [activePage, setActivePage] = useState('home');

  // 页面标题映射
  const pageTitles = {
    home: '灵感广场',
    projects: '项目管理',
    datasets: '测评集',
    templates: '模板库',
    'design-platform': 'AI 设计',
    tools: '工具箱',
    models: '模型库',
    'lora-training': 'LoRA 训练',
    logs: '日志',
    settings: '设置',
    'data-management': '数据集管理',
  };

  // 右侧内容（根据页面动态显示）
  const getRightContent = () => {
    if (activePage === 'design-platform') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
          <Sparkles className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">今日生成: <span className="font-medium text-gray-900">12</span></span>
        </div>
      );
    }
    if (activePage === 'models') {
      return (
        <Button
          variant="primary"
          leftIcon={<Play className="w-4 h-4" />}
          onClick={() => setActivePage('lora-training')}
        >
          开始训练
        </Button>
      );
    }
    return null;
  };

  // 左侧内容（根据页面动态显示）
  const getLeftContent = () => {
    if (activePage === 'lora-training') {
      return (
        <button
          onClick={() => setActivePage('models')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          返回模型
        </button>
      );
    }
    return null;
  };

  // 获取页面标题
  const getPageTitle = () => {
    if (activePage === 'lora-training') {
      return '模型训练';
    }
    return pageTitles[activePage] || '首页';
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} />;
      case 'projects':
        return <Projects />;
      case 'datasets':
        return <Datasets />;
      case 'templates':
        return <Templates />;
      case 'design-platform':
        return <DesignPlatform />;
      case 'models':
        return <Models />;
      case 'lora-training':
        return <LoraTraining onNavigate={setActivePage} />;
      default:
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">页面开发中...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout
      activePage={activePage}
      onNavigate={setActivePage}
      title={getPageTitle()}
      leftContent={getLeftContent()}
      rightContent={getRightContent()}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
