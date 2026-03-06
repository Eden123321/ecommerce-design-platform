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

// 补充图片列表
const supplementImages = [
  '/images/supplement/013b06e8ff8a4ec6fcb710aaaa63f512.jpg',
  '/images/supplement/0d7fcdf62179d83083049238a0aa56b2.jpg',
  '/images/supplement/122f28fa5c6127284ff8639a50dfa553.jpg',
  '/images/supplement/2029bc5434627f295be0b4daa1862a95.jpg',
  '/images/supplement/3ec05ab7ea68224cc6a60a3ddde2ef4e.jpg',
  '/images/supplement/4631c1b2b002c590600d04ef2a8924ea.jpg',
  '/images/supplement/4ce81da42c68ae7edd877ee2339e1174.jpg',
  '/images/supplement/5d68892f1210d957addb4b9518334c25.jpg',
  '/images/supplement/6bf5c2e122d8c0219eecefc552f4118a.jpg',
  '/images/supplement/74c6884f843a0bf6387174d68c8db5a7.jpg',
  '/images/supplement/7d01a2376d4d42ea9a366fb262bf7487.jpg',
  '/images/supplement/829c771da6b4dd9b0afd9687f3a93cc5.jpg',
  '/images/supplement/85f18059a8f7dbba8fbe48daac41c329.jpg',
  '/images/supplement/8611a1638fcbf5446e4d0e73b346ebcb.jpg',
  '/images/supplement/8774b97e7be0842ab0837d8f00375b91.jpg',
  '/images/supplement/941c5a98ba43d32fe55fd0d1f6ed68d2.jpg',
  '/images/supplement/96642bc7411aab825db95f36b7c972df.jpg',
  '/images/supplement/a0693c1611adc836b2abf673706462ea.jpg',
  '/images/supplement/a7fde9a4f4549166bc35943d024c46b7.jpg',
  '/images/supplement/aeda2c424ad2de563e27762af9131d26.jpg',
  '/images/supplement/b48dfa970388867e7b01faece1c153dd.jpg',
  '/images/supplement/b4b97b35d75b910c35e73cdeb7d18238.jpg',
  '/images/supplement/bc249fe642166636469d1c99e793a1eb.jpg',
  '/images/supplement/d1918fd2df939bc64cb2057374f56da2.jpg',
  '/images/supplement/e1d61571b2bf4bd5d3c1299a22abdae2.jpg',
  '/images/supplement/e7072680567dd5d139be6ad430b14da9.jpg',
  '/images/supplement/f1a58fe29f08efc196630b66a9874233.jpg',
  '/images/supplement/fb138a5751005621431af5c49ad36b44.jpg',
  '/images/supplement/fb262109e669eda058c19a2de76e2479.jpg',
];

