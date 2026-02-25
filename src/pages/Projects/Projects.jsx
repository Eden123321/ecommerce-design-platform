import React, { useState } from 'react';
import {
  Search,
  Plus,
  MoreVertical,
  FolderKanban,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';

// 模拟项目数据
const mockProjects = [
  {
    id: 1,
    name: '618促销活动主图',
    description: '618大促主视觉设计，突出促销氛围',
    status: 'completed',
    type: 'banner',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    cover: null,
  },
  {
    id: 2,
    name: '新品上市Banner',
    description: '春季新品发布会宣传banner',
    status: 'in_progress',
    type: 'banner',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-15',
    cover: null,
  },
  {
    id: 3,
    name: '会员日活动页面',
    description: '会员专属优惠活动页面设计',
    status: 'completed',
    type: 'landing',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-14',
    cover: null,
  },
  {
    id: 4,
    name: '双11预热海报',
    description: '双11提前预热宣传海报',
    status: 'draft',
    type: 'poster',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    cover: null,
  },
  {
    id: 5,
    name: '品牌logo更新',
    description: '品牌形象升级，logo重新设计',
    status: 'in_progress',
    type: 'branding',
    createdAt: '2024-01-11',
    updatedAt: '2024-01-15',
    cover: null,
  },
  {
    id: 6,
    name: '商品详情页模板',
    description: '标准化商品详情页设计模板',
    status: 'completed',
    type: 'template',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    cover: null,
  },
];

const statusConfig = {
  draft: { label: '草稿', variant: 'default' },
  in_progress: { label: '进行中', variant: 'warning' },
  completed: { label: '已完成', variant: 'success' },
};

const typeConfig = {
  banner: 'Banner',
  landing: '落地页',
  poster: '海报',
  branding: '品牌设计',
  template: '模板',
};

// 项目卡片组件
const ProjectCard = ({ project, onEdit, onDelete, onDuplicate, onView, onGenerate }) => {
  const status = statusConfig[project.status];
  const type = typeConfig[project.type];

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onView?.(project)}
    >
      {/* Cover */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center relative overflow-hidden">
        {project.cover ? (
          <img src={project.cover} alt={project.name} className="w-full h-full object-cover" />
        ) : (
          <FolderKanban className="w-12 h-12 text-gray-300" />
        )}

        {/* Hover Overlay - 只覆盖图片部分 */}
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onView?.(project); }}
            className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            查看
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onGenerate?.(project); }}
            className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            生成
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 truncate pr-2">{project.name}</h3>
          <div className="relative">
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={status.variant}>{status.label}</Badge>
            <span className="text-xs text-gray-400">{type}</span>
          </div>
          <span className="text-xs text-gray-400">{project.updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

// 新建项目表单
const CreateProjectForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'banner',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="项目名称"
        placeholder="请输入项目名称"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          项目描述
        </label>
        <textarea
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          rows={3}
          placeholder="请输入项目描述"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          项目类型
        </label>
        <select
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="banner">Banner</option>
          <option value="landing">落地页</option>
          <option value="poster">海报</option>
          <option value="branding">品牌设计</option>
          <option value="template">模板</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit" variant="primary">
          创建项目
        </Button>
      </div>
    </form>
  );
};

const Projects = () => {
  const [projects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 筛选项目
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Filter Bar */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${statusFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              全部
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${statusFilter === 'draft'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              草稿
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${statusFilter === 'in_progress'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              进行中
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${statusFilter === 'completed'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              已完成
            </button>
          </div>

          <div className="flex-1"></div>

          <div className="relative w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索项目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>

          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setShowCreateModal(true)}
          >
            新建项目
          </Button>
        </div>
      </Card>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => console.log('Edit:', project.id)}
              onDelete={() => console.log('Delete:', project.id)}
              onDuplicate={() => console.log('Duplicate:', project.id)}
              onView={(p) => console.log('View:', p.id)}
              onGenerate={(p) => console.log('Generate:', p.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">暂无项目</h3>
            <p className="text-sm text-gray-500 mb-4">创建您的第一个项目开始设计吧</p>
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowCreateModal(true)}
            >
              创建项目
            </Button>
          </div>
        </Card>
      )}

      {/* Create Project Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="新建项目"
        size="md"
      >
        <CreateProjectForm
          onSubmit={(data) => {
            console.log('Create project:', data);
            setShowCreateModal(false);
          }}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Projects;
