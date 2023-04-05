import { Button } from '@mantine/core';
import React from 'react';
import { useQuestion } from '../../providers/QuestionProvider';
import { useScore } from '../../providers/ScoreProvider';

function Answer({
  answer, index, openModalCallback, setAnswerCallback, disabled,
}) {
  const questionContext = useQuestion();
  const scoreContext = useScore();

  return (
    <Button
      variant="light"
      onClick={() => {
        setAnswerCallback(index);
        openModalCallback();
      }}
      miw={400}
      disabled={disabled}
    >
      D:
      {' '}
      {answer ?? 'Option four goes here'}
    </Button>
  );
}

export default Answer;
