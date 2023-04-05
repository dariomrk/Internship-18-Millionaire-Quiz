import {
  Button, Card, SimpleGrid, Modal, Stack, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState, useEffect } from 'react';
import { useJoker } from '../../providers/JokerProvider';
import { useQuestion } from '../../providers/QuestionProvider';
import { useScore } from '../../providers/ScoreProvider';

function Answers() {
  const jokerContext = useJoker();
  const questionContext = useQuestion();
  const scoreContext = useScore();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!showAnswer) return;

    setTimeout(() => {
      if (selectedQuestion === questionContext.question.answer) {
      // correct
        questionContext.getNext();
        scoreContext.next();
      } else {
      // incorrect
        jokerContext.reset();
        questionContext.getNext();
        scoreContext.reset();
      }
      setShowAnswer(false);
    }, 3000);
  }, [showAnswer]);

  return (
    <Card>
      <SimpleGrid cols={2}>
        {questionContext.question?.options.map((option, i) => (
          <Button
            key={option}
            variant="filled"
            color={(showAnswer
              ? i === questionContext.question.answer
                ? 'green'
                : 'red'
              : 'blue')}
            miw={400}
            disabled={(() => {
              if (jokerContext.fiftyFifty) {
                return false;
              }
              if (jokerContext.currentQuestionId !== questionContext.question.id) {
                return false;
              }

              const wrongEnabledIndex = (
                questionContext.question.answer === 0
                  ? 3
                  : questionContext.question.answer - 1
              );

              return i !== questionContext.question.answer && wrongEnabledIndex !== i;
            })()}
            onClick={() => {
              setShowAnswer(true);
              setSelectedQuestion(i);
            }}
          >
            {String.fromCharCode(i + 65)}
            {': '}
            {option}
          </Button>
        ))}
      </SimpleGrid>
    </Card>
  );
}

export default Answers;
