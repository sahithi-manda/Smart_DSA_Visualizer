import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, interactive = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'rounded-xl border p-5 transition-all duration-200',
          interactive
            ? 'glass-panel-interactive cursor-pointer hover:-translate-y-0.5'
            : 'glass-panel',
          className
        )
      )}
    >
      {children}
    </div>
  );
};
