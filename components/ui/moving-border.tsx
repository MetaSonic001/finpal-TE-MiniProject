import React, { ReactNode } from 'react';

interface MovingBorderProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export const MovingBorder = ({ children, duration = 2000, className }: MovingBorderProps) => {
    return (
      <div 
        className={`relative rounded-xl overflow-hidden ${className}`}
        style={{
          "--border-duration": `${duration}ms`
        } as React.CSSProperties}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#CCFF00] via-transparent to-[#CCFF00] animate-border-move" />
        <div className="relative bg-black m-[2px] rounded-xl overflow-hidden">
          {children}
        </div>
      </div>
    );
  };
  