import React, {
  createContext, useContext, useReducer, useMemo,
} from 'react';

const defaultContext = {
  fiftyFifty: true,
  call: true,
  audience: true,
  currentQuestionId: '',
  consumeJoker: () => {},
  setCurrentQuestion: () => {},
  reset: () => {},
};

export const JokerContext = createContext(defaultContext);

export const JokerActionsEnum = Object.freeze({
  FiftyFifty: Symbol(1),
  Call: Symbol(2),
  Audience: Symbol(3),
  SetCurrentQuestion: Symbol(0),
  Reset: Symbol(-1),
});

export const jokerReducer = (state, action) => {
  switch (action.type) {
    case JokerActionsEnum.FiftyFifty:
      return { ...state, fiftyFifty: false };
    case JokerActionsEnum.Call:
      return { ...state, call: false };
    case JokerActionsEnum.Audience:
      return { ...state, audience: false };
    case JokerActionsEnum.SetCurrentQuestion:
      return { ...state, currentQuestionId: action.questionId };
    case JokerActionsEnum.Reset:
      return {
        ...state,
        fiftyFifty: true,
        call: true,
        audience: true,
        currentQuestionId: '',
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

function JokerProvider({ children }) {
  const [state, dispatch] = useReducer(jokerReducer, {
    fiftyFifty: true,
    call: true,
    audience: true,
  });

  return (
    <JokerContext.Provider value={useMemo(() => ({
      fiftyFifty: state.fiftyFifty,
      call: state.call,
      audience: state.audience,
      consumeJoker: (jokerName) => { dispatch({ type: jokerName }); },
      setCurrentQuestion: (questionId) => {
        dispatch({
          type: JokerActionsEnum.SetCurrentQuestion,
          questionId,
        });
      },
      reset: () => { dispatch({ type: JokerActionsEnum.Reset }); },
    }), [state.fiftyFifty, state.call, state.audience])}
    >
      {children}
    </JokerContext.Provider>
  );
}

export const useJoker = () => useContext(JokerContext);

export default JokerProvider;
