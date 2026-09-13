import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SnoopyNova from '../components/mascot/SnoopyNova';

const MODULES = [
  { id: 'hiragana',   label: 'Hiragana',   labelJp: 'ひらがな', icon: 'あ',  desc: 'Test your hiragana reading skills' },
  { id: 'katakana',   label: 'Katakana',   labelJp: 'カタカナ', icon: 'ア',  desc: 'Practice katakana recognition' },
  { id: 'vocabulary', label: 'Vocabulary', labelJp: 'たんご',   icon: '📖', desc: 'Quiz your vocabulary knowledge' },
  { id: 'grammar',    label: 'Grammar',    labelJp: 'ぶんぽう', icon: '✏️', desc: 'Test your grammar patterns' },
];

const MODES = [
  { id: 'flashcard',        label: 'Flashcards', icon: '🃏', desc: 'Flip cards and self-assess your knowledge at your own pace.' },
  { id: 'multiple-choice',  label: 'Multiple Choice', icon: '🎯', desc: 'Choose the correct answer from 4 options.' },
  { id: 'matching',         label: 'Matching', icon: '🔗', desc: 'Match Japanese words to their meanings.' },
];

export default function Quiz() {
  const { setMascotMessage } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setMascotMessage(
      'クイズ time! Pick a topic and a quiz style. Don\'t worry — mistakes are how we learn! I\'ll be cheering for you! 🎉',
      'waving'
    );
  }, []);

  return (
    <>
      <div className="page-banner page-banner--quiz">
        <div className="page-banner__inner">
          <h1 style={{ fontFamily: 'Zen Maru Gothic, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            🎯 クイズ — Quiz
          </h1>
          <p style={{ color: '#7a7a8a', marginTop: '0.5rem', fontSize: '1.1rem' }}>
            Choose a module and a quiz mode to practice!
          </p>
        </div>
      </div>

      <div className="quiz-page">
        <div className="quiz-page__inner">
          <SnoopyNova />

          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Zen Maru Gothic', marginBottom: '1rem' }}>1. Choose a Topic</h2>
            <div className="quiz-page__mode-grid">
              {MODULES.map((mod) => (
                <Link
                  key={mod.id}
                  to={`/quiz/${mod.id}`}
                  className="quiz-page__mode-card"
                >
                  <span className="quiz-page__mode-icon">{mod.icon}</span>
                  <div className="quiz-page__mode-title">{mod.labelJp}</div>
                  <div style={{ fontSize: '0.8rem', color: '#7a7a8a', fontWeight: 400 }}>{mod.label}</div>
                  <p className="quiz-page__mode-desc">{mod.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontFamily: 'Zen Maru Gothic', marginBottom: '0.5rem' }}>2. Quiz Modes</h2>
            <p style={{ color: '#7a7a8a', marginBottom: '1rem', fontSize: '0.9rem' }}>
              After choosing a topic, you can pick your preferred quiz style on the next page.
            </p>
            <div className="quiz-page__mode-grid">
              {MODES.map((m) => (
                <div key={m.id} className="quiz-page__mode-card" style={{ cursor: 'default' }}>
                  <span className="quiz-page__mode-icon">{m.icon}</span>
                  <div className="quiz-page__mode-title">{m.label}</div>
                  <p className="quiz-page__mode-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
