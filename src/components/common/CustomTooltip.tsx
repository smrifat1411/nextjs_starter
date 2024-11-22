import React, { useState } from "react";

const CustomTooltip: React.FC<{
  content: React.ReactNode;
  children: React.ReactNode;
}> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)} // Show tooltip on hover
      onMouseLeave={() => setIsVisible(false)} // Hide tooltip when not hovering
    >
      {/* Tooltip Trigger */}
      {children}

      {/* Tooltip Content */}
      {isVisible && (
        <div className="absolute top-full left-1/2 z-10 mb-2 w-max -translate-x-1/2 rounded-md bg-white p-2 text-gray-800 shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
