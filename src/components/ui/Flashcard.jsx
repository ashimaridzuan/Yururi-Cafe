import React from 'react';

export default function Flashcard({ front, back, isFlipped, feedback, onClick }) {
  const classes = [
    'flashcard',
    isFlipped && 'flashcard--flipped',
    feedback === 'correct' && 'flashcard--correct',
    feedback === 'incorrect' && 'flashcard--incorrect',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <button
        className={classes}
        onClick={onClick}
        aria-label={isFlipped ? 'Card flipped — showing answer' : 'Click to flip card'}
        aria-pressed={isFlipped}
      >
        <div className="flashcard__inner">
          <div className="flashcard__front">
            {front}
          </div>
          <div className="flashcard__back">
            {back}
          </div>
        </div>
      </button>
      <p className="flashcard-hint">{isFlipped ? 'Click to flip back' : 'Click to reveal'}</p>
    </>
  );
}
