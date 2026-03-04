import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  Cpu,
  Play,
  Download,
  FolderOpen,
  Settings,
  Sparkles,
  Palette,
  ShoppingBag,
  Tag,
  Layout,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

// 模拟模型库数据 - LoRA模型
const modelLibrary = [
  {
    id: 1,
    name: '电商主图通用风格',
    category: 'ecommerce',
    baseModel: 'SDXL',
    template: '商品展示',
    cover: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
    usageCount: 1250,
    tags: ['电商', '主图', '通用'],
  },
  {
    id: 2,
    name: '促销活动Banner',
    category: 'banner',
    baseModel: 'Flux2-Kein',
    template: '促销模板',
    cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    usageCount: 890,
    tags: ['促销', 'Banner', '电商'],
  },
  {
    id: 3,
    name: '高端品牌Logo',
    category: 'branding',
    baseModel: 'Qwen2511',
    template: '品牌Logo',
    cover: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
    usageCount: 654,
    tags: ['品牌', 'Logo', '高端'],
  },
  {
    id: 4,
    name: '活动海报风格',
    category: 'poster',
    baseModel: 'SDXL',
    template: '海报模板',
    cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    usageCount: 543,
    tags: ['海报', '活动', '促销'],
  },
  {
    id: 5,
    name: '社交媒体封面',
    category: 'social',
    baseModel: 'Flux2-Kein',
    template: '社交媒体',
    cover: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    usageCount: 432,
    tags: ['社交媒体', '封面', '小红书'],
  },
  {
    id: 6,
    name: 'Banner广告模板',
    category: 'banner',
    baseModel: 'Qwen2509',
    template: 'Banner模板',
    cover: 'https://images.unsplash.com/photo-1557742046-c704a9158ae2?w=400&h=300&fit=crop',
    usageCount: 321,
    tags: ['Banner', '广告', '电商'],
  },
  {
    id: 7,
    name: '美妆产品展示',
    category: 'ecommerce',
    baseModel: 'SDXL',
    template: '商品展示',
    cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    usageCount: 287,
    tags: ['美妆', '产品', '展示'],
  },
  {
    id: 8,
    name: '品牌VI设计',
    category: 'branding',
    baseModel: 'Flux2-Kein',
    template: '品牌Logo',
    cover: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
    usageCount: 256,
    tags: ['品牌', 'VI', '设计'],
  },
  {
    id: 9,
    name: '数码产品海报',
    category: 'poster',
    baseModel: 'Qwen2511',
    template: '海报模板',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    usageCount: 234,
    tags: ['数码', '海报', '电子产品'],
  },
  {
    id: 10,
    name: '服装主图模板',
    category: 'ecommerce',
    baseModel: 'SDXL',
    template: '商品展示',
    cover: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    usageCount: 213,
    tags: ['服装', '主图', '模特'],
  },
  {
    id: 11,
    name: '食品促销海报',
    category: 'poster',
    baseModel: 'Flux2-Kein',
    template: '海报模板',
    cover: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    usageCount: 198,
    tags: ['食品', '促销', '美食'],
  },
  {
    id: 12,
    name: '家居生活Banner',
    category: 'banner',
    baseModel: 'Qwen2509',
    template: 'Banner模板',
    cover: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    usageCount: 176,
    tags: ['家居', '生活', '温馨'],
  },
];

// 模拟我的训练数据
const myTraining = [
  {
    id: 1,
    name: '自定义风格模型',
    description: '基于电商主图风格训练',
    baseModel: 'SDXL',
    status: 'training',
    progress: 65,
    startTime: '2024-01-15 10:30',
    estimatedTime: '2小时',
    cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: '产品展示模型',
    description: '3C数码产品展示',
    baseModel: 'Flux2-Kein',
    status: 'completed',
    progress: 100,
    startTime: '2024-01-14 08:00',
    estimatedTime: '1.5小时',
    cover: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: '美妆风格模型',
    description: '美妆产品专用风格',
    baseModel: 'Qwen2509',
    status: 'failed',
    progress: 30,
    startTime: '2024-01-13 14:00',
    estimatedTime: '失败',
    error: '数据集不足',
    cover: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
  },
];

const categories = [
  { id: 'all', label: '全部', icon: Layout },
  { id: 'ecommerce', label: '电商主图', icon: ShoppingBag },
  { id: 'banner', label: 'Banner', icon: Tag },
  { id: 'poster', label: '海报', icon: Palette },
  { id: 'branding', label: '品牌设计', icon: Sparkles },
  { id: 'social', label: '社交媒体', icon: Settings },
];

