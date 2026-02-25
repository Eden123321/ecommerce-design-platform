import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, activePage, onNavigate, title, rightContent }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} rightContent={rightContent} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