// 模拟作品数据 - 包含日期
const mockWorks = [
  // 2026-03-05 今天
  {
    id: 1,
    name: '春季新品海报',
    image: supplementImages[0],
    createdAt: '2026-03-05',
  },
  {
    id: 2,
    name: '女神节活动页',
    image: supplementImages[1],
    createdAt: '2026-03-05',
  },
  {
    id: 3,
    name: '美妆直播封面',
    image: supplementImages[2],
    createdAt: '2026-03-05',
  },
  {
    id: 4,
    name: '女装主图',
    image: supplementImages[3],
    createdAt: '2026-03-05',
  },
  {
    id: 5,
    name: '数码测评封面',
    image: supplementImages[4],
    createdAt: '2026-03-05',
  },
  // 2026-03-04
  {
    id: 6,
    name: '限时特惠Banner',
    image: supplementImages[5],
    createdAt: '2026-03-04',
  },
  {
    id: 7,
    name: '家居好物推荐',
    image: supplementImages[6],
    createdAt: '2026-03-04',
  },
  {
    id: 8,
    name: '零食包装设计',
    image: supplementImages[7],
    createdAt: '2026-03-04',
  },
  // 2026-03-03
  {
    id: 9,
    name: '周末促销海报',
    image: supplementImages[8],
    createdAt: '2026-03-03',
  },
  {
    id: 10,
    name: '品牌故事封面',
    image: supplementImages[9],
    createdAt: '2026-03-03',
  },
  // 2026-03-02
  {
    id: 11,
    name: '会员专享Banner',
    image: supplementImages[10],
    createdAt: '2026-03-02',
  },
  {
    id: 12,
    name: '新品首发主图',
    image: supplementImages[11],
    createdAt: '2026-03-02',
  },
  // 2026-03-01
  {
    id: 13,
    name: '3月你好海报',
    image: supplementImages[12],
    createdAt: '2026-03-01',
  },
  {
    id: 14,
    name: '春装上市封面',
    image: supplementImages[13],
    createdAt: '2026-03-01',
  },
  // 2026-02-28
  {
    id: 15,
    name: '月末清仓Banner',
    image: supplementImages[14],
    createdAt: '2026-02-28',
  },
  {
    id: 16,
    name: '情人节活动页',
    image: supplementImages[15],
    createdAt: '2026-02-28',
  },
  // 2026-02-27
  {
    id: 17,
    name: '情侣装主图',
    image: supplementImages[16],
    createdAt: '2026-02-27',
  },
  {
    id: 18,
    name: '巧克力海报',
    image: supplementImages[17],
    createdAt: '2026-02-27',
  },
  // 2026-02-26
  {
    id: 19,
    name: '开学季封面',
    image: supplementImages[18],
    createdAt: '2026-02-26',
  },
  {
    id: 20,
    name: '文具主图',
    image: supplementImages[19],
    createdAt: '2026-02-26',
  },
  // 2026-02-25
  {
    id: 21,
    name: '早春穿搭Banner',
    image: supplementImages[20],
    createdAt: '2026-02-25',
  },
  {
    id: 22,
    name: '美妆教程封面',
    image: supplementImages[21],
    createdAt: '2026-02-25',
  },
  // 2026-02-24
  {
    id: 23,
    name: '健身达人海报',
    image: supplementImages[22],
    createdAt: '2026-02-24',
  },
  {
    id: 24,
    name: '运动装备主图',
    image: supplementImages[23],
    createdAt: '2026-02-24',
  },
  // 2026-02-23
  {
    id: 25,
    name: '元宵节活动',
    image: supplementImages[24],
    createdAt: '2026-02-23',
  },
  {
    id: 26,
    name: '汤圆海报',
    image: supplementImages[25],
    createdAt: '2026-02-23',
  },
  // 2026-02-22
  {
    id: 27,
    name: '龙抬头Banner',
    image: supplementImages[26],
    createdAt: '2026-02-22',
  },
  {
    id: 28,
    name: '二月二封面',
    image: supplementImages[27],
    createdAt: '2026-02-22',
  },
];

// 模拟个人模板数据
const mockMyTemplates = [
  {
    id: 1,
    name: '我的电商模板1',
    cover: supplementImages[0],
    type: 'banner',
  },
  {
    id: 2,
    name: '我的促销模板',
    cover: supplementImages[1],
    type: 'banner',
  },
];

// 模拟收藏的模板数据
const mockFavoriteTemplates = [
  {
    id: 1,
    name: '电商促销模板',
    cover: supplementImages[2],
    type: 'banner',
  },
  {
    id: 2,
    name: '社交媒体封面',
    cover: supplementImages[3],
    type: 'social',
  },
  {
    id: 3,
    name: '海报模板',
    cover: supplementImages[4],
    type: 'poster',
  },
];

// 模拟自己训练的模型数据
const mockMyModels = [
  {
    id: 1,
    name: '电商主图风格',
    type: 'lora',
    cover: supplementImages[5],
    baseModel: 'SDXL',
    trainedAt: '2024-01-15',
    status: 'completed',
  },
  {
    id: 2,
    name: '促销Banner风格',
    type: 'lora',
    cover: supplementImages[6],
    baseModel: 'Flux2-Kein',
    trainedAt: '2024-01-14',
    status: 'completed',
  },
  {
    id: 3,
    name: '高端品牌风格',
    type: 'lora',
    cover: supplementImages[7],
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
    cover: supplementImages[8],
    baseModel: 'SDXL',
    trainedAt: '2024-01-10',
    status: 'completed',
  },
  {
    id: 2,
    name: 'Flux清新风格',
    type: 'lora',
    cover: supplementImages[9],
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
