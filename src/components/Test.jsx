import React from 'react';
import { useQuestion } from '../providers/QuestionProvider';

function Test() {
  const { question, getNext } = useQuestion();

  return (
    <>
      <button onClick={() => { getNext(); }}>Next</button>
      <br />
      {question?.question ?? 'no question'}
      <br />
      {question?.options[0] ?? 'no-option'}
      <br />
      {question?.answer ?? 'no-answer'}
    </>
  );
}

export default Test;
