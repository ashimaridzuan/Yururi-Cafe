import React from 'react';

export default function Badge({ children, variant = 'learned', className = '' }) {
  return (
    <span className={`badge badge--${variant} ${className}`}>
      {children}
    </span>
  );
}
