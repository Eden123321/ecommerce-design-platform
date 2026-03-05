import React, { useState } from 'react';
import {
  Image,
  FileText,
  Cpu,
  Trash2,
  Heart,
  Calendar,
  MoreVertical,
} from 'lucide-react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

// 模拟作品数据 - 包含日期
const mockWorks = [
  // 2026-03-05 今天
  {
    id: 1,
    name: '春季新品海报',
    image: '/images/ecommerce/3066480e150e254b7a072774d1092117.jpg',
    createdAt: '2026-03-05',
  },
  {
    id: 2,
    name: '女神节活动页',
    image: '/images/ecommerce/42e945e92bc9df8ba1a2fbc1cf66514a.jpg',
    createdAt: '2026-03-05',
  },
  {
    id: 3,
    name: '美妆直播封面',
    image: '/images/social/3be78ddf4124b4cc21830f0dce67e43c.jpg',
    createdAt: '2026-03-05',
  },
  {
    id: 4,
    name: '女装主图',
    image: '/images/ecommerce/76081772fe50d4400079f7f47388b176.jpg',
    createdAt: '2026-03-05',
  },
  {
    id: 5,
    name: '数码测评封面',
    image: '/images/ecommerce/d41a1973c80326b230266d549687436a.jpg',
    createdAt: '2026-03-05',
  },
  // 2026-03-04
  {
    id: 6,
    name: '限时特惠Banner',
    image: '/images/poster/8859307a6287009a268a049808f11a3f.jpg',
    createdAt: '2026-03-04',
  },
  {
    id: 7,
    name: '家居好物推荐',
    image: '/images/ecommerce/1673c6f50f85129c8222187d7e643d91.jpg',
    createdAt: '2026-03-04',
  },
  {
    id: 8,
    name: '零食包装设计',
    image: '/images/ecommerce/19b1873b618e7029408b7078ae6d867a.jpg',
    createdAt: '2026-03-04',
  },
  // 2026-03-03
  {
    id: 9,
    name: '周末促销海报',
    image: '/images/social/08511dbe04d8625318e33d2c8dbe8dde.jpg',
    createdAt: '2026-03-03',
  },
  {
    id: 10,
    name: '品牌故事封面',
    image: '/images/ecommerce/27dac6614f4db4a884cc9d811676a9da.jpg',
    createdAt: '2026-03-03',
  },
  // 2026-03-02
  {
    id: 11,
    name: '会员专享Banner',
    image: '/images/poster/011b5f3784d199928f8506a31e4e6506.jpg',
    createdAt: '2026-03-02',
  },
  {
    id: 12,
    name: '新品首发主图',
    image: '/images/ecommerce/2d0de4aa1a8bf75963222219ba821b39.jpg',
    createdAt: '2026-03-02',
  },
  // 2026-03-01
  {
    id: 13,
    name: '3月你好海报',
    image: '/images/ecommerce/356ba44a0aad3478ed13034341e363d0.jpg',
    createdAt: '2026-03-01',
  },
  {
    id: 14,
    name: '春装上市封面',
    image: '/images/social/0e005099a0756faf8adc1162816e5165.jpg',
    createdAt: '2026-03-01',
  },
  // 2026-02-28
  {
    id: 15,
    name: '月末清仓Banner',
    image: '/images/ecommerce/3b0d5bc0df4281a8297faf6fff2760bb.jpg',
    createdAt: '2026-02-28',
  },
  {
    id: 16,
    name: '情人节活动页',
    image: '/images/poster/19aa5e43c56642bedfb819bd5a8d6b33.jpg',
    createdAt: '2026-02-28',
  },
  // 2026-02-27
  {
    id: 17,
    name: '情侣装主图',
    image: '/images/ecommerce/40bfe0c29e0d59ab1c4f5fb03f8d45a9.jpg',
    createdAt: '2026-02-27',
  },
  {
    id: 18,
    name: '巧克力海报',
    image: '/images/ecommerce/412c9be389f4fd6243e8a74826633956.jpg',
    createdAt: '2026-02-27',
  },
  // 2026-02-26
  {
    id: 19,
    name: '开学季封面',
    image: '/images/social/2018ec08b3e5bb1f276d8ceca217b10e.jpg',
    createdAt: '2026-02-26',
  },
  {
    id: 20,
    name: '文具主图',
    image: '/images/ecommerce/5e4fdfb5022fdff2a6e9dd57ca499d3c.jpg',
    createdAt: '2026-02-26',
  },
  // 2026-02-25
  {
    id: 21,
    name: '早春穿搭Banner',
    image: '/images/ecommerce/5edac3fd0c18f0a51280b1dffc9d1f68.jpg',
    createdAt: '2026-02-25',
  },
  {
    id: 22,
    name: '美妆教程封面',
    image: '/images/poster/2518c9f0d578f055d4cfda2489ac1bb8.jpg',
    createdAt: '2026-02-25',
  },
  // 2026-02-24
  {
    id: 23,
    name: '健身达人海报',
    image: '/images/social/3bd125c5e7f284f1d78614e40826d685.jpg',
    createdAt: '2026-02-24',
  },
  {
    id: 24,
    name: '运动装备主图',
    image: '/images/ecommerce/7d01a2376d4d42ea9a366fb262bf7487.jpg',
    createdAt: '2026-02-24',
  },
  // 2026-02-23
  {
    id: 25,
    name: '元宵节活动',
    image: '/images/poster/2b9cf0bc7e51ff4071360284982129b5.jpg',
    createdAt: '2026-02-23',
  },
  {
    id: 26,
    name: '汤圆海报',
    image: '/images/ecommerce/86f6021b469d0913206537c068a167aa.jpg',
    createdAt: '2026-02-23',
  },
  // 2026-02-22
  {
    id: 27,
    name: '龙抬头Banner',
    image: '/images/ecommerce/a8adcd43bc28e26508ba9741177e791b.jpg',
    createdAt: '2026-02-22',
  },
  {
    id: 28,
    name: '二月二封面',
    image: '/images/social/3e6574cf392214cd2e7c79cd9cffbc6d.jpg',
    createdAt: '2026-02-22',
  },
  // 2026-02-20
  {
    id: 29,
    name: '开工大吉海报',
    image: '/images/ecommerce/aaa073a507498a4756144d943e0e00eb.jpg',
    createdAt: '2026-02-20',
  },
  {
    id: 30,
    name: '年后促销Banner',
    image: '/images/poster/39848c8e726c3e8736d30b60d26d9913.jpg',
    createdAt: '2026-02-20',
  },
  // 2026-02-15
  {
    id: 31,
    name: '春节快乐封面',
    image: '/images/social/3ec05ab7ea68224cc6a60a3ddde2ef4e.jpg',
    createdAt: '2026-02-15',
  },
  {
    id: 32,
    name: '除夕夜海报',
    image: '/images/ecommerce/b11c69baae583d32d704cec6289f3742.jpg',
    createdAt: '2026-02-15',
  },
  // 2026-02-14
  {
    id: 33,
    name: '情人节快乐',
    image: '/images/ecommerce/b2508687c5cd3e89df932b331c22358b.jpg',
    createdAt: '2026-02-14',
  },
  {
    id: 34,
    name: '玫瑰花海报',
    image: '/images/poster/54b5db689d637bcba2a0ed3bd8d719e0.jpg',
    createdAt: '2026-02-14',
  },
  // 2026-02-12
  {
    id: 35,
    name: '情人节预热',
    image: '/images/ecommerce/bcae817b8678d3ea39f689ce0bfe9755.jpg',
    createdAt: '2026-02-12',
  },
  {
    id: 36,
    name: '礼物推荐封面',
    image: '/images/social/4200eeca8bfff5f4d4575b6053f83c23.jpg',
    createdAt: '2026-02-12',
  },
  // 2026-02-10
  {
    id: 37,
    name: '年货节Banner',
    image: '/images/ecommerce/c0d3059e7b17365dc32c50a031d62e3f.jpg',
    createdAt: '2026-02-10',
  },
  {
    id: 38,
    name: '年货清单海报',
    image: '/images/poster/619f844768cafe1e109b621d309c8508.jpg',
    createdAt: '2026-02-10',
  },
  // 2026-02-05
  {
    id: 39,
    name: '立春活动页',
    image: '/images/ecommerce/c5d071cc1977cd59a1b8b51242495c53.jpg',
    createdAt: '2026-02-05',
  },
  {
    id: 40,
    name: '春季上新Banner',
    image: '/images/social/477c0c74adb61f8fb53f32079e2d17e4.jpg',
    createdAt: '2026-02-05',
  },
];

