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
    // eslint-disable-next-line no-useless-return
    if (jokerContext.fiftyFifty) { return; }
    // TODO disable two answers
  }, [jokerContext.fiftyFifty]);

  useEffect(() => {
    if (jokerContext.call) { return; }
    // TODO add joker hint & answer calculation
    const calculatedAnswer = 'ANSWER';
    dialogContext.openDialog(
      DialogEnum.GameEventDialog,
      { text: `Hey! I'm pretty sure the correct answer is ${calculatedAnswer}.` },
    );
  }, [jokerContext.call]);

  useEffect(() => {
    if (jokerContext.audience) { return; }
    // TODO add joker hint & answer calculation
    const calculatedAnswer = 'ANSWER';
    dialogContext.openDialog(
      DialogEnum.GameEventDialog,
      { text: `The majority of the audience says that ${calculatedAnswer} is the correct answer. We're gonna see if they are wrong very soon...` },
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
