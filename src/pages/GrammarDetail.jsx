import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { grammarPatterns } from '../data/grammar';

export default function GrammarDetail() {
  const { patternId } = useParams();
  const pattern = grammarPatterns.find((p) => p.id === patternId);

  if (!pattern) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h2>Pattern not found</h2>
        <Button variant="primary" to="/grammar">Back to Grammar</Button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '700px' }}>
      <Link to="/grammar" style={{ fontSize: '0.875rem', color: '#7a7a8a' }}>← Back to Grammar</Link>
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Zen Maru Gothic', fontSize: '6rem', color: '#715478', lineHeight: 1 }}>
          {pattern.pattern}
        </div>
        <h1 style={{ fontFamily: 'Zen Maru Gothic', marginTop: '0.5rem' }}>{pattern.label}</h1>
        <p style={{ color: '#7a7a8a' }}>{pattern.meaning}</p>
      </div>
    </div>
  );
}
