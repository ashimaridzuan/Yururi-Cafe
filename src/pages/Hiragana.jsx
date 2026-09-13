import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import CharChart from '../components/character/CharChart';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import SnoopyNova from '../components/mascot/SnoopyNova';
import { hiraganaRows, hiraganaDakuten, hiraganaCombo, hiraganaFlat } from '../data/hiragana';

export default function Hiragana() {
  const { setMascotMessage } = useAppContext();
  const { getModulePercent } = useProgress();
  const [practiceMode, setPracticeMode] = useState(false);
  const [showDakuten, setShowDakuten] = useState(true);
  const [showCombo, setShowCombo] = useState(false);

  const percent = getModulePercent('hiragana', hiraganaFlat.length);

  useEffect(() => {
    setMascotMessage(
      'ひらがな (Hiragana) is the first script to learn! It covers all Japanese sounds. Click a character to learn more about it! 🌸',
      'happy'
    );
  }, []);

  const comboRows = [];
  for (let i = 0; i < hiraganaCombo.length; i += 3) {
    comboRows.push({
      rowLabel: hiraganaCombo[i].romaji.slice(0, -1) + '行',
      chars: hiraganaCombo.slice(i, i + 3),
    });
  }

  return (
    <>
      <div className="page-banner page-banner--hiragana">
        <div className="page-banner__inner">
          <div className="kana-page__header">
            <div>
              <div className="kana-page__title">ひらがな</div>
              <h1 className="kana-page__title-en">Hiragana</h1>
              <p style={{ color: '#7a7a8a', marginTop: '0.5rem' }}>
                46 basic characters that form the backbone of Japanese
              </p>
            </div>
            <div className="kana-page__controls">
              <Button
                variant={practiceMode ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setPracticeMode((p) => !p)}
              >
                {practiceMode ? '👁 Show Romaji' : '🎯 Practice Mode'}
              </Button>
              <Button variant="primary" size="sm" to={`/quiz/hiragana`}>
                Quiz →
              </Button>
            </div>
          </div>
          <div className="kana-page__progress">
            <ProgressBar
              percent={percent}
              label={`${Math.round((percent / 100) * hiraganaFlat.length)} / ${hiraganaFlat.length} characters learned`}
            />
          </div>
        </div>
      </div>

      <div className="kana-page">
        <div className="kana-page__inner">
          <SnoopyNova />

          <div style={{ marginTop: '2rem' }}>
            {/* Basic rows */}
            <div className="kana-page__group">
              <div className="kana-page__section-label">Basic Characters (清音)</div>
              <CharChart
                rows={hiraganaRows}
                module="hiragana"
                basePath="/hiragana"
                practiceMode={practiceMode}
              />
            </div>

            {/* Dakuten */}
            <div className="kana-page__group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div className="kana-page__section-label" style={{ marginBottom: 0 }}>Voiced & Semi-voiced (濁音・半濁音)</div>
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={() => setShowDakuten((v) => !v)}
                >
                  {showDakuten ? '▲ Hide' : '▼ Show'}
                </button>
              </div>
              {showDakuten && (
                <CharChart
                  rows={hiraganaDakuten}
                  module="hiragana"
                  basePath="/hiragana"
                  practiceMode={practiceMode}
                />
              )}
            </div>

            {/* Combo */}
            <div className="kana-page__group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div className="kana-page__section-label" style={{ marginBottom: 0 }}>Combination Characters (拗音)</div>
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={() => setShowCombo((v) => !v)}
                >
                  {showCombo ? '▲ Hide' : '▼ Show'}
                </button>
              </div>
              {showCombo && (
                <CharChart
                  rows={comboRows}
                  module="hiragana"
                  basePath="/hiragana"
                  practiceMode={practiceMode}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
