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

export const DialogEnum = Object.freeze({
  GameEventDialog: Symbol(1),
  ConfirmationDialog: Symbol(2),
  CloseDialog: Symbol(0),
});

export const dialogReducer = (state, action) => {
  switch (action.type) {
    case DialogEnum.GameEventDialog:
      return {
        ...state,
        activeDialog: DialogEnum.GameEventDialog,
        additionalProps: action.additionalProps,
      };
    case DialogEnum.ConfirmationDialog:
      return {
        ...state,
        activeDialog: DialogEnum.ConfirmationDialog,
        additionalProps: action.additionalProps,
      };
    case DialogEnum.CloseDialog:
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
      openDialog: (type, additionalProps = null) => {
        dispatch({ type, additionalProps });
      },
      closeDialog: () => { dispatch({ type: DialogEnum.CloseDialog }); },
    }), [state.activeDialog, state.additionalProps])}
    >
      {children}
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
