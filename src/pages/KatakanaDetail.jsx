import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useProgress } from '../hooks/useProgress';
import Button from '../components/ui/Button';
import TipBubble from '../components/ui/TipBubble';
import { katakanaFlat } from '../data/katakana';

export default function KatakanaDetail() {
  const { charId } = useParams();
  const { setMascotMessage } = useAppContext();
  const { isCharLearned, markCharLearned } = useProgress();

  const char = katakanaFlat.find((c) => c.id === charId);
  const currentIdx = katakanaFlat.findIndex((c) => c.id === charId);
  const prevChar = katakanaFlat[currentIdx - 1];
  const nextChar = katakanaFlat[currentIdx + 1];
  const learned = char ? isCharLearned('katakana', char.id) : false;

  useEffect(() => {
    if (char) {
      setMascotMessage(
        `This is ${char.char} (${char.romaji})! Example: ${char.exampleWord.japanese} = "${char.exampleWord.english}" 🔤`,
        'happy'
      );
    }
  }, [charId]);

  if (!char) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2>Character not found</h2>
        <Button variant="primary" to="/katakana">Back to Katakana</Button>
      </div>
    );
  }

  return (
    <>
      <div className="page-banner page-banner--katakana">
        <div className="page-banner__inner">
          <Link to="/katakana" className="page-banner__back-link">← Back to Katakana Chart</Link>
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
              Katakana characters are angular and sharp — great for foreign words and emphasis!
            </TipBubble>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {!learned ? (
                <Button variant="secondary" onClick={() => markCharLearned('katakana', char.id)}>
                  ✓ Mark as Learned (+5 XP)
                </Button>
              ) : (
                <span className="badge badge--learned" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>✓ Learned!</span>
              )}
              <Button variant="ghost" to="/quiz/katakana">Practice in Quiz →</Button>
            </div>
            <div className="char-detail__nav">
              {prevChar ? <Button variant="ghost" size="sm" to={`/katakana/${prevChar.id}`}>← {prevChar.char}</Button> : <span />}
              {nextChar ? <Button variant="ghost" size="sm" to={`/katakana/${nextChar.id}`}>{nextChar.char} →</Button> : <span />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
