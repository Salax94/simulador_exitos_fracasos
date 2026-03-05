import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Timer, CheckCircle2, AlertCircle, LayoutGrid } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

const GRID_SIZE = 4;

export const MemoryPathMinigame = ({ onComplete, onFail, totalRounds = 5, initialCount = 3 }) => {
    const { playSFX } = useAudio();
    const [pattern, setPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    const [gameState, setGameState] = useState('idle'); // 'idle', 'prep_round', 'showing', 'prep_input', 'playing', 'success', 'fail'
    const [timeLeft, setTimeLeft] = useState(60);
    const [lives, setLives] = useState(2);
    const [round, setRound] = useState(1);
    const [wrongCell, setWrongCell] = useState(null);
    const timerRef = useRef(null);

    const generatePattern = useCallback((count) => {
        const newPattern = [];
        while (newPattern.length < count) {
            const r = Math.floor(Math.random() * GRID_SIZE);
            const c = Math.floor(Math.random() * GRID_SIZE);
            if (!newPattern.some(p => p.r === r && p.c === c)) {
                newPattern.push({ r, c });
            }
        }
        return newPattern;
    }, []);

    const startRound = useCallback((r) => {
        const count = initialCount + (r - 1); // Increase difficulty starting from initialCount
        const newPattern = generatePattern(count);
        setPattern(newPattern);
        setUserPattern([]);
        setGameState('showing');
        playSFX('click');

        // Show the pattern for 4 seconds
        setTimeout(() => {
            setGameState('prep_input');
        }, 4000);
    }, [generatePattern, playSFX]);

    const startGame = () => {
        setRound(1);
        setLives(2);
        setTimeLeft(60);
        setGameState('prep_round');
    };

    // Auto-start round after prep
    useEffect(() => {
        if (gameState === 'prep_round') {
            const timer = setTimeout(() => {
                startRound(round);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [gameState, round, startRound]);

    // Auto-start input after prep
    useEffect(() => {
        if (gameState === 'prep_input') {
            const timer = setTimeout(() => {
                setGameState('playing');
                playSFX('transition');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [gameState, playSFX]);

    // Timer logic
    useEffect(() => {
        if ((gameState === 'showing' || gameState === 'playing') && timeLeft > 0) {
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
    }, [gameState, timeLeft, onFail, playSFX]);

    const handleCellClick = (r, c) => {
        if (gameState !== 'playing') return;

        // Check if already selected
        if (userPattern.some(p => p.r === r && p.c === c)) return;

        const isCorrect = pattern.some(p => p.r === r && p.c === c);

        if (isCorrect) {
            const newUserPattern = [...userPattern, { r, c }];
            setUserPattern(newUserPattern);
            playSFX('click');

            if (newUserPattern.length === pattern.length) {
                if (round < totalRounds) {
                    setGameState('success_transition');
                    playSFX('success');
                    setTimeout(() => {
                        setRound(prev => prev + 1);
                        setGameState('prep_round');
                    }, 2000);
                } else {
                    setGameState('success');
                    playSFX('success');
                    setTimeout(onComplete, 2000);
                }
            }
        } else {
            // Error
            setWrongCell({ r, c });
            playSFX('fail');

            setLives(prev => {
                const nextLives = prev - 1;
                if (nextLives <= 0) {
                    setGameState('fail');
                    setTimeout(onFail, 2000);
                } else {
                    // Retry current round
                    setTimeout(() => {
                        setWrongCell(null);
                        setUserPattern([]);
                        setGameState('showing');
                        setTimeout(() => {
                            setGameState('prep_input');
                        }, 3000);
                    }, 800);
                }
                return nextLives;
            });
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a111a]/95 backdrop-blur-xl"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-center max-w-5xl w-full">
                    {/* Info Panel */}
                    <div className="w-full lg:w-72 bg-black/40 border border-[#0098CD]/30 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-[#0098CD] font-pixel text-xs mb-4 flex items-center gap-2">
                            <Shield size={16} /> VALIDACIÓN DE INTEGRIDAD
                        </h3>
                        <p className="text-white/70 font-mono text-[11px] mb-6 leading-relaxed">
                            Como Project Manager, debes asegurar la integridad de los bloques del proyecto. Memoriza los módulos críticos y valídalos para evitar fallos sistémicos.
                        </p>
                        <div className="space-y-4 font-pixel text-[10px]">
                            <div className="flex justify-between items-center">
                                <span className="text-white/40">RONDA</span>
                                <span className="text-[#0098CD]">{round} / {totalRounds}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-white/40">TIEMPO</span>
                                <span className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-[#0098CD]'}`}>{timeLeft}s</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 uppercase">Oportunidades</span>
                                <div className="flex gap-1">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i} className={`w-3 h-3 rounded-full ${i < lives ? 'bg-[#0098CD] shadow-[0_0_8px_rgba(0,152,205,0.5)]' : 'bg-white/10'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-4 gap-2 p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                            {Array.from({ length: 16 }).map((_, i) => {
                                const r = Math.floor(i / GRID_SIZE);
                                const c = i % GRID_SIZE;
                                const isPatternCell = pattern.some(p => p.r === r && p.c === c);
                                const isHighlighted = (gameState === 'showing' && isPatternCell);
                                const isSelected = userPattern.some(p => p.r === r && p.c === c);
                                const isWrong = wrongCell?.r === r && wrongCell?.c === c;

                                return (
                                    <motion.div
                                        key={i}
                                        onClick={() => handleCellClick(r, c)}
                                        whileHover={{ scale: gameState === 'playing' ? 1.05 : 1 }}
                                        whileTap={{ scale: gameState === 'playing' ? 0.95 : 1 }}
                                        className={`w-12 h-12 md:w-16 md:h-16 rounded-lg transition-all border duration-300 relative overflow-hidden group
                                            ${isWrong ? 'bg-red-500 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)] z-20' :
                                                isHighlighted ? 'bg-[#0098CD] border-cyan-400 shadow-[0_0_20px_rgba(0,152,205,0.6)] z-10' :
                                                    isSelected ? 'bg-[#0098CD]/30 border-cyan-500/50' :
                                                        'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-none" />
                                    </motion.div>
                                );
                            })}
                        </div>

                        <AnimatePresence>
                            {/* Idle Overlay */}
                            {gameState === 'idle' && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-2xl z-20 p-4"
                                >
                                    <div className="text-center">
                                        <LayoutGrid size={48} className="text-[#0098CD] mx-auto mb-4 animate-pulse" />
                                        <h3 className="text-white font-pixel text-sm mb-6 uppercase tracking-widest text-[#0098CD]">
                                            Integridad de Módulos
                                        </h3>
                                        <button
                                            onClick={startGame}
                                            className="pixel-button-unir !bg-[#0098CD] !text-white text-xs px-8 py-4"
                                        >
                                            INICIAR ESCANEO
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Automated Pre-Round Overlay */}
                            {gameState === 'prep_round' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-2xl z-20 p-4 text-center">
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                        <h3 className="text-white font-pixel text-xl mb-4 uppercase text-[#0098CD]">
                                            RONDA {round}
                                        </h3>
                                        <p className="text-white/40 font-mono text-[10px] mb-6 uppercase tracking-widest">
                                            Analizando integridad de sistemas...
                                        </p>
                                        <div className="w-48 bg-white/10 h-1.5 rounded-full overflow-hidden mx-auto">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 2, ease: "linear" }}
                                                className="bg-[#0098CD] h-full shadow-[0_0_10px_#0098CD]"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* Automated Pre-Input Overlay */}
                            {gameState === 'prep_input' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-2xl z-20 p-4 text-center">
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                        <Brain size={48} className="text-[#0098CD] mx-auto mb-4 animate-bounce" />
                                        <h3 className="text-white font-pixel text-lg mb-2 uppercase text-[#0098CD]">
                                            ¡TU TURNO!
                                        </h3>
                                        <p className="text-white/60 font-mono text-xs mb-6 max-w-[200px] mx-auto">
                                            Selecciona los mismos módulos que se mostraron.
                                        </p>
                                        <div className="w-48 bg-white/10 h-1.5 rounded-full overflow-hidden mx-auto">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 2, ease: "linear" }}
                                                className="bg-yellow-500 h-full shadow-[0_0_10px_#eab308]"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {gameState === 'success_transition' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-2xl z-20 p-4 text-center">
                                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                                        <h3 className="text-white font-pixel text-lg mb-2 uppercase text-green-500">
                                            ¡Validación Exitosa!
                                        </h3>
                                        <p className="text-white/60 font-mono text-xs mb-6 max-w-[200px] mx-auto">
                                            Módulos sincronizados correctamente. Preparando siguiente bloque...
                                        </p>
                                        <div className="w-48 bg-white/10 h-1.5 rounded-full overflow-hidden mx-auto">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 2, ease: "linear" }}
                                                className="bg-green-500 h-full shadow-[0_0_10px_#22c55e]"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {(gameState === 'success' || gameState === 'fail') && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg rounded-2xl z-30"
                                >
                                    {gameState === 'success' ? (
                                        <CheckCircle2 size={64} className="text-green-500 mb-4" />
                                    ) : (
                                        <AlertCircle size={64} className="text-red-500 mb-4" />
                                    )}
                                    <h3 className={`font-pixel text-xl uppercase ${gameState === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameState === 'success' ? 'INTEGRIDAD VALIDADA' : 'SISTEMA COMPROMETIDO'}
                                    </h3>
                                    <p className="text-white/40 font-pixel text-[8px] mt-2 uppercase">
                                        {gameState === 'success' ? 'Has asegurado todos los módulos críticos' : 'El sistema ha detectado una brecha crítica'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
