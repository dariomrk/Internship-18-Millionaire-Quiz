import { Button, Card, SimpleGrid } from '@mantine/core';
import React from 'react';
import { useQuestion } from '../../providers/QuestionProvider';

function Answer({}) {
  const questionContext = useQuestion();

  return (
    <Card>
      <SimpleGrid cols={2}>
        <Button miw={400}>
          A:
          {' '}
          {questionContext.question?.answers[0] ?? 'Option one goes here'}
        </Button>
        <Button miw={400}>
          B:
          {' '}
          {questionContext.question?.answers[0] ?? 'Option two goes here'}
        </Button>
        <Button miw={400}>
          C:
          {' '}
          {questionContext.question?.answers[0] ?? 'Option three goes here'}
        </Button>
        <Button miw={400}>
          D:
          {' '}
          {questionContext.question?.answers[0] ?? 'Option fout goes here'}
        </Button>
      </SimpleGrid>
    </Card>
  );
}

export default Answer;
