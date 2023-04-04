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
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState(loadQuestions());

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
