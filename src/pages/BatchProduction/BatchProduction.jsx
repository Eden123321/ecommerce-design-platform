import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Upload,
  Image,
  Download,
  Trash2,
  RotateCcw,
  Check,
  X,
  Layers,
  Clock,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

// 模拟任务数据
const mockTasks = [
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
];

// 行业选项
const industries = [
  { id: 'ecommerce', label: '电商' },
  { id: 'beauty', label: '美妆' },
  { id: 'fashion', label: '服装' },
  { id: 'food', label: '食品' },
  { id: 'digital', label: '数码' },
  { id: 'home', label: '家居' },
];

// 风格选项
const styleOptions = [
  { id: 'flat', label: '扁平风格' },
  { id: 'minimal', label: '极简风格' },
  { id: 'modern', label: '现代风格' },
  { id: 'retro', label: '复古风格' },
  { id: 'luxury', label: '轻奢风格' },
  { id: 'playful', label: '活泼风格' },
];

// 图片比例选项
const aspectRatioOptions = [
  { id: '1:1', label: '1:1' },
  { id: '16:9', label: '16:9' },
  { id: '9:16', label: '9:16' },
  { id: '4:3', label: '4:3' },
];

// 模拟已生成的图片数据
const mockGeneratedImages = [
  { id: 1, image: '/images/ecommerce/c0d3059e7b17365dc32c50a031d62e3f.jpg', time: '10分钟前' },
  { id: 2, image: '/images/ecommerce/cce4010d4fc5718774e5a0a2b1c5722c.jpg', time: '15分钟前' },
  { id: 3, image: '/images/ecommerce/5e4fdfb5022fdff2a6e9dd57ca499d3c.jpg', time: '20分钟前' },
  { id: 4, image: '/images/ecommerce/5edac3fd0c18f0a51280b1dffc9d1f68.jpg', time: '30分钟前' },
  { id: 5, image: '/images/ecommerce/aaa073a507498a4756144d943e0e00eb.jpg', time: '1小时前' },
  { id: 6, image: '/images/ecommerce/2d0de4aa1a8bf75963222219ba821b39.jpg', time: '1小时前' },
];

