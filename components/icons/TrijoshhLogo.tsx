
import React from 'react';

export const TrijoshhLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 250 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
    </defs>
    <path
      d="M25.5 0L9.5 22H21.5L12.5 40L30.5 18H19.5L25.5 0Z"
      fill="url(#logoGradient)"
    />
    <text
      x="40"
      y="30"
      fontFamily="sans-serif"
      fontSize="28"
      fontWeight="bold"
      fill="url(#logoGradient)"
      fontStyle="italic"
      letterSpacing="-1"
    >
      TRIJOSHH
    </text>
    <text
      x="228"
      y="12"
      fontFamily="sans-serif"
      fontSize="10"
      fontWeight="bold"
      fill="#f9fafb"
    >
      TM
    </text>
  </svg>
);