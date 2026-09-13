import React from 'react';
import { useFlashcard } from '../../hooks/useFlashcard';
import { useProgress } from '../../hooks/useProgress';
import Flashcard from '../ui/Flashcard';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

export default function FlashcardQuiz({ cards, module, setId, onComplete }) {
  const fc = useFlashcard(cards);
  const { recordQuizScore } = useProgress();
  const [knownCount, setKnownCount] = React.useState(0);
  const [seen, setSeen] = React.useState(0);

  function handleKnow() {
    setKnownCount((k) => k + 1);
    setSeen((s) => s + 1);
    fc.markFeedback('correct');
    setTimeout(() => fc.next(), 400);
  }

  function handleStudyMore() {
    setSeen((s) => s + 1);
    fc.markFeedback('incorrect');
    setTimeout(() => fc.next(), 400);
  }

  const isFinished = seen > 0 && seen >= fc.totalCards;

  if (isFinished) {
    recordQuizScore(module, knownCount, fc.totalCards, 'flashcard', setId);
    const pct = Math.round((knownCount / fc.totalCards) * 100);
    return (
      <div className="quiz-result">
        <div className="quiz-result__score">{knownCount}/{fc.totalCards}</div>
        <div className="quiz-result__label">cards known</div>
        <p className="quiz-result__message">
          {pct >= 80 ? '🎉 Amazing! You\'re mastering these cards!' : '🌸 Keep reviewing — you\'re making progress!'}
        </p>
        <div className="quiz-result__actions">
          <Button variant="primary" onClick={() => { fc.shuffleDeck(); setKnownCount(0); setSeen(0); }}>Shuffle & Retry</Button>
          <Button variant="ghost" onClick={onComplete}>Back to Quiz</Button>
        </div>
      </div>
    );
  }

  const card = fc.currentCard;
  if (!card) return null;

  const progress = Math.round((seen / fc.totalCards) * 100);

  return (
    <div>
      <ProgressBar percent={progress} label={`${seen} / ${fc.totalCards} cards`} />
      <div style={{ marginTop: '1.5rem' }}>
        <Flashcard
          front={
            <>
              <span className="flashcard__kana">{card.char}</span>
              <span className="flashcard__hint">Tap to reveal</span>
            </>
          }
          back={
            <>
              <span className="flashcard__romaji">{card.romaji}</span>
              {card.exampleWord && (
                <div className="flashcard__example">
                  <strong>{card.exampleWord.japanese}</strong>
                  <span>{card.exampleWord.english}</span>
                </div>
              )}
            </>
          }
          isFlipped={fc.isFlipped}
          feedback={fc.feedback}
          onClick={fc.flip}
        />
      </div>
      {fc.isFlipped && (
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <Button variant="ghost" full onClick={handleStudyMore}>🔄 Study More</Button>
          <Button variant="secondary" full onClick={handleKnow}>✓ I Know This!</Button>
        </div>
      )}
    </div>
  );
}
