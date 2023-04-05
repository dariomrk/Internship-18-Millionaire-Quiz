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
  hasLost: false,
  next: () => {},
  reset: () => {},
};

export const ScoreContext = createContext(defaultContext);

function ScoreProvider({ children }) {
  const [scoreState, setScoreState] = useState({ scoreIndex: 0, hasLost: false });

  return (
    <ScoreContext.Provider value={useMemo(() => ({
      scoreIndex: scoreState.scoreIndex,
      scores,
      hasWon: scoreState >= scores.length - 1,
      hasLost: scoreState.hasLost,
      next: () => {
        if (scoreState >= scores.length - 1) return;
        setScoreState({
          hasLost: false,
          scoreIndex: scoreState.scoreIndex + 1,
        });
      },
      reset: () => {
        setScoreState({
          hasLost: true,
          scoreIndex: 0,
        });
      },
    }), [scoreState])}
    >
      {children}
    </ScoreContext.Provider>
  );
}

export const useScore = () => useContext(ScoreContext);

export default ScoreProvider;
