import React, {
  createContext, useContext, useMemo, useReducer,
} from 'react';

const defaultContext = {
  activeDialog: null,
  additionalProps: null,
  openDialog: () => {},
  closeDialog: () => {},
};

export const DialogContext = createContext(defaultContext);

export const DialogActionsEnum = Object.freeze({
  ConfirmationDialog: Symbol(1),
  JokerHintDialog: Symbol(2),
  GameEventDialog: Symbol(3),
  CloseDialog: Symbol(0),
});

export const dialogReducer = (state, action) => {
  switch (action.type) {
    case DialogActionsEnum.ConfirmationDialog:
      return {
        ...state,
        activeDialog: DialogActionsEnum.ConfirmationDialog,
        additionalProps: action.additionalProps,
      };
    case DialogActionsEnum.JokerHintDialog:
      return {
        ...state,
        activeDialog: DialogActionsEnum.JokerHintDialog,
        additionalProps: action.additionalProps,
      };
    case DialogActionsEnum.GameEventDialog:
      return {
        ...state,
        activeDialog: DialogActionsEnum.GameEventDialog,
        additionalProps: action.additionalProps,
      };
    case DialogActionsEnum.CloseDialog:
      return {
        ...state,
        activeDialog: null,
        additionalProps: null,
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

function DialogProvider({ children }) {
  const [state, dispatch] = useReducer(dialogReducer, {
    activeDialog: null,
    additionalProps: null,
  });

  return (
    <DialogContext.Provider value={useMemo(() => ({
      activeDialog: state.activeDialog,
      additionalProps: state.additionalProps,
      openDialog: (action, additionalProps = null) => {
        dispatch({ action, additionalProps });
      },
      closeDialog: () => { dispatch({ action: DialogActionsEnum.CloseDialog }); },
    }), [state.activeDialog, state.additionalProps])}
    >
      {children}
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
