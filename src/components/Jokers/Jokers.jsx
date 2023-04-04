import {
  Card, Button, Group, Tooltip,
} from '@mantine/core';
import React from 'react';
import { AlignBoxBottomCenter, CircleOff, PhoneCalling } from 'tabler-icons-react';
import { JokerActionsEnum, useJoker } from '../../providers/JokerProvider';

function Jokers({}) {
  const jokerContext = useJoker();

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
