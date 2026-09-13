import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Hiragana from './pages/Hiragana';
import HiraganaDetail from './pages/HiraganaDetail';
import Katakana from './pages/Katakana';
import KatakanaDetail from './pages/KatakanaDetail';
import Vocabulary from './pages/Vocabulary';
import VocabularySet from './pages/VocabularySet';
import Grammar from './pages/Grammar';
import GrammarDetail from './pages/GrammarDetail';
import Quiz from './pages/Quiz';
import QuizSession from './pages/QuizSession';
import Progress from './pages/Progress';

function PageWrapper({ children }) {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove('page--visible');
      const id = requestAnimationFrame(() => {
        ref.current?.classList.add('page--visible');
      });
      return () => cancelAnimationFrame(id);
    }
  }, [location.pathname]);

  return (
    <div className="page" ref={ref}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/hiragana" element={<PageWrapper><Hiragana /></PageWrapper>} />
          <Route path="/hiragana/:charId" element={<PageWrapper><HiraganaDetail /></PageWrapper>} />
          <Route path="/katakana" element={<PageWrapper><Katakana /></PageWrapper>} />
          <Route path="/katakana/:charId" element={<PageWrapper><KatakanaDetail /></PageWrapper>} />
          <Route path="/vocabulary" element={<PageWrapper><Vocabulary /></PageWrapper>} />
          <Route path="/vocabulary/:setId" element={<PageWrapper><VocabularySet /></PageWrapper>} />
          <Route path="/grammar" element={<PageWrapper><Grammar /></PageWrapper>} />
          <Route path="/grammar/:patternId" element={<PageWrapper><GrammarDetail /></PageWrapper>} />
          <Route path="/quiz" element={<PageWrapper><Quiz /></PageWrapper>} />
          <Route path="/quiz/:module" element={<PageWrapper><QuizSession /></PageWrapper>} />
          <Route path="/progress" element={<PageWrapper><Progress /></PageWrapper>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
