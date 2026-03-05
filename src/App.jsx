import React, { useState } from 'react';
import { useGameStore } from './store/useGameStore';
import { StartScreen } from './features/game/StartScreen';
import { GameScreen } from './features/game/GameScreen';
import { LoadingScreen } from './features/game/LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';
import { DebugMenu } from './features/debug/DebugMenu';

function App() {
  const gameState = useGameStore((state) => state.gameState);
  const [isPreloaded, setIsPreloaded] = useState(false);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {!isPreloaded ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <LoadingScreen onFinished={() => setIsPreloaded(true)} />
          </motion.div>
        ) : gameState === 'start' ? (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <StartScreen />
          </motion.div>
        ) : (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <GameScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <DebugMenu />
    </div>
  );
}

export default App;
