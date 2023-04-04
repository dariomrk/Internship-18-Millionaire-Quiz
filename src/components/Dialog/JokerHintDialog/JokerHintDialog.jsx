import React from 'react';
import {
  Modal, Stack, Text, Button,
} from '@mantine/core';

function JokerHintDialog({ open, onClose, jokerHint }) {
  return (
    <Modal opened={open} onClose={onClose} centered>
      <Stack>
        <Text size={20} align="center">
          {jokerHint}
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

export default JokerHintDialog;
