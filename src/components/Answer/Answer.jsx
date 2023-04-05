import { Button } from '@mantine/core';
import React, { useEffect } from 'react';
import { useQuestion } from '../../providers/QuestionProvider';
import { useScore } from '../../providers/ScoreProvider';

function Answer({
  answer, index, openModalCallback, setAnswerCallback, disabled,
}) {
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
