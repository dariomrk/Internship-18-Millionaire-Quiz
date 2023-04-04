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
  JokerHintDialog: Symbol(1),
  GameEventDialog: Symbol(2),
  CloseDialog: Symbol(0),
});

export const dialogReducer = (state, action) => {
  switch (action.type) {
    case DialogEnum.JokerHintDialog:
      return {
        ...state,
        activeDialog: DialogEnum.JokerHintDialog,
        additionalProps: action.additionalProps,
      };
    case DialogEnum.GameEventDialog:
      return {
        ...state,
        activeDialog: DialogEnum.GameEventDialog,
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
      openDialog: (action, additionalProps = null) => {
        dispatch({ action, additionalProps });
      },
      closeDialog: () => { dispatch({ action: DialogEnum.CloseDialog }); },
    }), [state.activeDialog, state.additionalProps])}
    >
      {children}
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext);

export default DialogProvider;
