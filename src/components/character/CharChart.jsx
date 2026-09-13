import React from 'react';
import CharTile, { CharTileEmpty } from './CharTile';
import { useProgress } from '../../hooks/useProgress';

export default function CharChart({ rows, module, basePath, practiceMode = false, onTileClick }) {
  const { isCharLearned } = useProgress();

  return (
    <div className={`char-chart${practiceMode ? ' char-chart--practice-mode' : ''}`}>
      <div className="char-chart__table">
        {rows.map((row) => (
          <div key={row.rowLabel} className="char-chart__row">
            <span className="char-chart__row-label">{row.rowLabel}</span>
            <div className="char-chart__grid">
              {row.chars.map((char, idx) =>
                char ? (
                  <CharTile
                    key={char.id}
                    {...char}
                    isLearned={isCharLearned(module, char.id)}
                    basePath={basePath}
                    onClick={onTileClick}
                  />
                ) : (
                  <CharTileEmpty key={`empty-${row.rowLabel}-${idx}`} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
