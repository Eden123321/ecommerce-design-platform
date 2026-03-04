import React, { useState } from 'react';
import {
  Search,
  Plus,
  Upload,
  Download,
  MoreVertical,
  FileText,
  Database,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Modal from '../../components/common/Modal/Modal';

// 模拟数据集
const mockDatasets = [
  {
    id: 1,
    name: '电商Banner数据集',
    description: '包含各类电商banner设计，用于训练和评估AI生成模型',
    type: 'training',
    recordCount: 15000,
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
  },
  {
    id: 2,
    name: '商品主图数据集',
    description: '电商平台商品主图，包含多种品类',
    type: 'training',
    recordCount: 25000,
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-14',
  },
  {
    id: 3,
    name: 'Logo设计数据集',
    description: '品牌Logo设计样本，用于logo生成模型',
    type: 'evaluation',
    recordCount: 5000,
    status: 'inactive',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12',
  },
  {
    id: 4,
    name: '海报设计数据集',
    description: '各类营销海报设计，用于海报生成模型训练',
    type: 'training',
    recordCount: 8000,
    status: 'active',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-10',
  },
  {
    id: 5,
    name: 'UI界面数据集',
    description: '移动端UI界面设计，用于UI生成模型',
    type: 'evaluation',
    recordCount: 12000,
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-08',
  },
];

const statusConfig = {
  active: { label: '已启用', variant: 'success' },
  inactive: { label: '已停用', variant: 'default' },
};

const typeConfig = {
  training: { label: '训练集', color: 'bg-blue-100 text-blue-700' },
  evaluation: { label: '评估集', color: 'bg-purple-100 text-purple-700' },
};

// 数据集行组件（列表模式）
const DatasetRow = ({ dataset, onEdit, onDelete, onToggle }) => {
  const status = statusConfig[dataset.status];
  const type = typeConfig[dataset.type];

  return (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{dataset.name}</div>
            <div className="text-sm text-gray-500">{dataset.description}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${type.color}`}>
          {type.label}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-600">{dataset.recordCount.toLocaleString()}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm text-gray-500">{dataset.updatedAt}</span>
      </td>
      <td className="px-4 py-4">
        <Badge variant={status.variant}>{status.label}</Badge>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Datasets = () => {
  const [datasets, setDatasets] = useState(mockDatasets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // 筛选
  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dataset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 统计
  const stats = {
    total: datasets.length,
    active: datasets.filter((d) => d.status === 'active').length,
    records: datasets.reduce((acc, d) => acc + d.recordCount, 0),
  };

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">测评集</h1>
          <p className="text-sm text-gray-500 mt-1">管理训练和评估数据集</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowUploadModal(true)}
        >
          新建数据集
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-500">数据集总数</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">{stats.active}</div>
              <div className="text-sm text-gray-500">已启用</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">{stats.records.toLocaleString()}</div>
              <div className="text-sm text-gray-500">总记录数</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜索数据集..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`
                  px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer
                  ${statusFilter === status
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {status === 'all' ? '全部' : status === 'active' ? '已启用' : '已停用'}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card padding={false}>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">名称</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">类型</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">记录数</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">更新时间</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">状态</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredDatasets.map((dataset) => (
              <DatasetRow
                key={dataset.id}
                dataset={dataset}
                onEdit={() => {}}
                onDelete={() => {}}
                onToggle={() => {}}
              />
            ))}
          </tbody>
        </table>

        {filteredDatasets.length === 0 && (
          <div className="py-12 text-center">
            <Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">暂无数据集</p>
          </div>
        )}
      </Card>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="新建数据集"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="数据集名称"
            placeholder="请输入数据集名称"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              数据集描述
            </label>
            <textarea
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              rows={3}
              placeholder="请输入数据集描述"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              数据集类型
            </label>
            <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all">
              <option value="training">训练集</option>
              <option value="evaluation">评估集</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              上传数据
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">点击或拖拽文件到此处上传</p>
              <p className="text-xs text-gray-400">支持 CSV、JSON、TXT 格式</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={() => setShowUploadModal(false)}>
              创建数据集
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Datasets;
