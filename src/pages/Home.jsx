import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import SnoopyNova from '../components/mascot/SnoopyNova';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import { hiraganaFlat } from '../data/hiragana';
import { katakanaFlat } from '../data/katakana';
import { ALL_VOCAB_SET_LIST as VOCAB_SET_LIST } from '../data/vocabulary';
import { grammarPatterns } from '../data/grammar';

const MODULES = [
  { id: 'hiragana',   to: '/hiragana',   titleJp: 'ひらがな', titleEn: 'Hiragana',   icon: '📝', desc: 'Learn the 46 basic hiragana characters — the foundation of Japanese reading.', color: 'hiragana', total: hiraganaFlat.length },
  { id: 'katakana',   to: '/katakana',   titleJp: 'カタカナ', titleEn: 'Katakana',   icon: '🔤', desc: 'Master katakana for foreign words, sounds, and modern Japanese.', color: 'katakana', total: katakanaFlat.length },
  { id: 'vocabulary', to: '/vocabulary', titleJp: 'たんご',   titleEn: 'Vocabulary', icon: '📖', desc: 'Build your word bank with themed sets: greetings, food, café, numbers, and colors.', color: 'vocab', total: VOCAB_SET_LIST.reduce((s, v) => s + v.words.length, 0) },
  { id: 'grammar',    to: '/grammar',    titleJp: 'ぶんぽう', titleEn: 'Grammar',    icon: '✏️', desc: 'Understand particles and sentence patterns that make Japanese sentences click.', color: 'grammar', total: grammarPatterns.length },
  { id: 'quiz',       to: '/quiz',       titleJp: 'クイズ',   titleEn: 'Quiz',       icon: '🎯', desc: 'Test yourself with flashcards, multiple-choice, and matching exercises.', color: 'quiz', total: null },
  { id: 'progress',   to: '/progress',   titleJp: 'きろく',   titleEn: 'Progress',   icon: '⭐', desc: 'Track your XP, learning streak, and how many characters you have mastered.', color: 'progress', total: null },
];

const PREVIEW_KANA = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く'];

export default function Home() {
  const { setMascotMessage } = useAppContext();
  const progress = useProgress();

  useEffect(() => {
    setMascotMessage(
      'ようこそ！ Welcome to Yururi Cafe! Pick a lesson below to start your Japanese adventure. I\'m here if you need tips! ✨',
      'waving'
    );
  }, []);

  function getPercent(mod) {
    if (mod.id === 'vocabulary') {
      const totalLearned = VOCAB_SET_LIST.reduce((s, vs) => {
        return s + (progress.state.vocabulary[vs.id]?.learned?.length ?? 0);
      }, 0);
      return mod.total ? Math.round((totalLearned / mod.total) * 100) : 0;
    }
    if (mod.id === 'grammar') return progress.getGrammarPercent(mod.total);
    if (mod.total) return progress.getModulePercent(mod.id, mod.total);
    return 0;
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">ゆるりカフェ — Japanese Learning</span>
            <h1 className="hero__heading">
              Learn Japanese<br />
              <span>the cozy way</span> ☕
            </h1>
            <p className="hero__subheading">
              No pressure, no rush — just you, a warm drink, and your friendly teacher Snoopy Nova. Perfect for absolute beginners to intermediate learners.
            </p>
            <div className="hero__cta">
              <Button variant="primary" size="lg" to="/hiragana">Start with Hiragana →</Button>
              <Button variant="ghost" size="lg" to="/vocabulary">Browse Vocabulary</Button>
            </div>

            {/* XP / streak pills */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <span className="badge badge--xp">⚡ {progress.totalXP} XP</span>
              <span className="badge badge--streak">🔥 {progress.streak} day streak</span>
            </div>
          </div>

          <div className="hero__visual">
            <SnoopyNova />
            {/* Kana preview strip */}
            <div className="kana-strip">
              {PREVIEW_KANA.map((k) => (
                <div key={k} className="kana-strip__char">{k}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODULES GRID */}
      <section className="modules-section">
        <div className="modules-section__inner">
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="section__title">Your Lessons</h2>
            <p className="section__subtitle">Start anywhere — everything is connected!</p>
          </div>
          <div className="modules-section__grid">
            {MODULES.map((mod) => {
              const pct = getPercent(mod);
              return (
                <Link key={mod.id} to={mod.to} className={`module-card module-card--${mod.color}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="module-card__icon">{mod.icon}</span>
                    {pct > 0 && <span className="badge badge--learned">{pct}%</span>}
                  </div>
                  <div className="module-card__title-jp">{mod.titleJp}</div>
                  <div className="module-card__title-en">{mod.titleEn}</div>
                  <p className="module-card__desc">{mod.desc}</p>
                  {mod.total && (
                    <div className="module-card__footer">
                      <ProgressBar percent={pct} compact />
                      <span className="badge badge--level">{mod.total} items</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAFE DIVIDER */}
      <div className="container">
        <div className="cafe-divider">
          <span className="steam-decoration">☕</span>
          <span>take your time, enjoy the journey</span>
          <span className="steam-decoration">🍵</span>
        </div>
      </div>
    </>
  );
}
