import React, { useState } from 'react';
import {
  Search,
  Star,
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
    preview: null,
  },
  {
    id: 2,
    name: '新品上市海报',
    category: 'poster',
    tags: ['新品', '发布会', '时尚'],
    usageCount: 890,
    isFavorite: false,
    preview: null,
  },
  {
    id: 3,
    name: '会员专享优惠',
    category: 'banner',
    tags: ['会员', '优惠', '促销'],
    usageCount: 756,
    isFavorite: true,
    preview: null,
  },
  {
    id: 4,
    name: '品牌Logo展示',
    category: 'branding',
    tags: ['品牌', 'Logo', '企业'],
    usageCount: 543,
    isFavorite: false,
    preview: null,
  },
  {
    id: 5,
    name: '商品详情页',
    category: 'landing',
    tags: ['商品', '详情页', '电商'],
    usageCount: 432,
    isFavorite: false,
    preview: null,
  },
  {
    id: 6,
    name: '节日问候模板',
    category: 'poster',
    tags: ['节日', '问候', '祝福'],
    usageCount: 321,
    isFavorite: false,
    preview: null,
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
const TemplateCard = ({ template, onUse, onPreview }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer">
      {/* Preview */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center relative overflow-hidden">
        <FolderOpen className="w-12 h-12 text-gray-300" />

        {/* Hover Overlay - 只覆盖图片部分 */}
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onPreview?.(); }}
            className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            预览
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onUse?.(); }}
            className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            使用
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 truncate pr-2">{template.name}</h3>
          {template.isFavorite && (
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            使用 {template.usageCount} 次
          </span>
        </div>
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
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-24 h-24 text-gray-300" />
            </div>
          </div>

          {/* Info */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

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
