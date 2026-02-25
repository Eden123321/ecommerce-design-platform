import React, { useState } from 'react';
import {
  Layout,
  FolderKanban,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Heart,
  Search,
} from 'lucide-react';

const Home = ({ onNavigate }) => {
  const [favorites] = useState([
    { id: 1, title: '春日促销 Banner', style: '扁平风格' },
  ]);

  const categories = [
    { id: 'ecommerce', name: '电商主图' },
    { id: 'social', name: '社交媒体' },
    { id: 'poster', name: '活动海报' },
    { id: 'logo', name: '品牌 Logo' },
  ];

  const categoryImages = {
    ecommerce: [
      { id: 1, title: '618大促主图' },
      { id: 2, title: '双11主视觉' },
      { id: 3, title: '新品首发' },
      { id: 4, title: '限时抢购' },
      { id: 5, title: '清仓特卖' },
      { id: 6, title: '品牌日活动' },
      { id: 7, title: '会员专享' },
      { id: 8, title: '节日专题' },
      { id: 9, title: '爆款推荐' },
      { id: 10, title: '新品预告' },
      { id: 11, title: '热销榜单' },
      { id: 12, title: '福利专区' },
    ],
    social: [
      { id: 1, title: '小红书封面' },
      { id: 2, title: '抖音视频封面' },
      { id: 3, title: '微博配图' },
      { id: 4, title: '微信朋友圈' },
      { id: 5, title: 'B站封面' },
      { id: 6, title: '快手封面' },
      { id: 7, title: '知乎封面' },
      { id: 8, title: '头条配图' },
      { id: 9, title: '小红书种草' },
      { id: 10, title: '抖音合集' },
      { id: 11, title: '微博话题' },
      { id: 12, title: '微信视频号' },
    ],
    poster: [
      { id: 1, title: '开业活动' },
      { id: 2, title: '节日促销' },
      { id: 3, title: '会员日' },
      { id: 4, title: '清仓特卖' },
      { id: 5, title: '新品发布' },
      { id: 6, title: '品牌宣传' },
      { id: 7, title: '抽奖活动' },
      { id: 8, title: '路演活动' },
      { id: 9, title: '商场活动' },
      { id: 10, title: '品牌联名' },
      { id: 11, title: '快闪店' },
      { id: 12, title: '展览展示' },
    ],
    logo: [
      { id: 1, title: '品牌标志' },
      { id: 2, title: 'VI 规范' },
      { id: 3, title: '图标设计' },
      { id: 4, title: '吉祥物' },
      { id: 5, title: '字体设计' },
      { id: 6, title: '色彩规范' },
      { id: 7, title: '包装设计' },
      { id: 8, title: '宣传物料' },
      { id: 9, title: '品牌升级' },
      { id: 10, title: 'IP设计' },
      { id: 11, title: '视觉系统' },
      { id: 12, title: '品牌手册' },
    ],
  };

  const [activeCategory, setActiveCategory] = useState('ecommerce');

  const recentProjects = [
    { id: 1, name: '618促销活动主图', status: '已完成', time: '2小时前', avatar: '6' },
    { id: 2, name: '新品上市Banner', status: '进行中', time: '5小时前', avatar: 'N' },
    { id: 3, name: '会员日活动页面', status: '已完成', time: '昨天', avatar: 'H' },
  ];

  const quickStats = [
    { label: '今日生成', value: '12', icon: Sparkles },
    { label: '项目总数', value: '48', icon: FolderKanban },
    { label: '模板使用', value: '156', icon: Layout },
    { label: '效率提升', value: '85%', icon: TrendingUp },
  ];

  const quickActions = [
    { key: 'design', label: 'AI 设计', icon: Sparkles, page: 'design-platform' },
    { key: 'projects', label: '我的项目', icon: FolderKanban, page: 'projects' },
    { key: 'templates', label: '模板库', icon: Layout, page: 'templates' },
    { key: 'datasets', label: '测评集', icon: Clock, page: 'datasets' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Hero Banner */}
      <div className="bg-gray-900 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              AI 智能设计，让创作更简单
            </div>
            <h1 className="text-3xl font-bold mb-2">释放创意，快速生成<br />专业级电商设计</h1>
            <p className="text-gray-400 mb-6">选择行业和风格，AI 立即为您生成高质量设计稿</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('design-platform')}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                开始创作
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 border border-white/30 rounded-lg font-medium hover:bg-white/10 transition-colors cursor-pointer">
                查看案例
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        {quickActions.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.page)}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <item.icon className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{item.label}</div>
              <div className="text-xs text-gray-500">点击进入</div>
            </div>
          </button>
        ))}
      </div>

      {/* 灵感广场 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">灵感广场</h2>
          {/* 搜索框 */}
          <div className="relative w-56">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索..."
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-6 gap-3">
          {categoryImages[activeCategory].map((img) => (
            <div
              key={img.id}
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group relative"
            >
              <div className="h-full bg-gray-200 flex items-center justify-center">
                <Layout className="w-6 h-6 text-gray-300" />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Favorites */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">收藏的设计</h3>
            <button className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">查看全部</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {favorites.map((item) => (
              <div key={item.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group relative">
                <div className="h-full bg-gray-200 flex items-center justify-center">
                  <Layout className="w-8 h-8 text-gray-300" />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
