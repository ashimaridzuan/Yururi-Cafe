import { useState, useCallback } from 'react';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useFlashcard(cards) {
  const [deck, setDeck] = useState(() => shuffle(cards));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const flip = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  const next = useCallback(() => {
    setIsFlipped(false);
    setFeedback(null);
    setCurrentIndex((i) => Math.min(i + 1, deck.length - 1));
  }, [deck.length]);

  const prev = useCallback(() => {
    setIsFlipped(false);
    setFeedback(null);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const shuffleDeck = useCallback(() => {
    setDeck(shuffle(cards));
    setCurrentIndex(0);
    setIsFlipped(false);
    setFeedback(null);
  }, [cards]);

  const markFeedback = useCallback((result) => {
    setFeedback(result);
  }, []);

  const isComplete = currentIndex >= deck.length - 1 && feedback !== null;
  const currentCard = deck[currentIndex] ?? null;

  return {
    deck,
    currentCard,
    currentIndex,
    totalCards: deck.length,
    isFlipped,
    feedback,
    isComplete,
    flip,
    next,
    prev,
    shuffleDeck,
    markFeedback,
  };
}
