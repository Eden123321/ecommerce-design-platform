import React, { useState } from 'react';
import { Sparkles, Play, ArrowLeft, Layers, Plus } from 'lucide-react';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import DesignPlatform from './components/design/DesignPlatform';
import Projects from './pages/Projects/Projects';
import Templates from './pages/Templates/Templates';
import Models from './pages/Models/Models';
import LoraTraining from './pages/LoraTraining/LoraTraining';
import BatchProduction from './pages/BatchProduction/BatchProduction';
import Datasets from './pages/Datasets/Datasets';
import Button from './components/common/Button/Button';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [showBatchModal, setShowBatchModal] = useState(false);

  // 设计参数状态 - 提升到 App 级别
  const [designParams, setDesignParams] = useState({
    industry: null,
    style: null,
    ratio: '1:1',
    baseModel: null,
    template: null,
  });

  // 批量任务列表
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: '电商主图批量生成',
      status: 'completed',
      progress: 100,
      imageCount: 20,
      createdAt: '2024-01-20 14:30',
      cover: '/images/ecommerce/c0d3059e7b17365dc32c50a031d62e3f.jpg',
    },
    {
      id: 2,
      name: '新品海报批量生成',
      status: 'processing',
      progress: 65,
      imageCount: 10,
      createdAt: '2024-01-20 10:15',
      cover: '/images/ecommerce/cce4010d4fc5718774e5a0a2b1c5722c.jpg',
    },
  ]);

  // 添加新任务
  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'processing',
      progress: 0,
      createdAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };
    setTasks([newTask, ...tasks]);
    setShowBatchModal(false);
  };

  // 页面标题映射
  const pageTitles = {
    home: '灵感广场',
    projects: '项目管理',
    templates: '模板库',
    'design-platform': 'AI 设计',
    models: '模型库',
    'lora-training': '模型训练',
    'batch-production': '批量任务',
    datasets: '测评集',
    logs: '日志',
    settings: '设置',
  };

  // 右侧内容（根据页面动态显示）
  const getRightContent = () => {
    if (activePage === 'design-platform') {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <Sparkles className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">今日生成: <span className="font-medium text-gray-900">12</span></span>
          </div>
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
    return pageTitles[activePage] || '首页';
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} />;
      case 'projects':
        return <Projects />;
      case 'templates':
        return <Templates />;
      case 'design-platform':
        return <DesignPlatform designParams={designParams} setDesignParams={setDesignParams} onOpenBatchModal={() => setShowBatchModal(true)} />;
      case 'models':
        return <Models />;
      case 'lora-training':
        return <LoraTraining onNavigate={setActivePage} />;
      case 'batch-production':
        return <BatchProduction onNavigate={setActivePage} tasks={tasks} />;
      case 'datasets':
        return <Datasets />;
      case 'logs':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">日志功能开发中...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">设置功能开发中...</p>
            </div>
          </div>
        );
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
      {/* 批量任务弹窗 */}
      {showBatchModal && (
        <BatchProduction.Modal
          isOpen={showBatchModal}
          onClose={() => setShowBatchModal(false)}
          designParams={designParams}
          onCreateTask={handleCreateTask}
        />
      )}
    </Layout>
  );
}

export default App;
