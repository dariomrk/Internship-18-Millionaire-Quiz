import React from 'react';
import {
  Modal, Stack, Text, Button,
} from '@mantine/core';

function ConfirmationDialog({
  open, onAccept, onDeny, onClose, text,
}) {
  const handleClose = () => {
    onDeny();
    onClose();
  };

  return (
    <Modal opened={open} onClose={handleClose} centered>
      <Stack>
        <Text size={20} align="center">
          {text}
        </Text>
        <Button
          variant="light"
          onClick={() => {
            onAccept();
            onClose();
          }}
          color="blue"
        >
          Yes
        </Button>
        <Button
          onClick={handleClose}
          color="red"
        >
          No
        </Button>
      </Stack>
    </Modal>
  );
}

export default ConfirmationDialog;
