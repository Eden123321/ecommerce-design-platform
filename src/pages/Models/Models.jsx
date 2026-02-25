import React, { useState } from 'react';
import {
  Search,
  Heart,
  Cpu,
  Play,
  Download,
} from 'lucide-react';

// 模拟模型库数据 - LoRA模型
const modelLibrary = [
  {
    id: 1,
    name: '电商主图通用风格',
    baseModel: 'SDXL',
    template: '商品展示',
    cover: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
    publishTime: '2024-01-15',
  },
  {
    id: 2,
    name: '促销活动Banner',
    baseModel: 'Flux2-Kein',
    template: '促销模板',
    cover: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
    publishTime: '2024-01-14',
  },
  {
    id: 3,
    name: '高端品牌Logo',
    baseModel: 'Qwen2511',
    template: '品牌Logo',
    cover: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
    publishTime: '2024-01-13',
  },
  {
    id: 4,
    name: '活动海报风格',
    baseModel: 'SDXL',
    template: '海报模板',
    cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    publishTime: '2024-01-12',
  },
  {
    id: 5,
    name: '社交媒体封面',
    baseModel: 'Flux2-Kein',
    template: '社交媒体',
    cover: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    publishTime: '2024-01-11',
  },
  {
    id: 6,
    name: 'Banner广告模板',
    baseModel: 'Qwen2509',
    template: 'Banner模板',
    cover: 'https://images.unsplash.com/photo-1557742046-c704a9158ae2?w=400&h=300&fit=crop',
    publishTime: '2024-01-10',
  },
  {
    id: 7,
    name: '默认风格模型',
    baseModel: 'SDXL',
    template: '默认模板',
    cover: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop',
    publishTime: '2024-01-09',
  },
  {
    id: 8,
    name: '品牌VI设计',
    baseModel: 'Flux2-Kein',
    template: '品牌Logo',
    cover: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
    publishTime: '2024-01-08',
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
    cover: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
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
    cover: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
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
    cover: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
  },
];

const Models = () => {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'training'
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState({}); // 存储收藏状态

  // 切换收藏状态
  const toggleFavorite = (modelId) => {
    setFavorites(prev => ({
      ...prev,
      [modelId]: !prev[modelId]
    }));
  };

  // 筛选
  const filteredLibrary = modelLibrary.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTraining = myTraining.filter(training =>
    training.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    training.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Tab 切换 + 搜索栏 */}
      <div className="flex items-center gap-4 mb-6">
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
        <div className="ml-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索模型..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      {activeTab === 'library' ? (
        /* 模型库 */
        <div className="grid grid-cols-4 gap-4">
          {filteredLibrary.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* 封面图片 - 更大占比 */}
              <div className="aspect-[4/3] bg-gray-100 relative group">
                <img
                  src={model.cover}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
                {/* 左上角：底模 */}
                <span className="absolute top-2 left-2 px-2 py-0.5 text-xs bg-black/50 text-white rounded z-10">
                  {model.baseModel}
                </span>
                {/* Hover 遮罩层 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* 右上角：收藏按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(model.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    title="收藏"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        favorites[model.id] ? 'text-red-500 fill-red-500' : 'text-gray-700'
                      }`}
                    />
                  </button>
                  {/* 底部按钮 */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center gap-2">
                    <button className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                      预览
                    </button>
                    <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors cursor-pointer">
                      使用
                    </button>
                  </div>
                </div>
              </div>
              {/* 内容 - 标题和时间 */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm truncate">{model.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{model.publishTime}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 我的训练 - 卡片网格布局 */
        <div className="grid grid-cols-4 gap-4">
          {filteredTraining.map((training) => (
            <div
              key={training.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* 封面图片 */}
              <div className="aspect-[4/3] bg-gray-100 relative group">
                <img
                  src={training.cover}
                  alt={training.name}
                  className="w-full h-full object-cover"
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
                {/* Hover 遮罩层 - 操作按钮 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center gap-2">
                    {training.status === 'training' && (
                      <button className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                        暂停
                      </button>
                    )}
                    {training.status === 'completed' && (
                      <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors cursor-pointer flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        下载
                      </button>
                    )}
                    {training.status === 'failed' && (
                      <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors cursor-pointer flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        重试
                      </button>
                    )}
                  </div>
                </div>
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
    </div>
  );
};

export default Models;
