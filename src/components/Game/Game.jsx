import {
  Card, Group, Stack,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import Answers from '../Answers';
import Question from '../Question';
import Jokers from '../Jokers';
import Scoreboard from '../Scoreboard';
import Dialog from '../Dialog';
import { useScore } from '../../providers/ScoreProvider';
import { useDialog, DialogEnum } from '../../providers/DialogProvider';

function Game({}) {
  const [previousScore, setPreviousScore] = useState(null);
  const scoreContext = useScore();
  const dialogContext = useDialog();

  useEffect(() => {
    if (!scoreContext.hasWon) { return; }

    dialogContext.openDialog(DialogEnum.GameEventDialog, { text: 'Congrats! You have won $1,000,000!' });
    scoreContext.reset();
  }, [scoreContext.hasWon]);

  useEffect(() => {
    setPreviousScore(scoreContext.scoreIndex);

    if (previousScore === null) { return; }

    if (scoreContext.scoreIndex <= previousScore) {
      dialogContext.openDialog(DialogEnum.GameEventDialog, { text: 'You lost. Better luck next time!' });
    }
  }, [scoreContext.scoreIndex]);

  return (
    <>
      <Dialog />
      <Card
        ml="auto"
        mr="auto"
        maw={1440}
        w="fit-content"
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
      >
        <Group>
          <Stack>
            <Question />
            <Answers />
          </Stack>
          <Card
            w="fit-content"
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Stack spacing={0}>
              <Jokers />
              <Scoreboard />
            </Stack>
          </Card>
        </Group>
      </Card>
    </>
  );
}

export default Game;
