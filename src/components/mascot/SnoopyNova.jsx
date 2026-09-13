import React from 'react';
import { useAppContext } from '../../context/AppContext';

const MOODS = {
  neutral:  '🐾',
  happy:    '🐾',
  waving:   '🐾',
  thinking: '🐾',
};

export default function SnoopyNova({ message, mood, align = 'left' }) {
  const ctx = useAppContext();
  const displayMessage = message ?? ctx.mascotMessage;
  const displayMood = mood ?? ctx.mascotMood;

  return (
    <div className={`mascot${align === 'right' ? ' mascot--right' : ''} mascot--${displayMood}`}>
      <div className="mascot__figure" role="img" aria-label="Snoopy Nova mascot">
        {/* Snoopy Nova SVG character — simplified */}
        <svg viewBox="0 0 80 80" width="56" height="56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* Body */}
          <ellipse cx="40" cy="52" rx="20" ry="16" fill="#f5f0f0" />
          {/* Head */}
          <ellipse cx="40" cy="30" rx="18" ry="17" fill="#f5f0f0" />
          {/* Ears */}
          <ellipse cx="24" cy="22" rx="8" ry="13" fill="#c8a8b8" transform="rotate(-15 24 22)" />
          <ellipse cx="56" cy="22" rx="8" ry="13" fill="#c8a8b8" transform="rotate(15 56 22)" />
          {/* Eyes */}
          <circle cx="33" cy="27" r="3" fill="#3a3a4a" />
          <circle cx="47" cy="27" r="3" fill="#3a3a4a" />
          <circle cx="34" cy="26" r="1" fill="white" />
          <circle cx="48" cy="26" r="1" fill="white" />
          {/* Nose */}
          <ellipse cx="40" cy="33" rx="4" ry="3" fill="#9dc1c4" />
          {/* Smile */}
          <path d="M 33 38 Q 40 44 47 38" stroke="#715478" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Spots */}
          <circle cx="31" cy="35" r="3" fill="#d8bfc5" opacity="0.6" />
          <circle cx="49" cy="35" r="3" fill="#d8bfc5" opacity="0.6" />
          {/* Teacher glasses */}
          <rect x="27" y="23" width="11" height="8" rx="4" fill="none" stroke="#715478" strokeWidth="1.5" />
          <rect x="42" y="23" width="11" height="8" rx="4" fill="none" stroke="#715478" strokeWidth="1.5" />
          <line x1="38" y1="27" x2="42" y2="27" stroke="#715478" strokeWidth="1.5" />
          {/* Star badge */}
          <text x="55" y="60" fontSize="12" fill="#9dc1c4">⭐</text>
        </svg>
      </div>
      <div className="mascot__bubble">
        <div className="mascot__name">✨ Snoopy Nova</div>
        <p className="mascot__text">{displayMessage}</p>
      </div>
    </div>
  );
}
