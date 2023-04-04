import React, {
  createContext, useContext, useMemo, useState,
} from 'react';

const scores = [
  100,
  200,
  300,
  500,
  1000,
  2000,
  4000,
  8000,
  16000,
  32000,
  64000,
  125000,
  250000,
  500000,
  1000000,
];

const defaultContext = {
  scoreIndex: 0,
  scores,
  hasWon: false,
  next: () => {},
  reset: () => {},
};

export const ScoreContext = createContext(defaultContext);

function ScoreProvider({ children }) {
  const [currentScoreIndex, setCurrentScoreIndex] = useState(0);

  return (
    <ScoreContext.Provider value={useMemo(() => ({
      scoreIndex: currentScoreIndex,
      scores,
      hasWon: currentScoreIndex >= scores.length - 1,
      next: () => {
        if (currentScoreIndex >= scores.length - 1) return;
        setCurrentScoreIndex(currentScoreIndex + 1);
      },
      reset: () => { setCurrentScoreIndex(0); },
    }), [currentScoreIndex])}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export const useScore = () => useContext(ScoreContext);

export default ScoreProvider;
