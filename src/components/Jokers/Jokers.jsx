import {
  Card, Button, Group, Tooltip,
} from '@mantine/core';
import React, { useEffect } from 'react';
import { AlignBoxBottomCenter, CircleOff, PhoneCalling } from 'tabler-icons-react';
import { JokerActionsEnum, useJoker } from '../../providers/JokerProvider';
import { useQuestion } from '../../providers/QuestionProvider';
import { useDialog, DialogEnum } from '../../providers/DialogProvider';

function getRandomItem(arr, specifiedItem, chance) {
  const randomNum = Math.random();
  if (randomNum < chance) {
    return specifiedItem;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function Jokers() {
  const jokerContext = useJoker();
  const questionContext = useQuestion();
  const dialogContext = useDialog();

  useEffect(() => {
    if (questionContext.question === null) {
      jokerContext.reset();
    }
  }, [questionContext.question]);

  useEffect(() => {
    if (jokerContext.call) { return; }

    const calculatedAnswer = getRandomItem(
      questionContext.question.options,
      questionContext.question.options[questionContext.question.answer],
      0.9,
    );
    dialogContext.openDialog(
      DialogEnum.GameEventDialog,
      { text: `Hey! I'm pretty sure the correct answer is "${calculatedAnswer}".` },
    );
  }, [jokerContext.call]);

  useEffect(() => {
    if (jokerContext.audience) { return; }

    const calculatedAnswer = getRandomItem(
      questionContext.question.options,
      questionContext.question.options[questionContext.question.answer],
      0.8,
    );
    dialogContext.openDialog(
      DialogEnum.GameEventDialog,
      { text: `The majority of the audience says that "${calculatedAnswer}" is the correct answer. We're gonna see if they are wrong very soon...` },
    );
  }, [jokerContext.audience]);

  return (
    <Card
      padding="xs"
      radius="md"
      withBorder
    >
      <Group>
        <Tooltip.Floating label="Eliminates two incorrect answer options">
          <Button
            onClick={() => {
              jokerContext.consumeJoker(JokerActionsEnum.FiftyFifty, questionContext.question.id);
            }}
            leftIcon={<CircleOff />}
            disabled={!jokerContext.fiftyFifty}
          >
            50:50
          </Button>
        </Tooltip.Floating>
        <Tooltip.Floating label="Gives you 90% chance of getting the right answer back">
          <Button
            onClick={() => {
              jokerContext.consumeJoker(JokerActionsEnum.Call, questionContext.question.id);
            }}
            leftIcon={<PhoneCalling />}
            disabled={!jokerContext.call}
          >
            Call
          </Button>
        </Tooltip.Floating>
        <Tooltip.Floating label="Gives you 80% chance of getting the right answer back">
          <Button
            onClick={() => {
              jokerContext.consumeJoker(JokerActionsEnum.Audience, questionContext.question.id);
            }}
            leftIcon={<AlignBoxBottomCenter />}
            disabled={!jokerContext.audience}
          >
            Audience
          </Button>
        </Tooltip.Floating>
      </Group>
    </Card>
  );
}

export default Jokers;
