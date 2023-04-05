import { Divider, Stack, Text } from '@mantine/core';
import React from 'react';
import { useScore } from '../../providers/ScoreProvider';

function Scoreboard() {
  const scoreboardContext = useScore();

  return (
    <Stack
      spacing={0}
      style={{ flexDirection: 'column-reverse' }}
    >
      {scoreboardContext.scores.map((score, i) => {
        const isCurrentScore = scoreboardContext.scoreIndex === i;

        return (
          <React.Fragment key={score}>
            <Text
              color={(isCurrentScore ? 'blue' : 'black')}
              weight={(isCurrentScore ? 'bolder' : 'light')}
              align="right"
            >
              {score}
            </Text>
            <Divider my="xs" variant="dotted" />
          </React.Fragment>
        );
      })}
    </Stack>
  );
}

export default Scoreboard;
