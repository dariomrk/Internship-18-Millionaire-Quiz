import {
  Card, Button, Group, Tooltip,
} from '@mantine/core';
import React, { useEffect } from 'react';
import { AlignBoxBottomCenter, CircleOff, PhoneCalling } from 'tabler-icons-react';
import { JokerActionsEnum, useJoker } from '../../providers/JokerProvider';
import { useQuestion } from '../../providers/QuestionProvider';
import { useDialog, DialogEnum } from '../../providers/DialogProvider';

function Jokers({}) {
  const jokerContext = useJoker();
  const questionContext = useQuestion();
  const dialogContext = useDialog();

  useEffect(() => {
    if (questionContext.question === null) {
      jokerContext.reset();
      return;
    }

    jokerContext.setCurrentQuestion(questionContext.question.id);
  }, [questionContext.question]);

  useEffect(() => {
    if (jokerContext.audience === null) { return; }
    dialogContext.openDialog(DialogEnum.JokerHintDialog, {});
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
              jokerContext.consumeJoker(JokerActionsEnum.FiftyFifty);
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
              jokerContext.consumeJoker(JokerActionsEnum.Call);
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
              jokerContext.consumeJoker(JokerActionsEnum.Audience);
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
