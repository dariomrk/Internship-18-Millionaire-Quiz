import React from 'react';
import { useDialog, DialogEnum } from '../../providers/DialogProvider';
import GameEventDialog from './GameEventDialog';
import JokerHintDialog from './JokerHintDialog';

function Dialog({}) {
  const {
    activeDialog,
    additionalProps,
    closeDialog,
  } = useDialog();

  return (
    <>
      <JokerHintDialog
        open={activeDialog === DialogEnum.JokerHintDialog}
        onClose={closeDialog()}
        {...additionalProps}
      />
      <GameEventDialog
        open={activeDialog === DialogEnum.GameEventDialog}
        onClose={closeDialog()}
        {...additionalProps}
      />
    </>
  );
}

export default Dialog;
