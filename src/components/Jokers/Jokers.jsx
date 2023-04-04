import { Card, Button, Group } from '@mantine/core';
import React from 'react';
import { AlignBoxBottomCenter, CircleOff, PhoneCalling } from 'tabler-icons-react';

function Jokers({}) {
  return (
    <Card
      padding="xs"
      radius="md"
      withBorder
    >
      <Group>
        <Button leftIcon={<CircleOff />}>50:50</Button>
        <Button leftIcon={<PhoneCalling />}>Call</Button>
        <Button leftIcon={<AlignBoxBottomCenter />}>Audience</Button>
      </Group>
    </Card>
  );
}

export default Jokers;
