import {
  Button, Card, SimpleGrid,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useJoker } from '../../providers/JokerProvider';
import { useQuestion } from '../../providers/QuestionProvider';
import { useScore } from '../../providers/ScoreProvider';
import { DialogEnum, useDialog } from '../../providers/DialogProvider';

function Answers() {
  const jokerContext = useJoker();
  const questionContext = useQuestion();
  const scoreContext = useScore();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const dialogContext = useDialog();
  const [fiftyFiftyUsedOnId, setFiftyFiftyUsedOnId] = useState(null);

  useEffect(() => {
    if (jokerContext.fiftyFifty) { setFiftyFiftyUsedOnId(null); }

    setFiftyFiftyUsedOnId(questionContext.question.id);
  }, [jokerContext.fiftyFifty]);

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
      setSelectedQuestion(null);
    }, 3000);
  }, [showAnswer]);

  return (
    <Card>
      <SimpleGrid cols={2}>
        {questionContext.question?.options.map((option, i) => (
          <Button
            key={option}
            miw={400}
            variant={(() => {
              if (i === selectedQuestion) {
                return 'filled';
              }
              if (!showAnswer) {
                return 'light';
              }
              return (selectedQuestion === i || questionContext.question.answer === i
                ? 'filled'
                : 'light');
            })()}
            color={(() => {
              if (!showAnswer) { return 'blue'; }
              return (i === questionContext.question.answer ? 'green' : 'red');
            })()}
            disabled={(() => {
              if (fiftyFiftyUsedOnId !== questionContext.question.id) return false;
              if (jokerContext.fiftyFifty) return false;
              if (jokerContext.currentQuestionId !== questionContext.question.id) return false;
              const wrongEnabledIndex = (
                questionContext.question.answer === 0
                  ? 3
                  : questionContext.question.answer - 1
              );
              return i !== questionContext.question.answer && wrongEnabledIndex !== i;
            })()}
            onClick={() => {
              setSelectedQuestion(i);
              dialogContext.openDialog(DialogEnum.ConfirmationDialog, {
                onAccept: () => {
                  setShowAnswer(true);
                },
                onDeny: () => { setSelectedQuestion(null); },
                text: `${questionContext.question.options[i]} is your final answer?`,
              });
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
