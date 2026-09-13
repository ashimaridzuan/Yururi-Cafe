import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import CharChart from '../components/character/CharChart';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import SnoopyNova from '../components/mascot/SnoopyNova';
import { katakanaRows, katakanaDakuten, katakanaFlat } from '../data/katakana';

export default function Katakana() {
  const { setMascotMessage } = useAppContext();
  const { getModulePercent } = useProgress();
  const [practiceMode, setPracticeMode] = useState(false);
  const [showDakuten, setShowDakuten] = useState(true);

  const percent = getModulePercent('katakana', katakanaFlat.length);

  useEffect(() => {
    setMascotMessage(
      'カタカナ (Katakana) is used for foreign words, names, and emphasis. Once you know hiragana, katakana is much easier! 💪',
      'happy'
    );
  }, []);

  return (
    <>
      <div className="page-banner page-banner--katakana">
        <div className="page-banner__inner">
          <div className="kana-page__header">
            <div>
              <div className="kana-page__title" style={{ color: '#715478' }}>カタカナ</div>
              <h1 className="kana-page__title-en">Katakana</h1>
              <p style={{ color: '#7a7a8a', marginTop: '0.5rem' }}>
                Used for foreign words, loanwords, and names
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
              <Button variant="primary" size="sm" to={`/quiz/katakana`}>Quiz →</Button>
            </div>
          </div>
          <div className="kana-page__progress">
            <ProgressBar
              percent={percent}
              label={`${Math.round((percent / 100) * katakanaFlat.length)} / ${katakanaFlat.length} characters learned`}
            />
          </div>
        </div>
      </div>

      <div className="kana-page">
        <div className="kana-page__inner">
          <SnoopyNova />
          <div style={{ marginTop: '2rem' }}>
            <div className="kana-page__group">
              <div className="kana-page__section-label">Basic Characters</div>
              <CharChart rows={katakanaRows} module="katakana" basePath="/katakana" practiceMode={practiceMode} />
            </div>
            <div className="kana-page__group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div className="kana-page__section-label" style={{ marginBottom: 0 }}>Voiced & Semi-voiced</div>
                <button className="btn btn--ghost btn--sm" onClick={() => setShowDakuten((v) => !v)}>
                  {showDakuten ? '▲ Hide' : '▼ Show'}
                </button>
              </div>
              {showDakuten && (
                <CharChart rows={katakanaDakuten} module="katakana" basePath="/katakana" practiceMode={practiceMode} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
