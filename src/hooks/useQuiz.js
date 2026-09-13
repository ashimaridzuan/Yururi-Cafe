import { useReducer, useCallback } from 'react';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const initialQuizState = {
  status: 'idle',
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  isCorrect: null,
  score: 0,
  results: [],
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        ...initialQuizState,
        status: 'answering',
        questions: shuffle(action.payload),
        currentIndex: 0,
        score: 0,
        results: [],
      };
    case 'ANSWER': {
      const correct = action.payload === state.questions[state.currentIndex].answer;
      return {
        ...state,
        status: 'answered',
        selectedAnswer: action.payload,
        isCorrect: correct,
        score: correct ? state.score + 1 : state.score,
        results: [...state.results, { correct, selected: action.payload }],
      };
    }
    case 'NEXT': {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { ...state, status: 'complete' };
      }
      return {
        ...state,
        status: 'answering',
        currentIndex: nextIndex,
        selectedAnswer: null,
        isCorrect: null,
      };
    }
    case 'RESET':
      return initialQuizState;
    default:
      return state;
  }
}

export function useQuiz() {
  const [quizState, dispatch] = useReducer(quizReducer, initialQuizState);

  const startQuiz = useCallback((questions) => {
    dispatch({ type: 'START', payload: questions });
  }, []);

  const answerQuestion = useCallback((answer) => {
    dispatch({ type: 'ANSWER', payload: answer });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT' });
  }, []);

  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const currentQuestion = quizState.questions[quizState.currentIndex] ?? null;
  const totalQuestions = quizState.questions.length;
  const progress = totalQuestions > 0 ? ((quizState.currentIndex) / totalQuestions) * 100 : 0;

  return {
    ...quizState,
    currentQuestion,
    totalQuestions,
    progress,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
  };
}