// 任务卡片组件
const TaskCard = ({ task, onClick }) => {
  const getStatusBadge = () => {
    const statusMap = {
      completed: { label: '已完成', class: 'bg-green-100 text-green-700' },
      processing: { label: '处理中', class: 'bg-blue-100 text-blue-700' },
      pending: { label: '等待中', class: 'bg-gray-100 text-gray-700' },
      failed: { label: '失败', class: 'bg-red-100 text-red-700' },
    };
    const status = statusMap[task.status] || statusMap.pending;
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${status.class}`}>
        {status.label}
      </span>
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className="flex">
        {/* 封面 */}
        <div className="w-32 h-24 bg-gray-100 flex-shrink-0 flex items-center justify-center">
          {task.cover ? (
            <img src={task.cover} alt={task.name} className="w-full h-full object-cover" />
          ) : (
            <Layers className="w-8 h-8 text-gray-300" />
          )}
        </div>
        {/* 内容 */}
        <div className="flex-1 p-3 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm truncate">{task.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">批量生成</p>
            </div>
            {getStatusBadge()}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {task.createdAt}
            </div>
            {task.status === 'processing' && (
              <span className="text-xs text-primary-600 font-medium">{task.progress}%</span>
            )}
            {task.status === 'completed' && (
              <span className="text-xs text-gray-500">{task.imageCount}张图片</span>
            )}
          </div>
          {/* 进度条 */}
          {task.status === 'processing' && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full transition-all"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 批量任务弹窗
const BatchModal = ({ isOpen, onClose, designParams, onCreateTask }) => {
  const [taskName, setTaskName] = useState('');
  const [prompts, setPrompts] = useState([{ id: 1, value: '' }]);
  const [countPerPrompt, setCountPerPrompt] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  if (!isOpen && !isVisible) return null;

  // 添加新的文本框
  const addPrompt = () => {
    if (prompts.length < 20) {
      setPrompts([...prompts, { id: Date.now(), value: '' }]);
    }
  };

  // 删除文本框
  const removePrompt = (id) => {
    if (prompts.length > 1) {
      setPrompts(prompts.filter(p => p.id !== id));
    }
  };

  // 更新单个文本框内容
  const updatePrompt = (id, value) => {
    setPrompts(prompts.map(p => p.id === id ? { ...p, value } : p));
  };

  // 获取有效的提示词数量
  const validPromptCount = prompts.filter(p => p.value.trim()).length;
  const totalCount = validPromptCount * countPerPrompt;

  const handleGenerate = () => {
    const validPrompts = prompts.filter(p => p.value.trim());
    const totalCount = validPrompts.length * countPerPrompt;

    // 创建新任务
    onCreateTask({
      name: taskName || '未命名任务',
      prompts: validPrompts.map(p => p.value),
      countPerPrompt,
      totalCount,
      industry: designParams?.industry?.label || '未选择',
      style: designParams?.style?.label || '未选择',
      ratio: designParams?.ratio || '1:1',
      baseModel: designParams?.baseModel?.label || '未选择',
      imageCount: totalCount,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative w-full max-w-4xl bg-white rounded-xl shadow-xl transition-all duration-200 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">批量生成</h3>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="flex">
            {/* 左侧：参数选择 */}
            <div className="w-64 p-4 border-r border-gray-100 space-y-4">
              <h4 className="text-sm font-bold text-gray-700">使用参数</h4>

              {/* 模型选择 */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">模型</label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {designParams?.baseModel?.label || '未选择'}
                </div>
              </div>

              {/* 行业选择 */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">行业</label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {designParams?.industry?.label || '未选择'}
                </div>
              </div>

              {/* 风格选择 */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">风格</label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {designParams?.style?.label || '未选择'}
                </div>
              </div>

              {/* 比例选择 */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">比例</label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {designParams?.ratio || '1:1'}
                </div>
              </div>
            </div>

            {/* 中间：输入区域 */}
            <div className="flex-1 p-4 border-r border-gray-100 overflow-y-auto" style={{ maxHeight: '400px' }}>
              {/* 任务名称 */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">任务名称</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="输入任务名称..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>

              {/* 每张生成数量 */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">每张生成数量</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCountPerPrompt(Math.max(1, countPerPrompt - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer text-base"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{countPerPrompt}</span>
                  <button
                    onClick={() => setCountPerPrompt(Math.min(10, countPerPrompt + 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 提示词输入 - 多个独立输入框 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-700">输入提示词</label>
                  <button
                    onClick={addPrompt}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-primary-600 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> 添加
                  </button>
                </div>

                <div className="space-y-2">
                  {prompts.map((prompt, index) => (
                    <div key={prompt.id} className="flex items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs text-gray-400">提示词 {index + 1}</span>
                        </div>
                        <textarea
                          value={prompt.value}
                          onChange={(e) => updatePrompt(prompt.id, e.target.value)}
                          placeholder="请输入提示词..."
                          className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                        />
                      </div>
                      {prompts.length > 1 && (
                        <button
                          onClick={() => removePrompt(prompt.id)}
                          className="mt-6 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 右侧：确认区域 */}
            <div className="w-48 p-4 bg-gray-50">
              <h4 className="text-sm font-bold text-gray-700 mb-3">确认信息</h4>

              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">提示词数量</div>
                  <div className="text-sm font-medium text-gray-900">{validPromptCount} 个</div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">总计生成</div>
                  <div className="text-lg font-bold text-primary-600">{totalCount} 张</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
            <Button variant="secondary" onClick={handleClose}>取消</Button>
            <Button variant="primary" onClick={handleGenerate} leftIcon={<Sparkles className="w-4 h-4" />}>
              开始生成
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 批量任务页面 - 任务列表
const BatchProduction = ({ onNavigate, tasks = [] }) => {
  const [selectedTask, setSelectedTask] = useState(null); // 当前选中的任务
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleImageSelect = (id) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedImages(mockGeneratedImages.map(img => img.id));
  const deselectAll = () => setSelectedImages([]);

  // 任务列表视图
  const renderTaskList = () => (
    <div className="space-y-3 animate-fade-in-up">
      {tasks.map((task) => (
        <div key={task.id} className="animate-fade-in-up" style={{ animationDelay: `${task.id * 0.05}s` }}>
          <TaskCard task={task} onClick={() => setSelectedTask(task)} />
        </div>
      ))}
      {tasks.length === 0 && (
        <Card className="py-12">
          <div className="text-center">
            <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">暂无任务</h3>
            <p className="text-sm text-gray-500">在AI设计页面点击批量任务开始生成</p>
          </div>
        </Card>
      )}
    </div>
  );

  // 任务详情视图 - 显示该任务生成的图片
  const renderTaskDetail = () => (
    <div className="animate-fade-in-up">
      {/* 第一行：返回按钮 */}
      <div className="mb-3">
        <button
          onClick={() => setSelectedTask(null)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          返回任务列表
        </button>
      </div>

      {/* 第二行：任务信息 */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{selectedTask?.name}</h3>
          <p className="text-sm text-gray-500">{selectedTask?.createdAt} · {selectedTask?.imageCount}张图片</p>
        </div>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
          selectedTask?.status === 'completed' ? 'bg-green-100 text-green-700' :
          selectedTask?.status === 'processing' ? 'bg-blue-100 text-blue-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {selectedTask?.status === 'completed' ? '已完成' : selectedTask?.status === 'processing' ? '处理中' : '等待中'}
        </span>
      </div>

      {/* 第三行：进度条（处理中时显示） */}
      {selectedTask?.status === 'processing' && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500">生成进度</span>
            <span className="text-primary-600 font-medium">{selectedTask?.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all"
              style={{ width: `${selectedTask?.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 图片区域 - 包含操作栏 */}
      <Card>
        {/* 操作栏 */}
        {selectedTask?.status === 'completed' && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <button onClick={selectAll} className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">全选</button>
              <span className="text-gray-300">|</span>
              <button onClick={deselectAll} className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">取消</button>
            </div>
            {selectedImages.length > 0 && (
              <div className="flex gap-2">
                <button className="flex items-center justify-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Download className="w-4 h-4" />下载
                </button>
                <button className="flex items-center justify-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Trash2 className="w-4 h-4" />删除
                </button>
              </div>
            )}
          </div>
        )}

        {/* 图片网格 */}
        {selectedTask?.status === 'completed' ? (
          <div className="grid grid-cols-4 gap-4">
            {mockGeneratedImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => toggleImageSelect(img.id)}
                className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all animate-fade-in-up ${
                  selectedImages.includes(img.id) ? 'ring-2 ring-primary-600' : 'hover:ring-2 hover:ring-gray-300'
                }`}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <img src={img.image} alt="已生成" className="w-full h-full object-cover" />
                {selectedImages.includes(img.id) && (
                  <div className="absolute inset-0 bg-primary-600/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : selectedTask?.status === 'processing' ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-gray-500">正在生成图片...</p>
          </div>
        ) : (
          <div className="py-12 text-center">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">等待生成</p>
          </div>
        )}
      </Card>
    </div>
  );

  return (
    <div className="p-6 animate-fade-in-up">
      {selectedTask ? renderTaskDetail() : renderTaskList()}
    </div>
  );
};

// 导出弹窗组件
BatchProduction.Modal = BatchModal;

export default BatchProduction;
