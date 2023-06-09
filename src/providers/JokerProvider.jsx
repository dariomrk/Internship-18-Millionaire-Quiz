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
  Reset: Symbol(-1),
});

export const jokerReducer = (state, action) => {
  switch (action.type) {
    case JokerActionsEnum.FiftyFifty:
      return { ...state, fiftyFifty: false, currentQuestionId: action.questionId };
    case JokerActionsEnum.Call:
      return { ...state, call: false, currentQuestionId: action.questionId };
    case JokerActionsEnum.Audience:
      return { ...state, audience: false, currentQuestionId: action.questionId };
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
    currentQuestionId: '',
  });

  return (
    <JokerContext.Provider value={useMemo(() => ({
      fiftyFifty: state.fiftyFifty,
      call: state.call,
      audience: state.audience,
      currentQuestionId: state.currentQuestionId,
      consumeJoker: (jokerName, questionId) => { dispatch({ type: jokerName, questionId }); },
      reset: () => { dispatch({ type: JokerActionsEnum.Reset }); },
    }), [state.fiftyFifty, state.call, state.audience, state.currentQuestionId])}
    >
      {children}
    </JokerContext.Provider>
  );
}

export const useJoker = () => useContext(JokerContext);

export default JokerProvider;
