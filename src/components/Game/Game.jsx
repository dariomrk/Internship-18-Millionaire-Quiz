import { Card, Stack } from '@mantine/core';
import React from 'react';
import Answer from '../Answer';
import Question from '../Question';
import Jokers from '../Jokers';
import Scoreboard from '../Scoreboard';

function Game({}) {
  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
    >
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
    </Card>
  );
}

export default Game;
