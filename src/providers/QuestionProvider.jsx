import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import { consumeQuestions, loadQuestions } from '../functions/questions';

const defaultContext = {
  question: null,
  getNext: () => {},
};

export const QuestionContext = createContext(defaultContext);

function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState(loadQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const [nextQuestion, modifiedQuestions] = consumeQuestions(questions);
    setQuestions(modifiedQuestions);
    return nextQuestion;
  });

  return (
    <QuestionContext.Provider value={useMemo(() => ({
      question: currentQuestion,
      getNext: () => {
        const [nextQuestion, modifiedQuestions] = consumeQuestions(questions);
        setCurrentQuestion(nextQuestion);
        setQuestions(modifiedQuestions);
      },
    }), [questions, currentQuestion])}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestion = () => useContext(QuestionContext);

export default QuestionProvider;
