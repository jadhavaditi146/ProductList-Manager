// src/components/LogoModern.jsx
import React from "react";

/**
 * Modern compact logo symbol for Listings Manager
 *
 * Props:
 *  - size: number (px) for the icon size (default 40)
 *  - showText: boolean - whether to show "Listings Manager" text beside icon (default true)
 *  - className: additional className for container
 */
export default function LogoModern({ size = 40, showText = true, className = "" }) {
  const s = Math.max(24, size);
  
  const textStyle = {
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    fontWeight: 700,
    fontSize: Math.round(s * 0.55),
    letterSpacing: "-0.03em",
    color: "#dc2626", // red-600
    lineHeight: 1.2,
  };

  const subTextStyle = {
    fontWeight: 500,
    fontSize: Math.round(s * 0.32),
    color: "#ef4444", // red-500
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={s}
        height={s}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="8"
          fill="url(#redGrad)"
        />

        {/* White list icon */}
        <g transform="translate(10, 10)">
          {/* List item 1 */}
          <circle cx="2" cy="3" r="1.5" fill="#fff" />
          <rect x="6" y="2" width="12" height="2" rx="1" fill="#fff" opacity="0.9" />
          
          {/* List item 2 */}
          <circle cx="2" cy="10" r="1.5" fill="#fff" />
          <rect x="6" y="9" width="9" height="2" rx="1" fill="#fff" opacity="0.9" />
          
          {/* List item 3 */}
          <circle cx="2" cy="17" r="1.5" fill="#fff" />
          <rect x="6" y="16" width="10" height="2" rx="1" fill="#fff" opacity="0.9" />
        </g>
      </svg>

      {showText && (
        <div>
          <div style={textStyle}>Listings</div>
          <div style={subTextStyle}>Manager</div>
        </div>
      )}
    </div>
  );
}