import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import SnoopyNova from '../components/mascot/SnoopyNova';
import { hiraganaFlat } from '../data/hiragana';
import { katakanaFlat } from '../data/katakana';
import { ALL_VOCAB_SETS as VOCAB_SETS } from '../data/vocabulary';
import { grammarPatterns } from '../data/grammar';

function QuizHistoryRow({ entry }) {
  const date = new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const pct = Math.round((entry.score / entry.total) * 100);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(113,84,120,0.1)' }}>
      <span style={{ fontSize: '0.8rem', color: '#7a7a8a' }}>{date}</span>
      <span style={{ fontSize: '0.875rem', fontFamily: 'Zen Maru Gothic', fontWeight: 700 }}>{entry.score}/{entry.total}</span>
      <Badge variant={pct >= 80 ? 'learned' : 'level'}>{pct}%</Badge>
      <span style={{ fontSize: '0.75rem', color: '#7a7a8a', textTransform: 'capitalize' }}>{entry.mode}</span>
    </div>
  );
}

export default function Progress() {
  const { setMascotMessage } = useAppContext();
  const progress = useProgress();
  const { state } = progress;

  useEffect(() => {
    setMascotMessage(
      `You've earned ${state.overall.totalXP} XP and kept a ${state.overall.streak}-day streak! Every bit of practice counts! 💪`,
      'happy'
    );
  }, []);

  const vocabLearned = Object.values(VOCAB_SETS).reduce((sum, vs) => {
    return sum + (state.vocabulary[vs.id]?.learned?.length ?? 0);
  }, 0);
  const vocabTotal = Object.values(VOCAB_SETS).reduce((sum, vs) => sum + vs.words.length, 0);

  const allHistory = [
    ...state.hiragana.quizHistory.map((h) => ({ ...h, module: 'Hiragana' })),
    ...state.katakana.quizHistory.map((h) => ({ ...h, module: 'Katakana' })),
    ...state.grammar.quizHistory.map((h) => ({ ...h, module: 'Grammar' })),
    ...Object.entries(state.vocabulary).flatMap(([key, val]) =>
      val.quizHistory.map((h) => ({ ...h, module: `Vocab: ${key}` }))
    ),
  ]
    .filter((h) => h.total > 0)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const modules = [
    { label: 'Hiragana', labelJp: 'ひらがな', learned: state.hiragana.learned.length, total: hiraganaFlat.length },
    { label: 'Katakana', labelJp: 'カタカナ', learned: state.katakana.learned.length, total: katakanaFlat.length },
    { label: 'Vocabulary', labelJp: 'たんご', learned: vocabLearned, total: vocabTotal },
    { label: 'Grammar', labelJp: 'ぶんぽう', learned: state.grammar.learned.length, total: grammarPatterns.length },
  ];

  return (
    <>
      <div className="page-banner page-banner--progress">
        <div className="page-banner__inner">
          <h1 style={{ fontFamily: 'Zen Maru Gothic, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            ⭐ きろく — Progress
          </h1>
          <p style={{ color: '#7a7a8a', marginTop: '0.5rem', fontSize: '1.1rem' }}>
            Track your learning journey
          </p>
        </div>
      </div>

      <div style={{ padding: '2rem 0 4rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <SnoopyNova />

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
            {[
              { label: 'Total XP', value: state.overall.totalXP, icon: '⚡', badge: 'xp' },
              { label: 'Day Streak', value: state.overall.streak, icon: '🔥', badge: 'streak' },
              { label: 'Best Streak', value: state.overall.bestStreak, icon: '🏆', badge: 'level' },
              { label: 'Days Active', value: state.overall.daysActive.length, icon: '📅', badge: 'beginner' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(112,113,150,0.12)', border: '1px solid rgba(113,84,120,0.1)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontFamily: 'Zen Maru Gothic', fontWeight: 700, color: '#715478', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#7a7a8a', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Module progress */}
          <h2 style={{ fontFamily: 'Zen Maru Gothic', marginBottom: '1rem' }}>Module Progress</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {modules.map((mod) => {
              const pct = mod.total ? Math.round((mod.learned / mod.total) * 100) : 0;
              return (
                <div key={mod.label} style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem', boxShadow: '0 2px 8px rgba(112,113,150,0.1)', border: '1px solid rgba(113,84,120,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontFamily: 'Zen Maru Gothic', fontWeight: 700 }}>{mod.labelJp}</span>
                      <span style={{ color: '#7a7a8a', marginLeft: '0.5rem', fontSize: '0.875rem' }}>{mod.label}</span>
                    </div>
                    <span style={{ fontWeight: 700, color: '#715478' }}>{mod.learned}/{mod.total}</span>
                  </div>
                  <ProgressBar percent={pct} label="" />
                </div>
              );
            })}
          </div>

          {/* Quiz history */}
          {allHistory.length > 0 && (
            <>
              <h2 style={{ fontFamily: 'Zen Maru Gothic', marginBottom: '1rem' }}>Recent Quiz History</h2>
              <div style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem', boxShadow: '0 2px 8px rgba(112,113,150,0.1)', border: '1px solid rgba(113,84,120,0.1)' }}>
                {allHistory.map((entry, i) => (
                  <QuizHistoryRow key={i} entry={entry} />
                ))}
              </div>
            </>
          )}

          {allHistory.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#7a7a8a' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
              <p>No quiz history yet — start learning and come back here!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
