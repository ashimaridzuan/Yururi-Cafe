import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SnoopyNova from '../components/mascot/SnoopyNova';
import { grammarPatterns } from '../data/grammar';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'particles', label: 'Particles' },
  { id: 'verb-conjugation', label: 'Verb Forms' },
  { id: 'sentence-patterns', label: 'Sentence Patterns' },
];

export default function Grammar() {
  const { setMascotMessage } = useAppContext();
  const { isGrammarLearned, markGrammarLearned } = useProgress();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setMascotMessage(
      'ぶんぽう (Grammar) might sound scary, but Japanese grammar is actually very logical! Start with particles — they\'re the key to everything! ✏️',
      'thinking'
    );
  }, []);

  const filtered = filter === 'all'
    ? grammarPatterns
    : grammarPatterns.filter((p) => p.category === filter);

  return (
    <>
      <div className="page-banner page-banner--grammar">
        <div className="page-banner__inner">
          <h1 style={{ fontFamily: 'Zen Maru Gothic, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            ✏️ ぶんぽう — Grammar
          </h1>
          <p style={{ color: '#7a7a8a', marginTop: '0.5rem', fontSize: '1.1rem' }}>
            10 core patterns from particles to verb conjugation
          </p>
        </div>
      </div>

      <div className="grammar-page">
        <div className="grammar-page__inner">
          <SnoopyNova />

          <div className="grammar-page__filters" style={{ marginTop: '2rem' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`grammar-page__filter-btn${filter === cat.id ? ' grammar-page__filter-btn--active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grammar-page__list">
            {filtered.map((pattern) => {
              const learned = isGrammarLearned(pattern.id);
              return (
                <div key={pattern.id} className={`grammar-card grammar-card--${pattern.level}`}>
                  <div className="grammar-card__header">
                    <div className="grammar-card__pattern">{pattern.pattern}</div>
                    <div className="grammar-card__meta">
                      <div className="grammar-card__label">{pattern.label}</div>
                      <div className="grammar-card__reading">Reading: {pattern.reading}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <Badge variant={pattern.level}>{pattern.level}</Badge>
                      {learned && <Badge variant="learned">✓ Learned</Badge>}
                    </div>
                  </div>

                  <div className="grammar-card__body">
                    <div className="grammar-card__structure">{pattern.structure}</div>
                    <p className="grammar-card__meaning">{pattern.meaning}</p>

                    <div className="grammar-card__examples">
                      {pattern.examples.map((ex, i) => (
                        <div key={i} className="grammar-example">
                          <div className="grammar-example__japanese">{ex.japanese}</div>
                          <div className="grammar-example__romaji">{ex.romaji}</div>
                          <div className="grammar-example__english">{ex.english}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grammar-card__snoopy-tip">
                      <span className="grammar-card__snoopy-tip-icon">💡</span>
                      <span>{pattern.snoopyTip}</span>
                    </div>

                    {pattern.commonMistake && (
                      <div className="grammar-card__mistake">
                        <span>⚠️</span>
                        <span><strong>Common mistake: </strong>{pattern.commonMistake}</span>
                      </div>
                    )}

                    {!learned && (
                      <Button variant="secondary" size="sm" onClick={() => markGrammarLearned(pattern.id)}>
                        ✓ Mark as Understood (+15 XP)
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
