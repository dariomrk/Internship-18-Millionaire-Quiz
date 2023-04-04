import { Card } from '@mantine/core';
import React from 'react';
import Answer from '../Answer';
import Question from '../Question';
import Scoreboard from '../Scoreboard';

function Game({}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Scoreboard />
    </Card>
  );
}

export default Game;
