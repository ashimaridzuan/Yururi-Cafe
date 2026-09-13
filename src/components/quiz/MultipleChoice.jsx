import React from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import { useProgress } from '../../hooks/useProgress';
import Button from '../ui/Button';

export default function MultipleChoice({ questions, module, setId, onComplete }) {
  const quiz = useQuiz();
  const { recordQuizScore } = useProgress();

  React.useEffect(() => {
    quiz.startQuiz(questions);
  }, []);

  function handleAnswer(option) {
    if (quiz.status !== 'answering') return;
    quiz.answerQuestion(option);
  }

  function handleNext() {
    if (quiz.status === 'answered') {
      if (quiz.currentIndex >= quiz.totalQuestions - 1) {
        recordQuizScore(module, quiz.score + (quiz.isCorrect ? 1 : 0), quiz.totalQuestions, 'multiple-choice', setId);
        quiz.nextQuestion();
      } else {
        quiz.nextQuestion();
      }
    }
  }

  if (quiz.status === 'idle') return null;

  if (quiz.status === 'complete') {
    const finalScore = quiz.score;
    const total = quiz.totalQuestions;
    const pct = Math.round((finalScore / total) * 100);
    return (
      <div className="quiz-result">
        <div className="quiz-result__score">{finalScore}/{total}</div>
        <div className="quiz-result__label">{pct}% correct</div>
        <p className="quiz-result__message">
          {pct >= 80 ? '🎉 Excellent! Snoopy Nova is proud of you!' : pct >= 50 ? '👍 Good effort! Keep practicing!' : '🌸 Keep at it — every mistake is a lesson!'}
        </p>
        <div className="quiz-result__actions">
          <Button variant="primary" onClick={() => quiz.startQuiz(questions)}>Try Again</Button>
          <Button variant="ghost" onClick={onComplete}>Back to Quiz</Button>
        </div>
      </div>
    );
  }

  const q = quiz.currentQuestion;
  if (!q) return null;

  return (
    <div className="quiz">
      <div className="quiz__counter">Question {quiz.currentIndex + 1} of {quiz.totalQuestions}</div>
      <div className="quiz__question">
        <span className="quiz__question-label">{q.questionLabel ?? 'What is the reading?'}</span>
        {q.question}
      </div>
      <div className="quiz__options">
        {q.options.map((opt) => {
          const isSelected = quiz.selectedAnswer === opt;
          const isCorrect = quiz.status === 'answered' && opt === q.answer;
          const isWrong = quiz.status === 'answered' && isSelected && opt !== q.answer;
          const classes = [
            'quiz__option',
            isCorrect && 'quiz__option--correct',
            isWrong && 'quiz__option--incorrect',
            isSelected && 'quiz__option--selected',
          ].filter(Boolean).join(' ');
          return (
            <button
              key={opt}
              className={classes}
              onClick={() => handleAnswer(opt)}
              disabled={quiz.status === 'answered'}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {quiz.status === 'answered' && (
        <>
          <div className={`quiz__feedback quiz__feedback--${quiz.isCorrect ? 'correct' : 'incorrect'}`}>
            {quiz.isCorrect ? '✅ Correct!' : `❌ The answer is: ${q.answer}`}
          </div>
          <Button variant="primary" full onClick={handleNext} style={{ marginTop: '1rem' }}>
            {quiz.currentIndex >= quiz.totalQuestions - 1 ? 'See Results' : 'Next Question'}
          </Button>
        </>
      )}
    </div>
  );
}
