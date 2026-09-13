import React, { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'yururi-cafe-progress';

const initialState = {
  version: 1,
  lastActive: null,
  overall: { totalXP: 0, streak: 0, bestStreak: 0, daysActive: [] },
  hiragana:  { learned: [], quizHistory: [] },
  katakana:  { learned: [], quizHistory: [] },
  vocabulary: {
    greetings:    { learned: [], quizHistory: [] },
    numbers:      { learned: [], quizHistory: [] },
    colors:       { learned: [], quizHistory: [] },
    food:         { learned: [], quizHistory: [] },
    cafe:         { learned: [], quizHistory: [] },
    n2_work:      { learned: [], quizHistory: [] },
    n2_travel:    { learned: [], quizHistory: [] },
    n2_shopping:  { learned: [], quizHistory: [] },
    n2_health:    { learned: [], quizHistory: [] },
    n2_emotions:  { learned: [], quizHistory: [] },
    n1_society:   { learned: [], quizHistory: [] },
    n1_nature:    { learned: [], quizHistory: [] },
    n1_abstract:  { learned: [], quizHistory: [] },
  },
  grammar: { learned: [], quizHistory: [] },
};

function mergeWithDefaults(saved) {
  return {
    ...initialState,
    ...saved,
    overall: { ...initialState.overall, ...(saved.overall || {}) },
    hiragana: { ...initialState.hiragana, ...(saved.hiragana || {}) },
    katakana: { ...initialState.katakana, ...(saved.katakana || {}) },
    vocabulary: {
      ...initialState.vocabulary,
      ...(saved.vocabulary || {}),
      // ensure new sets are never missing for existing saves
      ...Object.fromEntries(
        Object.keys(initialState.vocabulary)
          .filter((k) => !(saved.vocabulary || {})[k])
          .map((k) => [k, { learned: [], quizHistory: [] }])
      ),
    },
    grammar: { ...initialState.grammar, ...(saved.grammar || {}) },
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'MARK_CHAR_LEARNED': {
      const { module, id } = action.payload;
      const section = state[module];
      if (section.learned.includes(id)) return state;
      return {
        ...state,
        [module]: { ...section, learned: [...section.learned, id] },
        overall: { ...state.overall, totalXP: state.overall.totalXP + 5 },
      };
    }
    case 'MARK_WORD_LEARNED': {
      const { setId, id } = action.payload;
      const vocab = state.vocabulary;
      const set = vocab[setId];
      if (set.learned.includes(id)) return state;
      return {
        ...state,
        vocabulary: {
          ...vocab,
          [setId]: { ...set, learned: [...set.learned, id] },
        },
        overall: { ...state.overall, totalXP: state.overall.totalXP + 10 },
      };
    }
    case 'MARK_GRAMMAR_LEARNED': {
      const { id } = action.payload;
      if (state.grammar.learned.includes(id)) return state;
      return {
        ...state,
        grammar: { ...state.grammar, learned: [...state.grammar.learned, id] },
        overall: { ...state.overall, totalXP: state.overall.totalXP + 15 },
      };
    }
    case 'RECORD_QUIZ_SCORE': {
      const { module, setId, score, total, mode } = action.payload;
      if (!total) return state;
      const entry = { date: new Date().toISOString(), score, total, mode };
      const xpGained = Math.round((score / total) * 20);

      if (module === 'vocabulary' && setId) {
        const vocab = state.vocabulary;
        const set = vocab[setId];
        return {
          ...state,
          vocabulary: {
            ...vocab,
            [setId]: { ...set, quizHistory: [...set.quizHistory, entry] },
          },
          overall: { ...state.overall, totalXP: state.overall.totalXP + xpGained },
        };
      }
      const section = state[module];
      return {
        ...state,
        [module]: { ...section, quizHistory: [...section.quizHistory, entry] },
        overall: { ...state.overall, totalXP: state.overall.totalXP + xpGained },
      };
    }
    case 'UPDATE_STREAK': {
      const today = new Date().toDateString();
      const daysActive = state.overall.daysActive;
      if (daysActive.includes(today)) return state;
      const newDays = [...daysActive, today];
      const streak = state.overall.streak + 1;
      return {
        ...state,
        overall: {
          ...state.overall,
          daysActive: newDays,
          streak,
          bestStreak: Math.max(streak, state.overall.bestStreak),
          lastActive: today,
        },
      };
    }
    case 'RESET_MODULE': {
      const { module } = action.payload;
      if (module === 'vocabulary') {
        return { ...state, vocabulary: initialState.vocabulary };
      }
      return {
        ...state,
        [module]: initialState[module],
      };
    }
    default:
      return state;
  }
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? mergeWithDefaults(JSON.parse(saved)) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgressContext must be used inside ProgressProvider');
  return ctx;
}
