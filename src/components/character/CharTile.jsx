import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CharTile({ char, romaji, id, isLearned, isSelected, basePath, onClick }) {
  const navigate = useNavigate();

  function handleClick() {
    if (onClick) { onClick(id); return; }
    if (basePath) navigate(`${basePath}/${id}`);
  }

  const classes = [
    'char-tile',
    isLearned && 'char-tile--learned',
    isSelected && 'char-tile--selected',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} onClick={handleClick} aria-label={`${char} — ${romaji}`}>
      <span className="char-tile__kana">{char}</span>
      <span className="char-tile__romaji">{romaji}</span>
    </button>
  );
}

export function CharTileEmpty() {
  return <div className="char-tile char-tile--empty" aria-hidden="true" />;
}
