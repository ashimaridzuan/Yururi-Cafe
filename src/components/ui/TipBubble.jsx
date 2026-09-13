import React from 'react';

const VARIANT_META = {
  info:    { icon: 'ℹ️', label: 'Info' },
  hint:    { icon: '💡', label: "Snoopy's Tip" },
  success: { icon: '✅', label: 'Well done!' },
  warning: { icon: '⚠️', label: 'Watch out!' },
};

export default function TipBubble({ variant = 'hint', label, children }) {
  const meta = VARIANT_META[variant] ?? VARIANT_META.hint;
  return (
    <div className={`tip-bubble tip-bubble--${variant}`}>
      <span className="tip-bubble__icon" aria-hidden="true">{meta.icon}</span>
      <div className="tip-bubble__content">
        <span className="tip-bubble__label">{label ?? meta.label}</span>
        <p className="tip-bubble__text">{children}</p>
      </div>
    </div>
  );
}
