import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Timer, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

const COLORS = [
    { id: 'red', bg: 'bg-red-500', shadow: 'shadow-red-500/50', border: 'border-red-400', active: 'bg-red-300' },
    { id: 'blue', bg: 'bg-blue-500', shadow: 'shadow-blue-500/50', border: 'border-blue-400', active: 'bg-blue-300' },
    { id: 'green', bg: 'bg-green-500', shadow: 'shadow-green-500/50', border: 'border-green-400', active: 'bg-green-300' },
    { id: 'yellow', bg: 'bg-yellow-500', shadow: 'shadow-yellow-500/50', border: 'border-yellow-400', active: 'bg-yellow-300' }
];

const ROUNDS_TO_WIN = 7;

export const SimonSaysMinigame = ({ onComplete, onFail, totalRounds = 7, initialCount = 1, initialLives = 3, showTimer = true }) => {
    const { playSFX } = useAudio();
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [gameState, setGameState] = useState('idle'); // 'idle', 'prep_round', 'showing', 'prep_input', 'input', 'round_success', 'success', 'fail'
    const [activeButton, setActiveButton] = useState(null);
    const [round, setRound] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45);
    const [lives, setLives] = useState(initialLives);
    const timerRef = useRef(null);

    const startNextSequence = useCallback((currentSeq) => {
        let nextSequence = [...currentSeq];
        if (nextSequence.length === 0) {
            // First round of the game
            for (let i = 0; i < initialCount; i++) {
                nextSequence.push(Math.floor(Math.random() * 4));
            }
        } else {
            nextSequence.push(Math.floor(Math.random() * 4));
        }
        setSequence(nextSequence);
        setUserSequence([]);
        setGameState('showing');
    }, [initialCount]);

    const startGame = () => {
        setRound(1);
        setLives(initialLives);
        setSequence([]);
        setUserSequence([]);
        setTimeLeft(45);
        setGameState('prep_round');
        playSFX('click');
    };

    // Auto-start round after prep
    useEffect(() => {
        if (gameState === 'prep_round') {
            const timer = setTimeout(() => {
                startNextSequence(sequence);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [gameState, sequence, startNextSequence]);

    // Auto-start input after prep
    useEffect(() => {
        if (gameState === 'prep_input') {
            const timer = setTimeout(() => {
                setGameState('input');
                playSFX('transition');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [gameState, playSFX]);

    // Timer Logic
    useEffect(() => {
        if (showTimer && gameState !== 'idle' && gameState !== 'success' && gameState !== 'fail' && !gameState.includes('prep') && gameState !== 'round_success' && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setGameState('fail');
                        playSFX('fail');
                        setTimeout(onFail, 2000);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [gameState, timeLeft, onFail, playSFX, showTimer]);

    // Play Sequence Logic
    useEffect(() => {
        if (gameState === 'showing' && sequence.length > 0) {
            let i = 0;
            // Delay before starting the sequence playback
            const startDelay = setTimeout(() => {
                const interval = setInterval(() => {
                    const colorIdx = sequence[i];
                    setActiveButton(colorIdx);
                    playSFX('click');

                    setTimeout(() => {
                        setActiveButton(null);
                    }, 400);

                    i++;
                    if (i >= sequence.length) {
                        clearInterval(interval);
                        // Delay before "Your turn" message
                        setTimeout(() => setGameState('prep_input'), 1000);
                    }
                }, 800);

                return () => clearInterval(interval);
            }, 600); // reduced delay to 0.6s since we already have the prep screen

            return () => clearTimeout(startDelay);
        }
    }, [gameState, sequence, playSFX]);

    const handleButtonClick = (idx) => {
        if (gameState !== 'input') return;

        setActiveButton(idx);
        playSFX('click');
        setTimeout(() => setActiveButton(null), 200);

        const newUserSequence = [...userSequence, idx];
        setUserSequence(newUserSequence);

        // Check correct
        if (idx !== sequence[userSequence.length]) {
            playSFX('fail');
            setLives(prev => {
                const nextLives = prev - 1;
                if (nextLives <= 0) {
                    setGameState('fail');
                    setTimeout(onFail, 2000);
                } else {
                    // One more chance for this round
                    setUserSequence([]);
                    setGameState('prep_round');
                }
                return nextLives;
            });
            return;
        }

        // Check round complete
        if (newUserSequence.length === sequence.length) {
            // Locking input briefly before transition
            setGameState('showing'); // Using showing tells the game we are in a transition phase

            setTimeout(() => {
                if (round >= totalRounds) {
                    setGameState('success');
                    playSFX('success');
                    setTimeout(onComplete, 2000);
                } else {
                    setGameState('round_success');
                    playSFX('success');
                    setTimeout(() => {
                        setGameState('prep_round');
                        setRound(prev => prev + 1);
                    }, 2000);
                }
            }, 500);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b14]/95 backdrop-blur-xl"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-center max-w-5xl w-full">
                    {/* Info Panel */}
                    <div className="w-full lg:w-72 bg-white/5 border border-[#0098CD]/30 rounded-2xl p-6 text-left shadow-xl">
                        <h3 className="text-[#0098CD] font-pixel text-xs mb-4 flex items-center gap-2">
                            <Brain size={16} /> GESTIÓN DE FLUJO
                        </h3>
                        <p className="text-white/70 font-mono text-sm mb-6 leading-relaxed">
                            Como Project Manager, debes recordar el orden de las prioridades técnicas. Sigue la secuencia de los módulos para mantener la estabilidad.
                        </p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-pixel">
                                <span className="text-white/40 uppercase">Ronda</span>
                                <span className="text-[#0098CD]">{round} / {totalRounds}</span>
                            </div>
                            {showTimer && (
                                <div className="flex justify-between items-center text-xs font-pixel">
                                    <span className="text-white/40 uppercase">Tiempo</span>
                                    <span className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center text-xs font-pixel">
                                <span className="text-white/40 uppercase">Oportunidades</span>
                                <div className="flex gap-1 flex-wrap justify-end">
                                    {[...Array(initialLives)].map((_, i) => (
                                        <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < lives ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-white/10'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Game Grid */}
                    <div className="relative flex flex-col items-center">
                        <div className="grid grid-cols-2 gap-4 md:gap-6 p-4 bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
                            {COLORS.map((color, idx) => (
                                <motion.button
                                    key={color.id}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleButtonClick(idx)}
                                    className={`w-32 h-32 md:w-44 md:h-44 rounded-2xl border-4 transition-all duration-200 
                                        ${color.bg} ${color.border} ${color.shadow}
                                        ${activeButton === idx ? 'brightness-150 scale-105 shadow-[0_0_40px_rgba(255,255,255,0.6)]' : 'opacity-40 grayscale-[0.3]'}
                                        ${gameState !== 'input' ? 'cursor-default' : ''}`}
                                />
                            ))}
                        </div>

                        {/* Overlays */}
                        {gameState === 'idle' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-3xl z-10 p-4">
                                <div className="text-center">
                                    <Play size={48} className="text-[#0098CD] mx-auto mb-4 animate-pulse" />
                                    <h3 className="text-white font-pixel text-sm mb-6 uppercase tracking-widest">
                                        ¿Listo para sincronizar el equipo?
                                    </h3>
                                    <button
                                        onClick={startGame}
                                        className="pixel-button-unir !bg-[#0098CD] !text-white text-xs px-8 py-4"
                                    >
                                        INICIAR SINCRONIZACIÓN
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Automated Pre-Round Overlay */}
                        {gameState === 'prep_round' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-3xl z-10 p-4 text-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <h3 className="text-white font-pixel text-xl mb-4 uppercase text-[#0098CD]">
                                        RONDA {round}
                                    </h3>
                                    <p className="text-white/40 font-mono text-[10px] mb-6 uppercase tracking-widest">
                                        Analizando flujo de prioridades...
                                    </p>
                                    <div className="w-48 bg-white/10 h-1.5 rounded-full overflow-hidden mx-auto">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 1, ease: "linear" }}
                                            className="bg-[#0098CD] h-full shadow-[0_0_10px_#0098CD]"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {/* Automated Pre-Input Overlay */}
                        {gameState === 'prep_input' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-3xl z-10 p-4 text-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <Brain size={48} className="text-[#0098CD] mx-auto mb-4 animate-bounce" />
                                    <h3 className="text-white font-pixel text-lg mb-2 uppercase text-[#0098CD]">
                                        ¡TU TURNO!
                                    </h3>
                                    <p className="text-white/60 font-mono text-xs mb-6 max-w-[200px] mx-auto">
                                        Presiona los módulos en el orden correcto. ¡Atento!
                                    </p>
                                    <div className="w-48 bg-white/10 h-1.5 rounded-full overflow-hidden mx-auto">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 1, ease: "linear" }}
                                            className="bg-yellow-500 h-full shadow-[0_0_10px_#eab308]"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {gameState === 'round_success' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-3xl z-10 p-4 text-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                                    <h3 className="text-white font-pixel text-lg mb-2 uppercase text-green-500">
                                        ¡Prioridad Alcanzada!
                                    </h3>
                                    <p className="text-white/60 font-mono text-xs mb-6 max-w-[200px] mx-auto">
                                        Has sincronizado el módulo correctamente. Preparando siguiente fase de despliegue...
                                    </p>
                                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 1 }}
                                            className="bg-green-500 h-full"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        {(gameState === 'success' || gameState === 'fail') && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-lg rounded-3xl z-20">
                                <div className="text-center">
                                    {gameState === 'success' ? (
                                        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                                    ) : (
                                        <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
                                    )}
                                    <h3 className={`font-pixel text-xl uppercase ${gameState === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameState === 'success' ? 'EQUIPO SINCRONIZADO' : 'FALLO EN LA CADENA'}
                                    </h3>
                                    <p className="text-white/40 font-pixel text-[8px] mt-2 uppercase tracking-widest">
                                        {gameState === 'success' ? 'El flujo de trabajo es impecable' : 'Se perdió la secuencia de prioridades'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
