import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  FolderKanban,
  FileText,
  Database,
  Cpu,
  Palette,
  Sparkles,
  User,
  HelpCircle,
  Languages,
  LogOut,
  ChevronDown
} from 'lucide-react';

const menuGroups = [
  {
    title: '常用',
    items: [
      { id: 'home', label: '首页', icon: Home },
      { id: 'projects', label: '项目', icon: FolderKanban },
      { id: 'templates', label: '模板', icon: FileText },
    ]
  },
  {
    title: 'AI 设计',
    items: [
      { id: 'design-platform', label: 'AI 设计', icon: Sparkles },
    ]
  },
  {
    title: '工具',
    items: [
      { id: 'models', label: '模型训练', icon: Cpu },
      { id: 'batch-production', label: '批量任务', icon: Database },
    ]
  }
];

const Sidebar = ({ activePage, onNavigate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: HelpCircle, label: '帮助中心', action: () => console.log('帮助中心') },
    { icon: Languages, label: '语言切换', action: () => console.log('语言切换') },
    { icon: LogOut, label: '退出登录', action: () => console.log('退出登录'), danger: true },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">设计平台</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-thin">
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <div className="px-3 mb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              {group.title}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id || (item.id === 'design-platform' && activePage === 'design-platform');
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* 个人中心 */}
        <div>
          <div className="px-3 mb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            个人中心
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
              activePage === 'profile'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">个人中心</span>
          </button>
        </div>
      </nav>

      {/* 用户信息区域 */}
      <div className="p-3 border-t border-gray-100" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-600">张</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">张三</div>
              <div className="text-xs text-gray-500">个人版</div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* 弹出菜单 */}
          {showMenu && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-fade-in-up">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { item.action(); setShowMenu(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors cursor-pointer ${
                    item.danger
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
