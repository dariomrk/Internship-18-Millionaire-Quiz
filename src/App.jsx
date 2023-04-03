import React from 'react';
import ScoreProvider from './providers/ScoreProvider';
import JokerProvider from './providers/JokerProvider';
import QuestionProvider from './providers/QuestionProvider';

function App() {
  return (
    <ScoreProvider>
      <JokerProvider>
        <QuestionProvider>
          {/* application */}
        </QuestionProvider>
      </JokerProvider>
    </ScoreProvider>
  );
}

export default App;
