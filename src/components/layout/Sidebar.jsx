import React from 'react';
import {
  Home,
  FolderKanban,
  FileText,
  Database,
  Cpu,
  List,
  Settings,
  Palette,
  Sparkles
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
      { id: 'batch-production', label: '批量生产', icon: Database },
    ]
  },
  {
    title: '系统',
    items: [
      { id: 'logs', label: '日志', icon: List },
      { id: 'settings', label: '设置', icon: Settings },
    ]
  }
];

const Sidebar = ({ activePage, onNavigate }) => {
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
      </nav>
    </aside>
  );
};

export default Sidebar;
