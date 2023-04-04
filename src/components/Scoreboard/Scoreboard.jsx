import { Stack, Text } from '@mantine/core';
import React from 'react';
import { useScore } from '../../providers/ScoreProvider';

function Scoreboard({}) {
  const scoreboardContext = useScore();

  return (
    <Stack style={{ flexDirection: 'column-reverse' }}>
      {scoreboardContext.scores.map((score, i) => {
        const isCurrentScore = scoreboardContext.scoreIndex === i;

        return (
          <Text
            key={score}
            color={(isCurrentScore ? 'blue' : 'black')}
            weight={(isCurrentScore ? 'bolder' : 'normal')}
            align="right"
          >
            {score}
          </Text>
        );
      })}
    </Stack>
  );
}

export default Scoreboard;
