import React from 'react';
import {
  Modal, Stack, Text, Button,
} from '@mantine/core';

function GameEventDialog({ open, onClose, gameEventInfo }) {
  return (
    <Modal opened={open} onClose={onClose} centered>
      <Stack>
        <Text size={20} align="center">
          {gameEventInfo}
        </Text>
        <Button
          onClick={() => {
            onClose();
          }}
          color="red"
        >
          Close
        </Button>
      </Stack>
    </Modal>
  );
}

export default GameEventDialog;
