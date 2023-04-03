import React, { createContext, useContext, useState } from 'react';
import { consumeQuestions, loadQuestions } from '../functions/questions';

const defaultContext = {
  question: null,
  getNext: () => {},
};

export const QuestionContext = createContext(defaultContext);

function QuestionProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState(loadQuestions());

  const getNext = () => {
    const [nextQuestion, modifiedQuestions] = consumeQuestions(questions);

    setCurrentQuestion(nextQuestion);
    setQuestions(modifiedQuestions);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <QuestionContext.Provider value={{
      question: currentQuestion,
      getNext,
    }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestion = () => useContext(QuestionContext);

export default QuestionProvider;
