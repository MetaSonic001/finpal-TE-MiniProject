import { ReactNode } from 'react';

interface SparklesProps {
  children: ReactNode;
}

export const Sparkles = ({ children }: SparklesProps) => {
    return (
      <span className="relative inline-block">
        <span className="absolute inset-0 animate-sparkle">
          <span className="absolute h-1 w-1 bg-[#CCFF00] rounded-full" 
                style={{
                  top: "25%",
                  left: "0%",
                  animation: "sparkle 2s ease-in-out infinite"
                }} 
          />
          <span className="absolute h-1 w-1 bg-[#CCFF00] rounded-full"
                style={{
                  top: "50%",
                  right: "0%",
                  animation: "sparkle 2s ease-in-out infinite 0.5s"
                }}
          />
        </span>
        {children}
      </span>
    );
  };
  