import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import TipBubble from '../components/ui/TipBubble';
import { ALL_VOCAB_SETS } from '../data/vocabulary';

export default function VocabularySet() {
  const { setId } = useParams();
  const { setMascotMessage } = useAppContext();
  const { isWordLearned, markWordLearned } = useProgress();

  const set = ALL_VOCAB_SETS[setId];

  useEffect(() => {
    if (set) {
      setMascotMessage(
        `Let's learn ${set.label} (${set.labelJa})! Read each word, say it out loud, then mark it when you feel confident! 🌟`,
        'happy'
      );
    }
  }, [setId]);

  if (!set) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2>Set not found</h2>
        <Button variant="primary" to="/vocabulary">Back to Vocabulary</Button>
      </div>
    );
  }

  return (
    <>
      <div className="page-banner page-banner--vocab">
        <div className="page-banner__inner">
          <Link to="/vocabulary" className="page-banner__back-link">← Back to Vocabulary</Link>
          <h1 style={{ fontFamily: 'Zen Maru Gothic, serif' }}>
            {set.icon} {set.labelJa} — {set.label}
          </h1>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <Button variant="primary" size="sm" to={`/quiz/vocabulary?set=${setId}`}>Quiz This Set →</Button>
          </div>
        </div>
      </div>

      <div className="vocab-page">
        <div className="vocab-page__inner">
          <div className="vocab-grid">
            {set.words.map((word) => {
              const learned = isWordLearned(setId, word.id);
              return (
                <div key={word.id} className={`vocab-card${learned ? ' vocab-card--learned' : ''}`}>
                  <div className="vocab-card__japanese">{word.japanese}</div>
                  <div className="vocab-card__romaji">{word.romaji}</div>
                  <div className="vocab-card__english">{word.english}</div>
                  {word.example && (
                    <div className="vocab-card__example">
                      <strong>{word.example.japanese}</strong>
                      <em>{word.example.english}</em>
                    </div>
                  )}
                  {word.snoopyTip && (
                    <TipBubble variant="hint" style={{ marginTop: '0.75rem' }}>
                      {word.snoopyTip}
                    </TipBubble>
                  )}
                  <div className="vocab-card__footer">
                    <Badge variant={word.level === 'beginner' ? 'beginner' : 'intermediate'}>
                      {word.level}
                    </Badge>
                    {!learned ? (
                      <Button variant="soft" size="sm" onClick={() => markWordLearned(setId, word.id)}>
                        ✓ I Know This! (+10 XP)
                      </Button>
                    ) : (
                      <Badge variant="learned">✓ Learned</Badge>
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
