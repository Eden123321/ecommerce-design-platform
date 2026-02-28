import React, { useState, useRef } from 'react';
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
  FileText,
  Plus,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

// 模拟任务数据
const mockTasks = [
  {
    id: 1,
    name: '电商主图批量生成',
    type: 'generate',
    status: 'completed',
    progress: 100,
    imageCount: 20,
    createdAt: '2024-01-20 14:30',
    cover: '/images/ecommerce/c0d3059e7b17365dc32c50a031d62e3f.jpg',
  },
  {
    id: 2,
    name: '新品海报模板套用',
    type: 'template',
    status: 'processing',
    progress: 65,
    imageCount: 10,
    createdAt: '2024-01-20 10:15',
    cover: '/images/ecommerce/cce4010d4fc5718774e5a0a2b1c5722c.jpg',
  },
  {
    id: 3,
    name: '活动Banner批量处理',
    type: 'process',
    status: 'pending',
    progress: 0,
    imageCount: 0,
    createdAt: '2024-01-19 16:45',
    cover: null,
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

// 模板选项
const templates = [
  { id: 'promotion', label: '促销模板' },
  { id: 'product', label: '商品展示' },
  { id: 'poster', label: '海报模板' },
  { id: 'banner', label: 'Banner模板' },
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

  const getTypeLabel = () => {
    const typeMap = {
      generate: '批量生成',
      template: '模板套用',
      process: '批量处理',
    };
    return typeMap[task.type] || '未知';
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
              <p className="text-xs text-gray-500 mt-0.5">{getTypeLabel()}</p>
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

// 新建任务弹窗
const NewTaskModal = ({ isOpen, onClose, onCreateTask }) => {
  const [taskType, setTaskType] = useState('generate');

  if (!isOpen) return null;

  const handleCreate = () => {
    onCreateTask(taskType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">新建任务</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-3">选择任务类型</p>
            <div className="space-y-2">
              <button
                onClick={() => setTaskType('generate')}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  taskType === 'generate'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-medium text-gray-900">批量生成</div>
                    <div className="text-xs text-gray-500">输入多个提示词批量生成图片</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setTaskType('template')}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  taskType === 'template'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-medium text-gray-900">模板套用</div>
                    <div className="text-xs text-gray-500">选择模板批量套用到产品图</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setTaskType('process')}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  taskType === 'process'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-medium text-gray-900">批量处理</div>
                    <div className="text-xs text-gray-500">对已生成的图片批量处理</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>取消</Button>
            <Button variant="primary" onClick={handleCreate}>创建任务</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 任务详情页面（原来的批量生产功能）
const TaskDetail = ({ task, onBack }) => {
  const [activeTab, setActiveTab] = useState(task.type || 'generate');
  const [selectedImages, setSelectedImages] = useState([]);
  const [batchPrompts, setBatchPrompts] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const fileInputRef = useRef(null);

  const handlePromptChange = (e) => setBatchPrompts(e.target.value);

  const toggleImageSelect = (id) => {
    setSelectedImages(prev =>
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedImages(mockGeneratedImages.map(img => img.id));
  const deselectAll = () => setSelectedImages([]);

  const handleProductImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    setProductImages(prev => [...prev, ...newImages].slice(0, 20));
  };

  const removeProductImage = (id) => {
    setProductImages(prev => prev.filter(img => img.id !== id));
  };

  // 根据任务类型确定默认Tab
  const getDefaultTab = () => {
    const typeMap = { generate: 'generate', template: 'template', process: 'process' };
    return typeMap[task.type] || 'generate';
  };

  return (
    <div className="p-6">
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 mb-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        返回任务列表
      </button>

      {/* Tab 切换 */}
      <Card className="mb-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'generate' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              批量生成
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'process' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              批量处理
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'template' ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              模板套用
            </button>
          </div>
        </div>
      </Card>

      {/* 内容区域 */}
      <div className="flex gap-6">
        {/* 左侧输入区域 */}
        <div className="w-[480px] flex-shrink-0">
          <Card className="h-full">
            <div className="flex flex-col h-full">
              <div className="space-y-6 flex-1 overflow-auto pr-4 scrollbar-thin">
                {activeTab === 'generate' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">批量输入提示词</label>
                      <textarea
                        value={batchPrompts}
                        onChange={handlePromptChange}
                        placeholder="每行一个提示词，支持批量生成..."
                        rows={10}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">每行一个提示词，最多支持20个</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">选择行业</label>
                      <div className="grid grid-cols-3 gap-2">
                        {industries.map((industry) => (
                          <button
                            key={industry.id}
                            onClick={() => setSelectedIndustry(industry)}
                            className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                              selectedIndustry?.id === industry.id
                                ? 'bg-primary-50 border-primary-200 text-primary-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                          >
                            {industry.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">选择风格</label>
                      <div className="grid grid-cols-3 gap-2">
                        {styleOptions.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style)}
                            className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                              selectedStyle?.id === style.id
                                ? 'bg-primary-50 border-primary-200 text-primary-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">图片比例</label>
                      <div className="grid grid-cols-4 gap-2">
                        {aspectRatioOptions.map((ratio) => (
                          <button
                            key={ratio.id}
                            onClick={() => setSelectedRatio(ratio.id)}
                            className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                              selectedRatio === ratio.id
                                ? 'bg-primary-50 border-primary-200 text-primary-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                          >
                            {ratio.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'process' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">批量处理</h3>
                    <p className="text-sm text-gray-500 mb-4">选择已生成的图片进行批量操作</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <button onClick={selectAll} className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">全选</button>
                      <span className="text-gray-300">|</span>
                      <button onClick={deselectAll} className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">取消全选</button>
                    </div>
                    <p className="text-sm text-gray-500">已选择 {selectedImages.length} 张图片</p>
                  </div>
                )}

                {activeTab === 'template' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">选择模板</label>
                      <div className="grid grid-cols-2 gap-2">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template)}
                            className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                              selectedTemplate?.id === template.id
                                ? 'bg-primary-50 border-primary-200 text-primary-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                          >
                            {template.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        批量上传产品图 <span className="text-gray-400 font-normal">(最多20张)</span>
                      </label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">点击或拖拽上传产品图</span>
                        <span className="text-xs text-gray-400 mt-1">支持 JPG、PNG 格式</span>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                      {productImages.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">已上传 {productImages.length} 张图片</p>
                          <div className="grid grid-cols-4 gap-2">
                            {productImages.map((img) => (
                              <div key={img.id} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                <img src={img.preview} alt="产品图" className="w-full h-full object-cover" />
                                <button onClick={() => removeProductImage(img.id)} className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">统一参数</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">电商行业</button>
                        <button className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">现代风格</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 底部按钮 */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                {activeTab === 'generate' && (
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer bg-gradient-to-r from-primary-600 to-primary-600 text-white hover:from-primary-700 hover:to-primary-700 shadow-lg shadow-primary-500/25">
                    <Sparkles className="w-5 h-5" />
                    批量生成
                  </button>
                )}
                {activeTab === 'process' && (
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                      <Download className="w-4 h-4" />批量下载
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" />批量删除
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                      <RotateCcw className="w-4 h-4" />重新生成
                    </button>
                  </div>
                )}
                {activeTab === 'template' && (
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer bg-gradient-to-r from-primary-600 to-primary-600 text-white hover:from-primary-700 hover:to-primary-700 shadow-lg shadow-primary-500/25">
                    <Sparkles className="w-5 h-5" />
                    开始批量生成
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* 右侧结果展示 */}
        <div className="flex-1">
          <Card className="h-full overflow-auto">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'generate' && <Layers className="w-8 h-8 text-gray-400" />}
                {activeTab === 'process' && <Image className="w-8 h-8 text-gray-400" />}
                {activeTab === 'template' && <FileText className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {activeTab === 'generate' && '批量生成结果'}
                {activeTab === 'process' && '已生成的图片'}
                {activeTab === 'template' && '模板套用结果'}
              </h3>
              <p className="text-sm text-gray-500">
                {activeTab === 'generate' && '生成的图片将在这里展示'}
                {activeTab === 'process' && '选择图片后可进行批量操作'}
                {activeTab === 'template' && '批量生成的图片将在这里展示'}
              </p>
            </div>
            {activeTab === 'process' && (
              <div className="grid grid-cols-4 gap-4 p-4">
                {mockGeneratedImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => toggleImageSelect(img.id)}
                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImages.includes(img.id) ? 'ring-2 ring-primary-600' : 'hover:ring-2 hover:ring-gray-300'
                    }`}
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
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// 主组件
const BatchProduction = ({ onNavigate, showNewTaskModal, setShowNewTaskModal }) => {
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  // 创建新任务
  const handleCreateTask = (type) => {
    const typeLabels = { generate: '批量生成', template: '模板套用', process: '批量处理' };
    const newTask = {
      id: Date.now(),
      name: `${typeLabels[type] || '新任务'}`,
      type,
      status: 'pending',
      progress: 0,
      imageCount: 0,
      createdAt: new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      cover: null,
    };
    setTasks([newTask, ...tasks]);
    setSelectedTask(newTask);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setShowNewTaskModal(false);
  };

  // 任务列表视图
  if (!selectedTask) {
    return (
      <div className="p-6">

        {/* 任务列表 */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => setSelectedTask(task)}
            />
          ))}
          {tasks.length === 0 && (
            <Card className="py-12">
              <div className="text-center">
                <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">暂无任务</h3>
                <p className="text-sm text-gray-500">点击上方按钮创建新任务</p>
              </div>
            </Card>
          )}
        </div>

        {/* 新建任务弹窗 */}
        <NewTaskModal
          isOpen={showNewTaskModal}
          onClose={() => setShowNewTaskModal(false)}
          onCreateTask={handleCreateTask}
        />
      </div>
    );
  }

  // 任务详情视图
  return <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} />;
};

export default BatchProduction;
