import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import Button from '../components/ui/Button';
import TipBubble from '../components/ui/TipBubble';
import { hiraganaFlat } from '../data/hiragana';

export default function HiraganaDetail() {
  const { charId } = useParams();
  const navigate = useNavigate();
  const { setMascotMessage } = useAppContext();
  const { isCharLearned, markCharLearned } = useProgress();

  const char = hiraganaFlat.find((c) => c.id === charId);
  const currentIdx = hiraganaFlat.findIndex((c) => c.id === charId);
  const prevChar = hiraganaFlat[currentIdx - 1];
  const nextChar = hiraganaFlat[currentIdx + 1];
  const learned = char ? isCharLearned('hiragana', char.id) : false;

  useEffect(() => {
    if (char) {
      setMascotMessage(
        `This is ${char.char} (${char.romaji})! Example word: ${char.exampleWord.japanese} means "${char.exampleWord.english}". 📝`,
        'happy'
      );
    }
  }, [charId]);

  if (!char) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2>Character not found</h2>
        <Button variant="primary" to="/hiragana" style={{ marginTop: '1rem' }}>Back to Hiragana</Button>
      </div>
    );
  }

  return (
    <>
      <div className="page-banner page-banner--hiragana">
        <div className="page-banner__inner">
          <Link to="/hiragana" className="page-banner__back-link">← Back to Hiragana Chart</Link>
        </div>
      </div>
      <div className="kana-page">
        <div className="kana-page__inner" style={{ maxWidth: '600px' }}>
          <div className="char-detail">
            <div className="char-detail__kana-display">{char.char}</div>
            <div className="char-detail__romaji">{char.romaji}</div>

            <div className="char-detail__example-word">
              <strong>{char.exampleWord.japanese}</strong>
              <span>{char.exampleWord.english}</span>
            </div>

            <TipBubble variant="hint">
              Look at this character carefully — trace it with your finger! Writing helps memory.
            </TipBubble>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {!learned ? (
                <Button variant="secondary" onClick={() => markCharLearned('hiragana', char.id)}>
                  ✓ Mark as Learned (+5 XP)
                </Button>
              ) : (
                <span className="badge badge--learned" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                  ✓ Learned!
                </span>
              )}
              <Button variant="ghost" to={`/quiz/hiragana`}>Practice in Quiz →</Button>
            </div>

            <div className="char-detail__nav">
              {prevChar ? (
                <Button variant="ghost" size="sm" to={`/hiragana/${prevChar.id}`}>
                  ← {prevChar.char}
                </Button>
              ) : <span />}
              {nextChar ? (
                <Button variant="ghost" size="sm" to={`/hiragana/${nextChar.id}`}>
                  {nextChar.char} →
                </Button>
              ) : <span />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
