import React from 'react';

export default function ProgressBar({ percent = 0, label = '', compact = false }) {
  return (
    <div className={`progress-bar${compact ? ' progress-bar--compact' : ''}`}>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${Math.min(percent, 100)}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {!compact && (
        <div className="progress-bar__meta">
          <span className="progress-bar__label">{label}</span>
          <span className="progress-bar__percent">{percent}%</span>
        </div>
      )}
    </div>
  );
}