// 模拟个人模板数据
const mockMyTemplates = [
  {
    id: 1,
    name: '我的电商模板1',
    cover: '/images/ecommerce/3066480e150e254b7a072774d1092117.jpg',
    type: 'banner',
  },
  {
    id: 2,
    name: '我的促销模板',
    cover: '/images/ecommerce/76081772fe50d4400079f7f47388b176.jpg',
    type: 'banner',
  },
];

// 模拟收藏的模板数据
const mockFavoriteTemplates = [
  {
    id: 1,
    name: '电商促销模板',
    cover: '/images/ecommerce/3066480e150e254b7a072774d1092117.jpg',
    type: 'banner',
  },
  {
    id: 2,
    name: '社交媒体封面',
    cover: '/images/social/3be78ddf4124b4cc21830f0dce67e43c.jpg',
    type: 'social',
  },
  {
    id: 3,
    name: '海报模板',
    cover: '/images/poster/8859307a6287009a268a049808f11a3f.jpg',
    type: 'poster',
  },
];

// 模拟自己训练的模型数据
const mockMyModels = [
  {
    id: 1,
    name: '电商主图风格',
    type: 'lora',
    cover: '/images/ecommerce/3066480e150e254b7a072774d1092117.jpg',
    baseModel: 'SDXL',
    trainedAt: '2024-01-15',
    status: 'completed',
  },
  {
    id: 2,
    name: '促销Banner风格',
    type: 'lora',
    cover: '/images/ecommerce/76081772fe50d4400079f7f47388b176.jpg',
    baseModel: 'Flux2-Kein',
    trainedAt: '2024-01-14',
    status: 'completed',
  },
  {
    id: 3,
    name: '高端品牌风格',
    type: 'lora',
    cover: '/images/poster/8859307a6287009a268a049808f11a3f.jpg',
    baseModel: 'Qwen2511',
    trainedAt: '2024-01-13',
    status: 'training',
  },
];

