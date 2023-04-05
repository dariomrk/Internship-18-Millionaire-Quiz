import React from 'react';
import {
  Modal, Stack, Text, Button,
} from '@mantine/core';

function ConfirmationDialog({
  open, onAccept, onDeny, text,
}) {
  return (
    <Modal opened={open} onClose={onClose} centered>
      <Stack>
        <Text size={20} align="center">
          {text}
        </Text>
        <Button
          variant="light"
          onClick={() => {
            onAccept();
          }}
          color="blue"
        >
          Close
        </Button>
        <Button
          onClick={() => {
            onDeny();
          }}
          color="red"
        >
          Close
        </Button>
      </Stack>
    </Modal>
  );
}

export default ConfirmationDialog;
