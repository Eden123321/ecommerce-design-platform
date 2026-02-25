import React from 'react';

const Header = ({ title, rightContent }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
      {/* 页面标题 */}
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      {/* 右侧内容 */}
      {rightContent && <div className="ml-auto">{rightContent}</div>}
    </header>
  );
};

export default Header;
