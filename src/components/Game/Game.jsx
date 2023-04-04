import {
  Card, Group, Stack,
} from '@mantine/core';
import React from 'react';
import Answers from '../Answers';
import Question from '../Question';
import Jokers from '../Jokers';
import Scoreboard from '../Scoreboard';

function Game({}) {
  return (
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
  );
}

export default Game;
