import React from 'react';
import { useDialog, DialogEnum } from '../../providers/DialogProvider';
import GameEventDialog from './GameEventDialog';
import ConfirmationDialog from './ConfirmationDialog';

function Dialog() {
  const {
    activeDialog,
    additionalProps,
    closeDialog,
  } = useDialog();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <GameEventDialog
        open={activeDialog === DialogEnum.GameEventDialog}
        onClose={closeDialog}
        {...additionalProps}
      />
      <ConfirmationDialog
        open={activeDialog === DialogEnum.ConfirmationDialog}
        onClose={closeDialog}
        {...additionalProps}
      />
    </>
  );
}

export default Dialog;
