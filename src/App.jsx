import React from 'react';
import ScoreProvider from './providers/ScoreProvider';
import JokerProvider from './providers/JokerProvider';
import QuestionProvider from './providers/QuestionProvider';
import DialogProvider from './providers/DialogProvider';
import Game from './components/Game';

function App() {
  return (
    <ScoreProvider>
      <JokerProvider>
        <QuestionProvider>
          <DialogProvider>
            <Game />
          </DialogProvider>
        </QuestionProvider>
      </JokerProvider>
    </ScoreProvider>
  );
}

export default App;
