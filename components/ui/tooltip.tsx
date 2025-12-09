"use client";

import * as React from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  disabled?: boolean;
}

export function Tooltip({ children, content, disabled = false }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsVisible(true);
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  React.useEffect(() => {
    if (isVisible) {
      window.addEventListener('scroll', handleMouseLeave, true);
      window.addEventListener('resize', handleMouseLeave);
      return () => {
        window.removeEventListener('scroll', handleMouseLeave, true);
        window.removeEventListener('resize', handleMouseLeave);
      };
    }
  }, [isVisible]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex"
      >
        {children}
      </div>
      {isVisible && !disabled && (
        <div
          className="fixed z-50 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none whitespace-nowrap transform -translate-x-1/2 -translate-y-full"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {content}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      )}
    </>
  );
}
