import React from 'react';

const Header = ({ title, leftContent, rightContent }) => {
  // 如果有左侧内容，标题居中；否则标题靠左
  const titleClass = leftContent
    ? 'flex-1 text-xl font-semibold text-gray-900 text-center'
    : 'flex-1 text-xl font-semibold text-gray-900';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
      {/* 左侧内容（返回按钮等） */}
      {leftContent && <div className="flex-shrink-0">{leftContent}</div>}
      {/* 页面标题 */}
      <h1 className={titleClass}>{title}</h1>
      {/* 右侧内容 */}
      <div className="flex-shrink-0">{rightContent}</div>
    </header>
  );
};

export default Header;