// 模拟收藏的模型数据
const mockFavoriteModels = [
  {
    id: 1,
    name: 'SDXL电商风格',
    type: 'lora',
    cover: '/images/ecommerce/d41a1973c80326b230266d549687436a.jpg',
    baseModel: 'SDXL',
    trainedAt: '2024-01-10',
    status: 'completed',
  },
  {
    id: 2,
    name: 'Flux清新风格',
    type: 'lora',
    cover: '/images/ecommerce/42e945e92bc9df8ba1a2fbc1cf66514a.jpg',
    baseModel: 'Flux2-Kein',
    trainedAt: '2024-01-08',
    status: 'completed',
  },
];

// 作品卡片组件 - 只显示图片
const WorkCard = ({ work, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group cursor-pointer">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {work.image ? (
          <img src={work.image} alt={work.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* 右上角删除按钮 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(work.id); }}
            className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            title="删除"
          >
            <Trash2 className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 模板卡片组件
const TemplateCard = ({ template, onCollect }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {template.cover ? (
          <img src={template.cover} alt={template.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* 右上角收藏按钮 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={() => onCollect?.(template.id)}
            className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            title="取消收藏"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate text-sm">{template.name}</h3>
        <div className="text-xs text-gray-500 mt-1">
          {template.type === 'banner' && 'Banner'}
          {template.type === 'social' && '社交媒体'}
          {template.type === 'poster' && '海报'}
          {template.type === 'logo' && 'Logo'}
        </div>
      </div>
    </div>
  );
};

// 模型卡片组件 - 带封面
const ModelCard = ({ model, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden group">
      {/* 封面图 */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {model.cover ? (
          <img src={model.cover} alt={model.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Cpu className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* 右上角操作按钮 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={() => onDelete?.(model.id)}
            className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            title="删除"
          >
            <Trash2 className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate text-sm">{model.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500">
            {model.baseModel}
          </div>
          <span className={`px-2 py-0.5 text-xs rounded-full ${
            model.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {model.status === 'completed' ? '已完成' : '训练中'}
          </span>
        </div>
      </div>
    </div>
  );
};

// 按日期分组作品
const groupWorksByDate = (works) => {
  const groups = {};
  works.forEach((work) => {
    const date = work.createdAt;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(work);
  });
  return groups;
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('works');

  // 模板切换状态
  const [templateType, setTemplateType] = useState('my'); // 'my' | 'favorite'

  // 模型切换状态
  const [modelType, setModelType] = useState('my'); // 'my' | 'favorite'

  const tabs = [
    { id: 'works', label: '作品', icon: Image },
    { id: 'templates', label: '模板', icon: FileText },
    { id: 'models', label: '模型', icon: Cpu },
  ];

  const handleDeleteWork = (id) => {
    console.log('Delete work:', id);
  };

  const handleCollectTemplate = (id) => {
    console.log('Collect template:', id);
  };

  const handleDeleteModel = (id) => {
    console.log('Delete model:', id);
  };

  // 按日期分组作品
  const groupedWorks = groupWorksByDate(mockWorks);
  const sortedDates = Object.keys(groupedWorks).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Tab切换 */}
      <Card className="mb-6">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* 内容区域 */}
      {activeTab === 'works' && (
        <div>
          {mockWorks.length > 0 ? (
            <div className="space-y-8">
              {sortedDates.map((date) => (
                <div key={date}>
                  {/* 日期标题 */}
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">{date}</span>
                  </div>
                  {/* 当日作品网格 */}
                  <div className="grid grid-cols-6 gap-3">
                    {groupedWorks[date].map((work) => (
                      <WorkCard
                        key={work.id}
                        work={work}
                        onDelete={handleDeleteWork}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="py-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">暂无作品</h3>
                <p className="text-sm text-gray-500 mb-4">开始生成你的第一个作品吧</p>
                <Button variant="primary" onClick={() => {}}>
                  去生成
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'templates' && (
        <div>
          {/* 模板类型切换 - 文字+下划线形式 */}
          <div className="flex items-center gap-8 mb-4 overflow-x-auto pb-2 border-b border-gray-200">
            <button
              onClick={() => setTemplateType('my')}
              className={`
                whitespace-nowrap text-sm transition-colors cursor-pointer relative flex-shrink-0
                ${templateType === 'my'
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              个人模板
              {templateType === 'my' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setTemplateType('favorite')}
              className={`
                whitespace-nowrap text-sm transition-colors cursor-pointer relative flex-shrink-0
                ${templateType === 'favorite'
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              收藏模板
              {templateType === 'favorite' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></span>
              )}
            </button>
          </div>

          {/* 模板列表 */}
          {templateType === 'my' ? (
            mockMyTemplates.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {mockMyTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onCollect={handleCollectTemplate}
                  />
                ))}
              </div>
            ) : (
              <Card className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">暂无个人模板</h3>
                  <p className="text-sm text-gray-500 mb-4">创建你的第一个模板吧</p>
                  <Button variant="primary" onClick={() => {}}>
                    去创建
                  </Button>
                </div>
              </Card>
            )
          ) : (
            mockFavoriteTemplates.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {mockFavoriteTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onCollect={handleCollectTemplate}
                  />
                ))}
              </div>
            ) : (
              <Card className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">暂无收藏模板</h3>
                  <p className="text-sm text-gray-500 mb-4">去模板库收藏喜欢的模板吧</p>
                  <Button variant="primary" onClick={() => {}}>
                    去模板库
                  </Button>
                </div>
              </Card>
            )
          )}
        </div>
      )}

      {activeTab === 'models' && (
        <div>
          {/* 模型类型切换 - 文字+下划线形式 */}
          <div className="flex items-center gap-8 mb-4 overflow-x-auto pb-2 border-b border-gray-200">
            <button
              onClick={() => setModelType('my')}
              className={`
                whitespace-nowrap text-sm transition-colors cursor-pointer relative flex-shrink-0
                ${modelType === 'my'
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              个人模型
              {modelType === 'my' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setModelType('favorite')}
              className={`
                whitespace-nowrap text-sm transition-colors cursor-pointer relative flex-shrink-0
                ${modelType === 'favorite'
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              收藏模型
              {modelType === 'favorite' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></span>
              )}
            </button>
          </div>

          {/* 模型列表 */}
          {modelType === 'my' ? (
            mockMyModels.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {mockMyModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    onDelete={handleDeleteModel}
                  />
                ))}
              </div>
            ) : (
              <Card className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cpu className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">暂无个人模型</h3>
                  <p className="text-sm text-gray-500 mb-4">训练你的第一个LoRA模型吧</p>
                  <Button variant="primary" onClick={() => {}}>
                    去训练
                  </Button>
                </div>
              </Card>
            )
          ) : (
            mockFavoriteModels.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {mockFavoriteModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    onDelete={handleDeleteModel}
                  />
                ))}
              </div>
            ) : (
              <Card className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">暂无收藏模型</h3>
                  <p className="text-sm text-gray-500 mb-4">去模型库收藏喜欢的模型吧</p>
                  <Button variant="primary" onClick={() => {}}>
                    去模型库
                  </Button>
                </div>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
