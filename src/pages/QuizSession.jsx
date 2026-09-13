import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import MultipleChoice from '../components/quiz/MultipleChoice';
import FlashcardQuiz from '../components/quiz/FlashcardQuiz';
import Matching from '../components/quiz/Matching';
import Button from '../components/ui/Button';
import { hiraganaFlat } from '../data/hiragana';
import { katakanaFlat } from '../data/katakana';
import { ALL_VOCAB_SETS as VOCAB_SETS } from '../data/vocabulary';
import { grammarPatterns } from '../data/grammar';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildKanaQuestions(flat) {
  const subset = shuffle(flat).slice(0, 15);
  return subset.map((char) => {
    const distractors = shuffle(flat.filter((c) => c.id !== char.id)).slice(0, 3).map((c) => c.romaji);
    const options = shuffle([char.romaji, ...distractors]);
    return {
      id: char.id,
      question: char.char,
      questionLabel: 'What is the reading of this character?',
      answer: char.romaji,
      options,
    };
  });
}

function buildVocabQuestions(words) {
  const subset = shuffle(words).slice(0, 10);
  return subset.map((word) => {
    const distractors = shuffle(words.filter((w) => w.id !== word.id)).slice(0, 3).map((w) => w.english);
    const options = shuffle([word.english, ...distractors]);
    return {
      id: word.id,
      question: word.japanese,
      questionLabel: 'What does this mean?',
      answer: word.english,
      options,
    };
  });
}

function buildGrammarQuestions() {
  return grammarPatterns.map((p) => {
    const distractors = shuffle(grammarPatterns.filter((gp) => gp.id !== p.id)).slice(0, 3).map((gp) => gp.label);
    const options = shuffle([p.label, ...distractors]);
    return {
      id: p.id,
      question: p.pattern,
      questionLabel: 'What does this particle/pattern do?',
      answer: p.label,
      options,
    };
  });
}

const MODE_LABELS = {
  flashcard: '🃏 Flashcards',
  'multiple-choice': '🎯 Multiple Choice',
  matching: '🔗 Matching',
};

export default function QuizSession() {
  const { module } = useParams();
  const location = useLocation();
  const { setMascotMessage } = useAppContext();
  const [mode, setMode] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const setId = searchParams.get('set') || 'greetings';

  useEffect(() => {
    setMascotMessage('Ready to quiz? Pick a mode and let\'s go! がんばって！ (Do your best!) 🌟', 'waving');
  }, [module]);

  const moduleLabel = {
    hiragana: 'ひらがな Hiragana',
    katakana: 'カタカナ Katakana',
    vocabulary: `📖 Vocabulary — ${VOCAB_SETS[setId]?.label ?? 'All'}`,
    grammar: '✏️ Grammar',
  }[module] ?? module;

  function getCards() {
    if (module === 'hiragana') return hiraganaFlat;
    if (module === 'katakana') return katakanaFlat;
    if (module === 'vocabulary') return VOCAB_SETS[setId]?.words ?? [];
    return [];
  }

  function getQuestions() {
    if (module === 'hiragana') return buildKanaQuestions(hiraganaFlat);
    if (module === 'katakana') return buildKanaQuestions(katakanaFlat);
    if (module === 'vocabulary') return buildVocabQuestions(VOCAB_SETS[setId]?.words ?? []);
    if (module === 'grammar') return buildGrammarQuestions();
    return [];
  }

  function getPairs() {
    if (module === 'hiragana') {
      return shuffle(hiraganaFlat).slice(0, 6).map((c) => ({ id: c.id, japanese: c.char, english: c.romaji }));
    }
    if (module === 'katakana') {
      return shuffle(katakanaFlat).slice(0, 6).map((c) => ({ id: c.id, japanese: c.char, english: c.romaji }));
    }
    if (module === 'vocabulary') {
      return shuffle(VOCAB_SETS[setId]?.words ?? []).slice(0, 6).map((w) => ({ id: w.id, japanese: w.japanese, english: w.english }));
    }
    if (module === 'grammar') {
      return shuffle(grammarPatterns).slice(0, 6).map((p) => ({ id: p.id, japanese: p.pattern, english: p.label }));
    }
    return [];
  }

  function resetMode() { setMode(null); }

  if (!mode) {
    return (
      <>
        <div className="page-banner page-banner--quiz">
          <div className="page-banner__inner">
            <Link to="/quiz" className="page-banner__back-link">← Back to Quiz Menu</Link>
            <h1 style={{ fontFamily: 'Zen Maru Gothic, serif' }}>{moduleLabel}</h1>
            <p style={{ color: '#7a7a8a', marginTop: '0.5rem' }}>Choose your quiz mode</p>
          </div>
        </div>
        <div className="quiz-page">
          <div className="quiz-page__inner">
            {module === 'vocabulary' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#7a7a8a', marginBottom: '0.5rem' }}>Vocabulary set:</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {Object.values(VOCAB_SETS).map((vs) => (
                    <Link
                      key={vs.id}
                      to={`/quiz/vocabulary?set=${vs.id}`}
                      className={`vocab-set-nav__item${setId === vs.id ? ' vocab-set-nav__item--active' : ''}`}
                    >
                      {vs.icon} {vs.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="quiz-page__mode-grid">
              {[
                { id: 'flashcard', icon: '🃏', title: 'Flashcards', desc: 'Self-paced review — flip cards and track what you know.' },
                { id: 'multiple-choice', icon: '🎯', title: 'Multiple Choice', desc: 'Choose the correct answer from 4 options.' },
                { id: 'matching', icon: '🔗', title: 'Matching', desc: 'Match 6 pairs — connect Japanese to meaning.' },
              ].map((m) => (
                <button key={m.id} className="quiz-page__mode-card" onClick={() => setMode(m.id)}>
                  <span className="quiz-page__mode-icon">{m.icon}</span>
                  <div className="quiz-page__mode-title">{m.title}</div>
                  <p className="quiz-page__mode-desc">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="quiz-session">
      <div className="quiz-session__inner">
        <div className="quiz-session__header">
          <button className="quiz-session__back" onClick={resetMode}>← Back</button>
          <span className="badge badge--level">{MODE_LABELS[mode]}</span>
        </div>

        <h2 style={{ fontFamily: 'Zen Maru Gothic', marginBottom: '1.5rem', textAlign: 'center' }}>
          {moduleLabel}
        </h2>

        {mode === 'flashcard' && (
          <FlashcardQuiz cards={getCards()} module={module} setId={setId} onComplete={resetMode} />
        )}
        {mode === 'multiple-choice' && (
          <MultipleChoice questions={getQuestions()} module={module} setId={setId} onComplete={resetMode} />
        )}
        {mode === 'matching' && (
          <Matching pairs={getPairs()} module={module} setId={setId} onComplete={resetMode} />
        )}
      </div>
    </div>
  );
}