// 模型卡片组件
const ModelCard = ({ model, onPreview, isFavorite, onToggleFavorite }) => {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      onClick={onPreview}
    >
      {/* Cover */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center relative overflow-hidden group">
        {model.cover ? (
          <img src={model.cover} alt={model.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <FolderOpen className="w-12 h-12 text-gray-300" />
        )}
        {/* 左上角：模型标签 */}
        <span className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-black/50 text-white rounded z-10">
          {model.baseModel}
        </span>
        {/* 右上角：收藏按钮 */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(model.id); }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center transition-colors cursor-pointer opacity-0 group-hover:opacity-100 z-20"
          title="收藏"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-700'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate mb-1">{model.name}</h3>

        {/* 生成参数 */}
        <div className="text-xs text-gray-500">
          {model.template}
        </div>
      </div>
    </div>
  );
};

// 模型预览弹窗
const ModelPreviewModal = ({ model, isOpen, onClose, onUse }) => {
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
            <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span className="sr-only">关闭</span>
              ×
            </button>
          </div>

          {/* Preview */}
          <div className="p-4">
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              {model.cover ? (
                <img src={model.cover} alt={model.name} className="w-full h-full object-cover" />
              ) : (
                <FolderOpen className="w-24 h-24 text-gray-300" />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="p-4 border-t border-gray-100">
            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {model.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* 模型参数 */}
            <div className="mb-4">
              <div className="text-xs font-medium text-gray-500 mb-2">模型参数</div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                  底模: {model.baseModel}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                  类型: {model.template}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                  分类: {model.category}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                已被使用 {model.usageCount} 次
              </span>
              <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={handleClose}>
                  取消
                </Button>
                <Button variant="primary" leftIcon={<Download className="w-4 h-4" />} onClick={onUse}>
                  使用此模型
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Models = () => {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'training'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewModel, setPreviewModel] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // 收藏状态
  const [favorites, setFavorites] = useState(() => {
    const initial = {};
    modelLibrary.forEach((m) => {
      initial[m.id] = false;
    });
    return initial;
  });

  // 切换收藏
  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 筛选
  const filteredLibrary = modelLibrary.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || model.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredTraining = myTraining.filter(training =>
    training.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    training.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Tab 切换 + 搜索栏 */}
      <Card className="mb-4">
        <div className="flex items-center gap-4">
          {/* Tab 切换 */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              模型库
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'training'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              我的训练
            </button>
          </div>

          {/* 搜索栏 - 右侧 */}
          <div className="ml-auto relative w-48">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索模型..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
        </div>
      </Card>

      {/* 分类导航 - 仅在模型库时显示，文字+下划线形式 */}
      {activeTab === 'library' && (
        <div className="flex items-center gap-8 mb-4 overflow-x-auto pb-2 border-b border-gray-200 animate-fade-in">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                whitespace-nowrap text-sm transition-colors cursor-pointer relative flex-shrink-0
                ${activeCategory === category.id
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {category.label}
              {activeCategory === category.id && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 内容区域 */}
      {activeTab === 'library' ? (
        /* 模型库 */
        filteredLibrary.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 animate-fade-in-up">
            {filteredLibrary.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isFavorite={favorites[model.id]}
                onToggleFavorite={toggleFavorite}
                onPreview={() => {
                  setPreviewModel(model);
                  setShowPreview(true);
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <div className="text-center">
              <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">暂无模型</h3>
              <p className="text-sm text-gray-500">尝试其他搜索条件</p>
            </div>
          </Card>
        )
      ) : (
        /* 我的训练 */
        <div className="grid grid-cols-4 gap-4 animate-fade-in-up">
          {filteredTraining.map((training) => (
            <div
              key={training.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* 封面图片 */}
              <div className="aspect-[4/3] bg-gray-100 relative group">
                <img
                  src={training.cover}
                  alt={training.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* 左上角：底模 */}
                <span className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-black/50 text-white rounded z-10">
                  {training.baseModel}
                </span>
                {/* 右上角：状态标签 */}
                <span className={`absolute top-2 right-2 px-2 py-0.5 text-xs text-white rounded z-10 ${
                  training.status === 'completed' ? 'bg-green-500' :
                  training.status === 'training' ? 'bg-blue-500' : 'bg-red-500'
                }`}>
                  {training.status === 'completed' ? '已完成' :
                   training.status === 'training' ? '训练中' : '失败'}
                </span>
              </div>
              {/* 内容区域 */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm truncate">{training.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{training.startTime}</p>
                {/* 训练中显示进度条 */}
                {training.status === 'training' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>进度</span>
                      <span>{training.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full transition-all"
                        style={{ width: `${training.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {/* 失败显示错误信息 */}
                {training.status === 'failed' && training.error && (
                  <p className="text-xs text-red-500 mt-1">错误: {training.error}</p>
                )}
              </div>
            </div>
          ))}

          {filteredTraining.length === 0 && (
            <div className="col-span-4">
              <Card className="py-12">
                <div className="text-center">
                  <Cpu className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">暂无训练记录</h3>
                  <p className="text-sm text-gray-500">点击右上角开始训练</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Preview Modal */}
      <ModelPreviewModal
        model={previewModel}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onUse={() => {
          console.log('Use model:', previewModel?.id);
          setShowPreview(false);
        }}
      />
    </div>
  );
};

export default Models;
