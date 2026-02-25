import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={`
            w-full px-3 py-2.5
            border border-gray-300 rounded-lg
            text-sm text-gray-900 placeholder-gray-400
            outline-none
            transition-all duration-200
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'focus:border-primary-500 focus:ring-2 focus:ring-primary-100'}
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
      {helper && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
