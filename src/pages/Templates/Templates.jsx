import React, { useState } from 'react';
import {
  Search,
  Heart,
  Download,
  Copy,
  FolderOpen,
  Palette,
  ShoppingCart,
  Gift,
  Tag,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';

// 模拟模板数据
const mockTemplates = [
  {
    id: 1,
    name: '双11促销Banner',
    category: 'banner',
    tags: ['促销', '双11', '电商'],
    usageCount: 1250,
    isFavorite: true,
    preview: '/images/ecommerce/19b1873b618e7029408b7078ae6d867a.jpg',
    params: { model: 'SDXL', industry: '电商', style: '现代风格', ratio: '16:9', type: '文生图' },
  },
  {
    id: 2,
    name: '新品上市海报',
    category: 'poster',
    tags: ['新品', '发布会', '时尚'],
    usageCount: 890,
    isFavorite: false,
    preview: '/images/poster/2b9cf0bc7e51ff4071360284982129b5.jpg',
    params: { model: 'Flux2-Kein', industry: '服装', style: '现代风格', ratio: '9:16', type: '图生图' },
  },
  {
    id: 3,
    name: '会员专享优惠',
    category: 'banner',
    tags: ['会员', '优惠', '促销'],
    usageCount: 756,
    isFavorite: true,
    preview: '/images/social/5ffc47b6d7570867049c88f7f4c34525.jpg',
    params: { model: 'SDXL', industry: '电商', style: '活泼风格', ratio: '16:9', type: '文生图' },
  },
  {
    id: 4,
    name: '品牌Logo展示',
    category: 'branding',
    tags: ['品牌', 'Logo', '企业'],
    usageCount: 543,
    isFavorite: false,
    preview: '/images/ecommerce/5e4fdfb5022fdff2a6e9dd57ca499d3c.jpg',
    params: { model: 'Flux2-Kein', industry: '家居', style: '轻奢风格', ratio: '1:1', type: '文生图' },
  },
  {
    id: 5,
    name: '商品详情页',
    category: 'landing',
    tags: ['商品', '详情页', '电商'],
    usageCount: 432,
    isFavorite: false,
    preview: '/images/ecommerce/a8adcd43bc28e26508ba9741177e791b.jpg',
    params: { model: 'Flux2-Kein', industry: '电商', style: '扁平风格', ratio: '1:1', type: '图生图' },
  },
  {
    id: 6,
    name: '节日问候模板',
    category: 'poster',
    tags: ['节日', '问候', '祝福'],
    usageCount: 321,
    isFavorite: false,
    preview: '/images/poster/54b5db689d637bcba2a0ed3bd8d719e0.jpg',
    params: { model: 'Qwen2509', industry: '电商', style: '极简风格', ratio: '1:1', type: '智能' },
  },
  {
    id: 7,
    name: '春季上新Banner',
    category: 'banner',
    tags: ['春季', '上新', '时尚'],
    usageCount: 654,
    isFavorite: false,
    preview: '/images/social/3be78ddf4124b4cc21830f0dce67e43c.jpg',
    params: { model: 'SDXL', industry: '服装', style: '现代风格', ratio: '16:9', type: '文生图' },
  },
  {
    id: 8,
    name: '美妆产品海报',
    category: 'poster',
    tags: ['美妆', '护肤', '化妆品'],
    usageCount: 567,
    isFavorite: true,
    preview: '/images/ecommerce/76081772fe50d4400079f7f47388b176.jpg',
    params: { model: 'Flux2-Kein', industry: '美妆', style: '轻奢风格', ratio: '9:16', type: '图生图' },
  },
  {
    id: 9,
    name: '数码产品展示',
    category: 'landing',
    tags: ['数码', '电子', '科技'],
    usageCount: 432,
    isFavorite: false,
    preview: '/images/ecommerce/356ba44a0aad3478ed13034341e363d0.jpg',
    params: { model: 'Qwen2511', industry: '数码', style: '现代风格', ratio: '16:9', type: '图生图' },
  },
  {
    id: 10,
    name: '食品促销海报',
    category: 'poster',
    tags: ['食品', '美食', '促销'],
    usageCount: 398,
    isFavorite: false,
    preview: '/images/poster/39848c8e726c3e8736d30b60d26d9913.jpg',
    params: { model: 'SDXL', industry: '食品', style: '活泼风格', ratio: '1:1', type: '文生图' },
  },
  {
    id: 11,
    name: '家居生活Banner',
    category: 'banner',
    tags: ['家居', '生活', '温馨'],
    usageCount: 345,
    isFavorite: false,
    preview: '/images/ecommerce/d41a1973c80326b230266d549687436a.jpg',
    params: { model: 'Flux2-Kein', industry: '家居', style: '极简风格', ratio: '16:9', type: '智能' },
  },
  {
    id: 12,
    name: '企业品牌宣传',
    category: 'branding',
    tags: ['企业', '品牌', '宣传'],
    usageCount: 287,
    isFavorite: false,
    preview: '/images/ecommerce/42e945e92bc9df8ba1a2fbc1cf66514a.jpg',
    params: { model: 'Flux2-Kein', industry: '家居', style: '轻奢风格', ratio: '16:9', type: '文生图' },
  },
];

const categories = [
  { id: 'all', label: '全部', icon: FolderOpen },
  { id: 'banner', label: 'Banner', icon: ShoppingCart },
  { id: 'poster', label: '海报', icon: Tag },
  { id: 'landing', label: '落地页', icon: Gift },
  { id: 'branding', label: '品牌设计', icon: Palette },
];

// 模板卡片
const TemplateCard = ({ template, onUse, onPreview, isFavorite, onToggleFavorite }) => {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onPreview}
    >
      {/* Preview */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center relative overflow-hidden group">
        {template.preview ? (
          <img src={template.preview} alt={template.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <FolderOpen className="w-12 h-12 text-gray-300" />
        )}
        {/* 左上角：模型标签 */}
        {template.params && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-black/50 text-white rounded z-10">
            {template.params.model}
          </span>
        )}
        {/* 右上角：收藏按钮 */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(template.id); }}
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
        <h3 className="font-medium text-gray-900 truncate mb-1">{template.name}</h3>

        {/* 生成参数 */}
        {template.params && (
          <div className="text-xs text-gray-500">
            {template.params.industry} · {template.params.ratio}
          </div>
        )}
      </div>
    </div>
  );
};

