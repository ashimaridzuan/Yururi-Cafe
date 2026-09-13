import { useProgressContext } from '../context/ProgressContext';

export function useProgress() {
  const { state, dispatch } = useProgressContext();

  function isCharLearned(module, id) {
    return state[module]?.learned?.includes(id) ?? false;
  }

  function isWordLearned(setId, id) {
    return state.vocabulary?.[setId]?.learned?.includes(id) ?? false;
  }

  function isGrammarLearned(id) {
    return state.grammar?.learned?.includes(id) ?? false;
  }

  function getModulePercent(module, total) {
    if (!total) return 0;
    const learned = state[module]?.learned?.length ?? 0;
    return Math.round((learned / total) * 100);
  }

  function getVocabSetPercent(setId, total) {
    if (!total) return 0;
    const learned = state.vocabulary?.[setId]?.learned?.length ?? 0;
    return Math.round((learned / total) * 100);
  }

  function getGrammarPercent(total) {
    if (!total) return 0;
    const learned = state.grammar?.learned?.length ?? 0;
    return Math.round((learned / total) * 100);
  }

  function markCharLearned(module, id) {
    dispatch({ type: 'MARK_CHAR_LEARNED', payload: { module, id } });
  }

  function markWordLearned(setId, id) {
    dispatch({ type: 'MARK_WORD_LEARNED', payload: { setId, id } });
  }

  function markGrammarLearned(id) {
    dispatch({ type: 'MARK_GRAMMAR_LEARNED', payload: { id } });
  }

  function recordQuizScore(module, score, total, mode, setId = null) {
    dispatch({ type: 'RECORD_QUIZ_SCORE', payload: { module, setId, score, total, mode } });
    dispatch({ type: 'UPDATE_STREAK' });
  }

  return {
    state,
    isCharLearned,
    isWordLearned,
    isGrammarLearned,
    getModulePercent,
    getVocabSetPercent,
    getGrammarPercent,
    markCharLearned,
    markWordLearned,
    markGrammarLearned,
    recordQuizScore,
    totalXP: state.overall.totalXP,
    streak: state.overall.streak,
  };
}
