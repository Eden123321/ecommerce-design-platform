import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = true,
  ...props
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200
        ${padding ? 'p-4' : ''}
        ${hover ? 'hover:border-primary-300 hover:shadow-md transition-all duration-200' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between pb-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card;
