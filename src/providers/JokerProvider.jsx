import React, { createContext, useContext, useReducer } from 'react';

const defaultContext = {
  fiftyFifty: true,
  call: true,
  audience: true,
  consumeJoker: () => {},
  reset: () => {},
};

export const JokerContext = createContext(defaultContext);

export const jokerReducer = (state, action) => {
  switch (action.type) {
    case 'fiftyFifty':
      return { ...state, fiftyFifty: false };
    case 'call':
      return { ...state, call: false };
    case 'audience':
      return { ...state, audience: false };
    case 'reset':
      return {
        ...state,
        fiftyFifty: true,
        call: true,
        audience: true,
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
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <JokerContext.Provider value={{
      fiftyFifty: state.fiftyFifty,
      call: state.call,
      audience: state.audience,
      consumeJoker: (jokerName) => { dispatch({ type: jokerName }); },
      reset: () => { dispatch({ type: 'reset' }); },
    }}
    >
      {children}
    </JokerContext.Provider>
  );
}

export const useJoker = () => useContext(JokerContext);

export default JokerProvider;
