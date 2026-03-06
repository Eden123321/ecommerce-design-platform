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

// LoRA封面图片列表
const loraImages = [
  '/images/lora/00a6c2ec674fac30aacca60cd1fc645f.jpg',
  '/images/lora/03e1fce532e3881930898f18d4b9c273.jpg',
  '/images/lora/1635315d2430b78d408d26448e9e9ee0.jpg',
  '/images/lora/18ca6235db17f129f74dd768e8ba2492.jpg',
  '/images/lora/29ef407ee35b908e9ad22d706a7965ca.jpg',
  '/images/lora/2f27b8a1e192dc410bfadf3b8e993ef5.jpg',
  '/images/lora/32168d6f835c3aedee3332bf497bd271.jpg',
  '/images/lora/35f5139c187809bbd3a3f37e13fedb9b.jpg',
  '/images/lora/4618fedf3ef3c24f32b2da8272cf8349.jpg',
  '/images/lora/4671c00adab814b2552a5dbc5d97df3d.jpg',
  '/images/lora/48400e21dd0943f698e5a73581ce66fd.jpg',
  '/images/lora/48bd6073fcf6359f553575040c5bf00f.jpg',
  '/images/lora/57120532bc8c806d7612c750eecc4fec.jpg',
  '/images/lora/7551bf9d021a4a31cc79d00efe57d156.jpg',
  '/images/lora/76bfc81e2daadca4883d8cb0421d6474.jpg',
  '/images/lora/8bae8af2cc70962de5d0dcdb730294ea.jpg',
  '/images/lora/8bf446bf82107df1dc536ec4d4f89bc0.jpg',
  '/images/lora/8d04c6437fd80cce390d0d909de452bb.jpg',
  '/images/lora/8e8aec241fb95ff9bc8c83d18fc23cf4.jpg',
  '/images/lora/8f2d2bde250a30d172cc069f32a3185e.jpg',
  '/images/lora/95dd5a69d9adb30869fe08e205dc629a.jpg',
  '/images/lora/bac966656efeb39feb315007a5c91571.jpg',
  '/images/lora/d1b7c4b8b682b6667152881954d91fea.jpg',
  '/images/lora/e4ae1173a8c15fbfa35ab2d600cdf088.jpg',
];

// 模拟模型库数据 - LoRA模型
const modelLibrary = [
  {
    id: 1,
    name: '浪漫爱心',
    category: 'ecommerce',
    baseModel: 'SDXL',
    template: '商品展示',
    cover: loraImages[0],
    usageCount: 1250,
    tags: ['浪漫', '爱心', '粉色'],
  },
  {
    id: 2,
    name: '自然森系',
    category: 'banner',
    baseModel: 'Flux2-Kein',
    template: '促销模板',
    cover: loraImages[1],
    usageCount: 890,
    tags: ['森林', '自然', '绿色'],
  },
  {
    id: 3,
    name: '星空明月',
    category: 'branding',
    baseModel: 'Qwen2511',
    template: '品牌Logo',
    cover: loraImages[2],
    usageCount: 654,
    tags: ['星空', '月亮', '夜景'],
  },
  {
    id: 4,
    name: '日出朝霞',
    category: 'poster',
    baseModel: 'SDXL',
    template: '海报模板',
    cover: loraImages[3],
    usageCount: 543,
    tags: ['日出', '朝霞', '风景'],
  },
  {
    id: 5,
    name: '玫瑰绽放',
    category: 'social',
    baseModel: 'Flux2-Kein',
    template: '社交媒体',
    cover: loraImages[4],
    usageCount: 432,
    tags: ['玫瑰', '鲜花', '浪漫'],
  },
  {
    id: 6,
    name: '金色麦田',
    category: 'banner',
    baseModel: 'Qwen2509',
    template: 'Banner模板',
    cover: loraImages[5],
    usageCount: 321,
    tags: ['麦田', '夕阳', '金色'],
  },
  {
    id: 7,
    name: '云端粉彩',
    category: 'ecommerce',
    baseModel: 'SDXL',
    template: '商品展示',
    cover: loraImages[6],
    usageCount: 287,
    tags: ['云朵', '粉色', '梦幻'],
  },
  {
    id: 8,
    name: '梦幻星空',
    category: 'branding',
    baseModel: 'Flux2-Kein',
    template: '品牌Logo',
    cover: loraImages[7],
    usageCount: 256,
    tags: ['星云', '紫色', '宇宙'],
  },
  {
    id: 9,
    name: '落日余晖',
    category: 'poster',
    baseModel: 'Qwen2511',
    template: '海报模板',
    cover: loraImages[8],
    usageCount: 234,
    tags: ['落日', '海面', '橙色'],
  },
  {
    id: 10,
    name: '水墨山水',
    category: 'ecommerce',
    baseModel: 'SDXL',
    template: '商品展示',
    cover: loraImages[9],
    usageCount: 213,
    tags: ['中国画', '山水', '绿色'],
  },
  {
    id: 11,
    name: '极光之夜',
    category: 'poster',
    baseModel: 'Flux2-Kein',
    template: '海报模板',
    cover: loraImages[10],
    usageCount: 198,
    tags: ['极光', '夜景', '蓝色'],
  },
  {
    id: 12,
    name: '秋日金叶',
    category: 'banner',
    baseModel: 'Qwen2509',
    template: 'Banner模板',
    cover: loraImages[11],
    usageCount: 176,
    tags: ['秋天', '金叶', '树林'],
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
    cover: loraImages[12],
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
    cover: loraImages[13],
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
    cover: loraImages[14],
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
