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
  Download,
  Plus,
} from 'lucide-react';

const Home = ({ onNavigate }) => {
  const categories = [
    { id: 'ecommerce', name: '电商主图' },
    { id: 'social', name: '社交媒体' },
    { id: 'poster', name: '活动海报' },
    { id: 'logo', name: '品牌 Logo' },
  ];

  const categoryImages = {
    ecommerce: [
      // 本地电商产品主图
      { id: 1, title: '电商主图1', image: '/images/ecommerce/c0d3059e7b17365dc32c50a031d62e3f.jpg' },
      { id: 2, title: '电商主图2', image: '/images/ecommerce/cce4010d4fc5718774e5a0a2b1c5722c.jpg' },
      { id: 3, title: '电商主图3', image: '/images/ecommerce/5e4fdfb5022fdff2a6e9dd57ca499d3c.jpg' },
      { id: 4, title: '电商主图4', image: '/images/ecommerce/5edac3fd0c18f0a51280b1dffc9d1f68.jpg' },
      { id: 5, title: '电商主图5', image: '/images/ecommerce/aaa073a507498a4756144d943e0e00eb.jpg' },
      { id: 6, title: '电商主图6', image: '/images/ecommerce/2d0de4aa1a8bf75963222219ba821b39.jpg' },
      { id: 7, title: '电商主图7', image: '/images/ecommerce/f08bf37057d99b6fcce1aff99d9f6ce0.jpg' },
      { id: 8, title: '电商主图8', image: '/images/ecommerce/412c9be389f4fd6243e8a74826633956.jpg' },
      { id: 9, title: '电商主图9', image: '/images/ecommerce/b2508687c5cd3e89df932b331c22358b.jpg' },
      { id: 10, title: '电商主图10', image: '/images/ecommerce/d41a1973c80326b230266d549687436a.jpg' },
      { id: 11, title: '电商主图11', image: '/images/ecommerce/3b0d5bc0df4281a8297faf6fff2760bb.jpg' },
      { id: 12, title: '电商主图12', image: '/images/ecommerce/c5d071cc1977cd59a1b8b51242495c53.jpg' },
      { id: 13, title: '电商主图13', image: '/images/ecommerce/356ba44a0aad3478ed13034341e363d0.jpg' },
      { id: 14, title: '电商主图14', image: '/images/ecommerce/40bfe0c29e0d59ab1c4f5fb03f8d45a9.jpg' },
      { id: 15, title: '电商主图15', image: '/images/ecommerce/c98858e7b7b3c126f1dfea8c5adf1410.jpg' },
      { id: 16, title: '电商主图16', image: '/images/ecommerce/e36a623da0a5676db65b8524b6790eb6.jpg' },
      { id: 17, title: '电商主图17', image: '/images/ecommerce/bcae817b8678d3ea39f689ce0bfe9755.jpg' },
      { id: 18, title: '电商主图18', image: '/images/ecommerce/a8adcd43bc28e26508ba9741177e791b.jpg' },
      { id: 19, title: '电商主图19', image: '/images/ecommerce/3066480e150e254b7a072774d1092117.jpg' },
      { id: 20, title: '电商主图20', image: '/images/ecommerce/19b1873b618e7029408b7078ae6d867a.jpg' },
      { id: 21, title: '电商主图21', image: '/images/ecommerce/86f6021b469d0913206537c068a167aa.jpg' },
      { id: 22, title: '电商主图22', image: '/images/ecommerce/42e945e92bc9df8ba1a2fbc1cf66514a.jpg' },
      { id: 23, title: '电商主图23', image: '/images/ecommerce/1673c6f50f85129c8222187d7e643d91.jpg' },
      { id: 24, title: '电商主图24', image: '/images/ecommerce/27dac6614f4db4a884cc9d811676a9da.jpg' },
      { id: 25, title: '电商主图25', image: '/images/ecommerce/7d01a2376d4d42ea9a366fb262bf7487.jpg' },
      { id: 26, title: '电商主图26', image: '/images/ecommerce/e703e77461c7bc24ebce5b6ee8322366.jpg' },
      { id: 27, title: '电商主图27', image: '/images/ecommerce/db569712b5cc62a8868917836afba837.jpg' },
      { id: 28, title: '电商主图28', image: '/images/ecommerce/76081772fe50d4400079f7f47388b176.jpg' },
      { id: 29, title: '电商主图29', image: '/images/ecommerce/b11c69baae583d32d704cec6289f3742.jpg' },
      { id: 30, title: '电商主图30', image: '/images/ecommerce/1673c6f50f85129c8222187d7e643d91.jpg' },
    ],
    social: [
      // 本地社交媒体封面图
      { id: 1, title: '社交封面1', image: '/images/social/08511dbe04d8625318e33d2c8dbe8dde.jpg' },
      { id: 2, title: '社交封面2', image: '/images/social/0e005099a0756faf8adc1162816e5165.jpg' },
      { id: 3, title: '社交封面3', image: '/images/social/2018ec08b3e5bb1f276d8ceca217b10e.jpg' },
      { id: 4, title: '社交封面4', image: '/images/social/3bd125c5e7f284f1d78614e40826d685.jpg' },
      { id: 5, title: '社交封面5', image: '/images/social/3be78ddf4124b4cc21830f0dce67e43c.jpg' },
      { id: 6, title: '社交封面6', image: '/images/social/3e6574cf392214cd2e7c79cd9cffbc6d.jpg' },
      { id: 7, title: '社交封面7', image: '/images/social/3ec05ab7ea68224cc6a60a3ddde2ef4e.jpg' },
      { id: 8, title: '社交封面8', image: '/images/social/4200eeca8bfff5f4d4575b6053f83c23.jpg' },
      { id: 9, title: '社交封面9', image: '/images/social/477c0c74adb61f8fb53f32079e2d17e4.jpg' },
      { id: 10, title: '社交封面10', image: '/images/social/4963af0dd7101b1a386e5a47d252c8e0.jpg' },
      { id: 11, title: '社交封面11', image: '/images/social/4e1e310d8e13191e34e9a0c29f2dedea.jpg' },
      { id: 12, title: '社交封面12', image: '/images/social/545de7b27f68a228b649cd0b413c21c0.jpg' },
      { id: 13, title: '社交封面13', image: '/images/social/597e2619451b83e632eacc356a03f93b.jpg' },
      { id: 14, title: '社交封面14', image: '/images/social/5ffc47b6d7570867049c88f7f4c34525.jpg' },
      { id: 15, title: '社交封面15', image: '/images/social/653fc5564aed0bdbe3e08c9c3bb6bf3d.jpg' },
      { id: 16, title: '社交封面16', image: '/images/social/66ae795687ea34c28a1203f61d65873a.jpg' },
      { id: 17, title: '社交封面17', image: '/images/social/7118d088f476e7bd67366bd57d72d4db.jpg' },
      { id: 18, title: '社交封面18', image: '/images/social/824234fb43b22267242f5753cfdf7e1e.jpg' },
      { id: 19, title: '社交封面19', image: '/images/social/830d48ffdeb578be9158ead659bc0f66.jpg' },
      { id: 20, title: '社交封面20', image: '/images/social/919cca45fd3bc9eb9ebc0caad8dd8427.jpg' },
      { id: 21, title: '社交封面21', image: '/images/social/b28771aab3d8b65f5a2df6007aa3c46d.jpg' },
      { id: 22, title: '社交封面22', image: '/images/social/bea6185133a904ab52fef8b57f757dfe.jpg' },
      { id: 23, title: '社交封面23', image: '/images/social/c8970d6f64b95811c46bb9cc80c5f30f.jpg' },
      { id: 24, title: '社交封面24', image: '/images/social/ddfdce443f0f75cdd430a6db2f8e252a.jpg' },
      { id: 25, title: '社交封面25', image: '/images/social/e61ff1875e055f85dd886b87887d4ee0.jpg' },
      { id: 26, title: '社交封面26', image: '/images/social/f237242c361b84401277585efd38c310.jpg' },
      { id: 27, title: '社交封面27', image: '/images/social/f3bb2c5ba076c6d35e64f98ad26ba30e.jpg' },
      { id: 28, title: '社交封面28', image: '/images/social/08511dbe04d8625318e33d2c8dbe8dde.jpg' },
    ],
    poster: [
      // 本地电商活动海报
      { id: 1, title: '活动海报1', image: '/images/poster/011b5f3784d199928f8506a31e4e6506.jpg' },
      { id: 2, title: '活动海报2', image: '/images/poster/19aa5e43c56642bedfb819bd5a8d6b33.jpg' },
      { id: 3, title: '活动海报3', image: '/images/poster/2518c9f0d578f055d4cfda2489ac1bb8.jpg' },
      { id: 4, title: '活动海报4', image: '/images/poster/2b9cf0bc7e51ff4071360284982129b5.jpg' },
      { id: 5, title: '活动海报5', image: '/images/poster/39848c8e726c3e8736d30b60d26d9913.jpg' },
      { id: 6, title: '活动海报6', image: '/images/poster/54b5db689d637bcba2a0ed3bd8d719e0.jpg' },
      { id: 7, title: '活动海报7', image: '/images/poster/619f844768cafe1e109b621d309c8508.jpg' },
      { id: 8, title: '活动海报8', image: '/images/poster/6808fa8f79fdf9aa4e9d08095faa7caa.jpg' },
      { id: 9, title: '活动海报9', image: '/images/poster/6cab209d5e09d8472b21a5314f26825d.jpg' },
      { id: 10, title: '活动海报10', image: '/images/poster/7d879ce5113daca9df66a61769d4b894.jpg' },
      { id: 11, title: '活动海报11', image: '/images/poster/819538b87ca816213f294d8ab712cd17.jpg' },
      { id: 12, title: '活动海报12', image: '/images/poster/8859307a6287009a268a049808f11a3f.jpg' },
      { id: 13, title: '活动海报13', image: '/images/poster/8d6d022eed4c373bad513692c9a146c1.jpg' },
      { id: 14, title: '活动海报14', image: '/images/poster/90adee293db30c0dafe9c75d7797c7d4.jpg' },
      { id: 15, title: '活动海报15', image: '/images/poster/a6fa0379a49dce54349054fa41a2f61b.jpg' },
      { id: 16, title: '活动海报16', image: '/images/poster/a788c2ff10a05bff34222c76c7e1f7a0.jpg' },
      { id: 17, title: '活动海报17', image: '/images/poster/ab74aa329bf8a69e73338d7eec32093e.jpg' },
      { id: 18, title: '活动海报18', image: '/images/poster/c38ebdfb592368b57b6e2b569a009fa5.jpg' },
      { id: 19, title: '活动海报19', image: '/images/poster/da099381756a15e59e304c3eabe0baa8.jpg' },
      { id: 20, title: '活动海报20', image: '/images/poster/ffacb2a1754e5ffbab18f499cb2394fd.jpg' },
    ],
    logo: [
      { id: 1, title: '品牌标志', image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=400&fit=crop' },
      { id: 2, title: 'VI 规范', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=267&fit=crop' },
      { id: 3, title: '图标设计', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=533&fit=crop' },
      { id: 4, title: '吉祥物', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop' },
      { id: 5, title: '字体设计', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
      { id: 6, title: '色彩规范', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=267&fit=crop' },
      { id: 7, title: '包装设计', image: 'https://images.unsplash.com/photo-1632514772516-d2839313c4b8?w=400&h=533&fit=crop' },
      { id: 8, title: '宣传物料', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop' },
      { id: 9, title: '品牌升级', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop' },
      { id: 10, title: 'IP设计', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=267&fit=crop' },
      { id: 11, title: '视觉系统', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=533&fit=crop' },
      { id: 12, title: '品牌手册', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=400&fit=crop' },
      { id: 13, title: '企业Logo', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=300&fit=crop' },
      { id: 14, title: '餐饮品牌', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=267&fit=crop' },
      { id: 15, title: '教育品牌', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=533&fit=crop' },
      { id: 16, title: '科技品牌', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop' },
      { id: 17, title: '时尚品牌', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
      { id: 18, title: '运动品牌', image: 'https://images.unsplash.com/photo-1461896836934-5dcca04cec30?w=400&h=267&fit=crop' },
      { id: 19, title: '医疗品牌', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=533&fit=crop' },
      { id: 20, title: '金融品牌', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop' },
      { id: 21, title: '地产品牌', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop' },
      { id: 22, title: '旅游品牌', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&h=267&fit=crop' },
      { id: 23, title: '娱乐品牌', image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=400&h=533&fit=crop' },
      { id: 24, title: '公益品牌', image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b84b?w=400&h=400&fit=crop' },
    ],
  };

  const [activeCategory, setActiveCategory] = useState('ecommerce');
  const [favorites, setFavorites] = useState({}); // 存储收藏状态

  // 切换收藏状态
  const toggleFavorite = (imgId) => {
    setFavorites(prev => ({
      ...prev,
      [imgId]: !prev[imgId]
    }));
  };

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

        {/* Image Grid - True Waterfall/Masonry Layout */}
        <div className="flex gap-3">
          {(() => {
            const cols = [[], [], [], []];
            const colHeights = [0, 0, 0, 0];

            // 根据分类使用不同的宽高比模式
            // 宽高比 (高度/宽度): 16:9(0.56), 9:16(1.78), 4:3(0.75), 3:4(1.33), 1:1(1.0), 21:9(0.43)
            let aspectRatios;
            if (activeCategory === 'social') {
              // 社交媒体：主要是竖版图片 (小红书、抖音等)
              aspectRatios = [
                1.78,  // 9:16 竖版 - 最常见
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.0,   // 1:1 方形
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.0,   // 1:1 方形
                1.33,  // 3:4 竖版
              ];
            } else if (activeCategory === 'ecommerce') {
              // 电商主图：主要是竖版（适应手机端展示）
              aspectRatios = [
                1.78,  // 9:16 竖版
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.0,   // 1:1 方形
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.0,   // 1:1 方形
                1.33,  // 3:4 竖版
              ];
            } else if (activeCategory === 'poster') {
              // 活动海报：竖版为主（适应手机端展示）
              aspectRatios = [
                1.78,  // 9:16 竖版
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.0,   // 1:1 方形
                1.78,  // 9:16 竖版
                1.33,  // 3:4 竖版
                1.78,  // 9:16 竖版
                1.0,   // 1:1 方形
                1.33,  // 3:4 竖版
              ];
            } else {
              // Logo：方形为主
              aspectRatios = [
                1.0,   // 1:1 方形
                1.0,   // 1:1 方形
                1.33,  // 3:4 竖版
                1.0,   // 1:1 方形
                0.75,  // 4:3 横版
                1.0,   // 1:1 方形
                1.33,  // 3:4 竖版
                1.0,   // 1:1 方形
                0.75,  // 4:3 横版
                1.0,   // 1:1 方形
                1.33,  // 3:4 竖版
                1.0,   // 1:1 方形
              ];
            }
            const columnWidth = 320; // 估算列宽度

            categoryImages[activeCategory].forEach((img, idx) => {
              const shortestCol = colHeights.indexOf(Math.min(...colHeights));
              const aspectRatio = aspectRatios[idx % aspectRatios.length];
              const height = Math.round(columnWidth * aspectRatio);
              cols[shortestCol].push({ ...img, height });
              colHeights[shortestCol] += height;
            });

            return cols.map((col, colIndex) => (
              <div key={colIndex} className="flex-1 flex flex-col gap-3">
                {col.map((img) => (
                  <div
                    key={img.id}
                    className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer group relative"
                    style={{ height: img.height }}
                  >
                    {img.image ? (
                      <img
                        src={img.image}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gray-200 flex items-center justify-center">
                        <Layout className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                    {/* Hover Overlay with Buttons */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Top Right: Download & Favorite */}
                      <div className="absolute top-2 right-2 flex gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // 下载功能
                            const link = document.createElement('a');
                            link.href = img.image;
                            link.download = img.title || 'image';
                            link.target = '_blank';
                            link.click();
                          }}
                          className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                          title="下载"
                        >
                          <Download className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(img.id);
                          }}
                          className="w-8 h-8 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                          title="收藏"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              favorites[img.id] ? 'text-red-500 fill-red-500' : 'text-gray-700'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Bottom: 一键同款 */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // 跳转到 AI 设计页面
                            onNavigate('design-platform');
                          }}
                          className="w-full py-2.5 bg-white/90 hover:bg-white text-gray-800 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          一键同款
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ));
          })()}
        </div>
      </div>

    </div>
  );
};

export default Home;
