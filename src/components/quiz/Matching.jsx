import React, { useState, useEffect } from 'react';
import { useProgress } from '../../hooks/useProgress';
import Button from '../ui/Button';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Matching({ pairs, module, setId, onComplete }) {
  const { recordQuizScore } = useProgress();
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selected, setSelected] = useState({ left: null, right: null });
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const subset = shuffle(pairs).slice(0, 6);
    setLeftItems(shuffle(subset.map((p) => ({ id: p.id, text: p.japanese }))));
    setRightItems(shuffle(subset.map((p) => ({ id: p.id, text: p.english }))));
    setMatched([]);
    setSelected({ left: null, right: null });
    setScore(0);
  }, []);

  useEffect(() => {
    const { left, right } = selected;
    if (!left || !right) return;
    if (left === right) {
      setMatched((m) => [...m, left]);
      setScore((s) => s + 1);
      setSelected({ left: null, right: null });
    } else {
      setWrong({ left, right });
      setTimeout(() => {
        setWrong(null);
        setSelected({ left: null, right: null });
      }, 600);
    }
  }, [selected]);

  const total = leftItems.length;
  const isComplete = matched.length === total && total > 0;

  if (isComplete) {
    recordQuizScore(module, score, total, 'matching', setId);
    return (
      <div className="quiz-result">
        <div className="quiz-result__score">{score}/{total}</div>
        <div className="quiz-result__label">matches found!</div>
        <p className="quiz-result__message">🎊 Perfect matching! Snoopy Nova is cheering for you!</p>
        <div className="quiz-result__actions">
          <Button variant="primary" onClick={onComplete}>Back to Quiz</Button>
        </div>
      </div>
    );
  }

  function getTileClass(side, id) {
    const cls = ['matching__item'];
    if (matched.includes(id)) cls.push('matching__item--matched');
    else if (wrong && wrong[side] === id) cls.push('matching__item--wrong');
    else if (selected[side] === id) cls.push('matching__item--active');
    return cls.join(' ');
  }

  function selectLeft(id) {
    if (matched.includes(id)) return;
    setSelected((s) => ({ ...s, left: s.left === id ? null : id }));
  }

  function selectRight(id) {
    if (matched.includes(id)) return;
    setSelected((s) => ({ ...s, right: s.right === id ? null : id }));
  }

  return (
    <div>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#7a7a8a', fontSize: '0.875rem' }}>
        Match each Japanese word to its meaning!
      </p>
      <div className="matching">
        <div className="matching__column">
          {leftItems.map((item) => (
            <button
              key={item.id}
              className={getTileClass('left', item.id)}
              onClick={() => selectLeft(item.id)}
              disabled={matched.includes(item.id)}
            >
              {item.text}
            </button>
          ))}
        </div>
        <div className="matching__column">
          {rightItems.map((item) => (
            <button
              key={item.id}
              className={getTileClass('right', item.id)}
              onClick={() => selectRight(item.id)}
              disabled={matched.includes(item.id)}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#715478', fontWeight: 700 }}>
        {matched.length} / {total} matched
      </p>
    </div>
  );
}
