import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import SnoopyNova from '../components/mascot/SnoopyNova';
import { VOCAB_SET_LIST, VOCAB_SET_LIST_N2, VOCAB_SET_LIST_N1 } from '../data/vocabulary';

const JLPT_SECTIONS = [
  {
    key: 'beginner',
    title: 'はじめて — Beginner',
    subtitle: 'Essential everyday words. Start here!',
    badge: 'Beginner',
    badgeColor: '#9dc1c4',
    sets: VOCAB_SET_LIST,
  },
  {
    key: 'n2',
    title: 'JLPT N2 — Intermediate',
    subtitle: 'Work, travel, shopping, health and emotions.',
    badge: 'N2',
    badgeColor: '#738daa',
    sets: VOCAB_SET_LIST_N2,
  },
  {
    key: 'n1',
    title: 'JLPT N1 — Advanced',
    subtitle: 'Society, nature, and academic / abstract concepts.',
    badge: 'N1',
    badgeColor: '#715478',
    sets: VOCAB_SET_LIST_N1,
  },
];

export default function Vocabulary() {
  const { setMascotMessage } = useAppContext();
  const { getVocabSetPercent } = useProgress();

  useEffect(() => {
    setMascotMessage(
      'たんご (Vocabulary) time! Start with Beginner sets and work your way up to N1. Every word gets you closer! 📖',
      'happy'
    );
  }, []);

  return (
    <>
      <div className="page-banner page-banner--vocab">
        <div className="page-banner__inner">
          <h1 style={{ fontFamily: 'Zen Maru Gothic, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            📖 たんご — Vocabulary
          </h1>
          <p style={{ color: '#7a7a8a', marginTop: '0.5rem', fontSize: '1.1rem' }}>
            Themed word sets from Beginner all the way up to JLPT N1.
          </p>
        </div>
      </div>

      <div className="vocab-page">
        <div className="vocab-page__inner">
          <SnoopyNova />

          {JLPT_SECTIONS.map((section) => (
            <div key={section.key} style={{ marginTop: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h2 className="section__title" style={{ margin: 0 }}>{section.title}</h2>
                <span
                  className="badge"
                  style={{
                    background: section.badgeColor,
                    color: '#fff',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {section.badge}
                </span>
              </div>
              <p className="section__subtitle" style={{ marginBottom: '1.25rem' }}>{section.subtitle}</p>

              <div className="vocab-grid">
                {section.sets.map((set) => {
                  const pct = getVocabSetPercent(set.id, set.words.length);
                  return (
                    <Link
                      key={set.id}
                      to={`/vocabulary/${set.id}`}
                      className={`module-card module-card--${set.color}`}
                    >
                      <span className="module-card__icon">{set.icon}</span>
                      <div className="module-card__title-jp">{set.labelJa}</div>
                      <div className="module-card__title-en">{set.label}</div>
                      <p className="module-card__desc">{set.words.length} words to learn</p>
                      <div className="module-card__footer">
                        <ProgressBar percent={pct} compact />
                        <span className="badge badge--learned">
                          {Math.round((pct / 100) * set.words.length)}/{set.words.length}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
