import { Text } from '@mantine/core';
import React from 'react';
import { useQuestion } from '../../providers/QuestionProvider';

function Question() {
  const questionContext = useQuestion();
  console.log(questionContext.question?.question, questionContext.question?.answer); // TODO remove
  return (
    <Text
      align="center"
      weight={600}
    >
      {questionContext.question?.question ?? 'The questions appear here'}

    </Text>
  );
}

export default Question;
