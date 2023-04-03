import React from 'react';
import ScoreProvider from './providers/ScoreProvider';
import JokerProvider from './providers/JokerProvider';
import QuestionProvider from './providers/QuestionProvider';
import Test from './components/Test';

function App() {
  return (
    <ScoreProvider>
      <JokerProvider>
        <QuestionProvider>
          <Test />
          {/* application */}
        </QuestionProvider>
      </JokerProvider>
    </ScoreProvider>
  );
}

export default App;