// 模板预览弹窗
const TemplatePreviewModal = ({ template, isOpen, onClose, onUse }) => {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span className="sr-only">关闭</span>
              ×
            </button>
          </div>

          {/* Preview */}
          <div className="p-4">
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              {template.preview ? (
                <img src={template.preview} alt={template.name} className="w-full h-full object-cover" />
              ) : (
                <FolderOpen className="w-24 h-24 text-gray-300" />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="p-4 border-t border-gray-100">
            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* 生成参数 */}
            {template.params && (
              <div className="mb-4">
                <div className="text-xs font-medium text-gray-500 mb-2">生成参数</div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    模型: {template.params.model}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    行业: {template.params.industry}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    风格: {template.params.style}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    比例: {template.params.ratio}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                    类型: {template.params.type}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                已被使用 {template.usageCount} 次
              </span>
              <div className="flex items-center gap-3">
                <Button variant="secondary" leftIcon={<Copy className="w-4 h-4" />}>
                  复制
                </Button>
                <Button variant="primary" leftIcon={<Download className="w-4 h-4" />} onClick={onUse}>
                  使用此模板
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Templates = () => {
  const [templates] = useState(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // 收藏状态
  const [favorites, setFavorites] = useState(() => {
    const initial = {};
    mockTemplates.forEach((t) => {
      initial[t.id] = t.isFavorite;
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
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      {/* Category & Search Bar */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          {/* Category Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-2 flex-1">
            {categories.map((category) => {
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer
                    ${activeCategory === category.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索模板..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
        </div>
      </Card>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isFavorite={favorites[template.id]}
              onToggleFavorite={toggleFavorite}
              onUse={() => console.log('Use template:', template.id)}
              onPreview={() => {
                setPreviewTemplate(template);
                setShowPreview(true);
              }}
            />
          ))}
        </div>
      ) : (
        <Card className="py-12">
          <div className="text-center">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">暂无模板</h3>
            <p className="text-sm text-gray-500">尝试其他搜索条件</p>
          </div>
        </Card>
      )}

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onUse={() => {
          console.log('Use template:', previewTemplate?.id);
          setShowPreview(false);
        }}
      />
    </div>
  );
};

export default Templates;
