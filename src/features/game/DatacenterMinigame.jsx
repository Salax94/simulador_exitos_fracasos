import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Monitor, AlertCircle, CheckCircle2, Timer, Info, Server, Cpu } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

const GRID_SIZE = 6;

// MAPS based on user images
const MAPS = {
    easy: [
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 2, 1, 1],
        [3, 2, 2, 2, 1, 1],
        [3, 4, 4, 2, 1, 1],
        [3, 4, 4, 2, 5, 5],
        [3, 4, 5, 5, 5, 5]
    ],
    hard: [
        [0, 0, 0, 1, 1, 1],
        [0, 0, 1, 1, 1, 4],
        [2, 2, 3, 4, 4, 4],
        [2, 2, 3, 5, 5, 4],
        [2, 3, 3, 3, 5, 5],
        [2, 3, 5, 5, 5, 5]
    ]
};

const REGION_COLORS = [
    'rgba(255, 165, 0, 0.4)',  // Orange/Gray-Light
    'rgba(255, 255, 0, 0.4)',  // Yellow/Purple-Light
    'rgba(169, 169, 169, 0.4)', // Gray/Blue
    'rgba(147, 112, 219, 0.4)', // Purple/Red
    'rgba(135, 206, 250, 0.4)', // Blue/Yellow
    'rgba(139, 69, 19, 0.4)'    // Brown/Peach
];

// Re-map colors specifically for visual fidelity to images if needed
const GET_COLORS = (isHard) => {
    if (isHard) {
        return [
            'rgba(200, 200, 200, 0.5)', // Gray
            'rgba(180, 160, 255, 0.5)', // Purple
            'rgba(180, 220, 255, 0.5)', // Blue
            'rgba(255, 160, 140, 0.5)', // Red/Salmon
            'rgba(255, 255, 160, 0.5)', // Yellow
            'rgba(255, 200, 160, 0.5)'  // Peach/Tan
        ];
    }
    return [
        'rgba(255, 200, 150, 0.5)', // Orange/Tan
        'rgba(255, 255, 180, 0.5)', // Yellow
        'rgba(200, 200, 200, 0.5)', // Grayish
        'rgba(200, 180, 255, 0.5)', // Purple
        'rgba(180, 220, 255, 0.5)', // Blue
        'rgba(220, 200, 180, 0.5)'  // Brown
    ];
};

export const DatacenterMinigame = ({ onComplete, onFail, difficulty = 'easy', noRetry = false }) => {
    const { playSFX } = useAudio();
    const [gameState, setGameState] = useState('start');
    const [timeLeft, setTimeLeft] = useState(difficulty === 'hard' ? 90 : 0);
    const [placedServers, setPlacedServers] = useState([]);
    const [conflicts, setConflicts] = useState([]);
    const timerRef = useRef(null);

    const isHard = difficulty === 'hard';
    const currentMap = MAPS[isHard ? 'hard' : 'easy'];
    const colors = GET_COLORS(isHard);

    // Fixed piece from image: Easy (0,1), Hard (3,0)
    const fixedPos = isHard ? { r: 3, c: 0 } : { r: 0, c: 1 };

    const initGame = useCallback(() => {
        // Initial fixed piece
        setPlacedServers([{ r: fixedPos.r, c: fixedPos.c, fixed: true }]);
        setConflicts([]);
        setTimeLeft(isHard ? 90 : 0);
        setGameState('playing');
        playSFX('start_minigame');
    }, [playSFX, isHard, fixedPos]);

    useEffect(() => {
        if (gameState === 'playing' && isHard && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setGameState('lost');
                        playSFX('fail');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [gameState, timeLeft, playSFX, isHard]);

    // Reactive win detection
    useEffect(() => {
        if (gameState === 'playing' && placedServers.length === GRID_SIZE && conflicts.length === 0) {
            setGameState('won');
            playSFX('success');
        }
    }, [placedServers, conflicts, gameState, playSFX]);

    const checkConflicts = useCallback((servers) => {
        const conflictIndices = new Set();

        for (let i = 0; i < servers.length; i++) {
            const s1 = servers[i];
            for (let j = i + 1; j < servers.length; j++) {
                const s2 = servers[j];

                let hasConflict = false;

                // Rule 1: Same Row
                if (s1.r === s2.r) hasConflict = true;
                // Rule 2: Same Column
                if (s1.c === s2.c) hasConflict = true;
                // Rule 3: Same Diagonal
                if (Math.abs(s1.r - s2.r) === Math.abs(s1.c - s2.c)) hasConflict = true;
                // Rule 4: Same Region (Color)
                if (currentMap[s1.r][s1.c] === currentMap[s2.r][s2.c]) hasConflict = true;

                if (hasConflict) {
                    conflictIndices.add(i);
                    conflictIndices.add(j);
                }
            }
        }
        return Array.from(conflictIndices);
    }, [currentMap]);

    const handleCellClick = (r, c) => {
        if (gameState !== 'playing') return;

        // Prevent clicking on the fixed piece (placedServers[0])
        const targetServer = placedServers.find(s => s.r === r && s.c === c);
        if (targetServer?.fixed) return;

        let newServers;
        if (targetServer) {
            // Remove
            newServers = placedServers.filter(s => !(s.r === r && s.c === c));
            playSFX('click');
        } else {
            // Add
            if (placedServers.length < GRID_SIZE) {
                newServers = [...placedServers, { r, c }];
                playSFX('click');
            } else {
                return; // Board full
            }
        }

        const newConflicts = checkConflicts(newServers);
        setPlacedServers(newServers);
        setConflicts(newConflicts);
    };

    // Auto-win trigger
    useEffect(() => {
        if (gameState === 'playing' && placedServers.length === GRID_SIZE && conflicts.length === 0) {
            setGameState('won');
            playSFX('success');
        }
    }, [placedServers, conflicts, gameState, playSFX]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            >
                <div className="flex flex-col items-center justify-center p-8 bg-[#050b14]/90 backdrop-blur-xl rounded-3xl border border-[#0098CD]/30 shadow-[0_0_50px_rgba(0,152,205,0.15)] max-w-4xl mx-auto min-h-[500px] w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        {gameState === 'start' && (
                            <motion.div
                                key="start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center p-4 flex flex-col items-center"
                            >
                                <div className="bg-[#0098CD]/20 p-4 rounded-full mb-6">
                                    <Cpu size={48} className="text-[#0098CD]" />
                                </div>
                                <h2 className="text-3xl font-pixel text-[#0098CD] mb-6 uppercase tracking-wider">
                                    OPTIMIZACIÓN DATACENTER
                                </h2>
                                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-8 max-w-xl text-center shadow-inner">
                                    <h3 className="text-[#0098CD] font-pixel text-base mb-6 italic tracking-tight uppercase">"CONFIGURACIÓN ESTRATÉGICA DEL DATACENTER"</h3>
                                    <p className="text-white/80 font-mono text-sm mb-8 px-2 leading-relaxed">
                                        Tu misión es posicionar un nodo central en cada una de las seis regiones críticas del mundo. Para evitar interferencias de red catastróficas, ningún servidor puede compartir fila, columna o diagonal con otro.
                                    </p>
                                    <div className="space-y-4 font-mono text-[11px] text-left border-t border-white/10 pt-6">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                            <span className="text-white/90">Pon solo UN servidor dentro de cada color del mapa.</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" />
                                            <span className="text-white/90">No pueden estar en la misma línea (vertical u horizontal) ni en diagonal.</span>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                                            <span className="text-yellow-100 font-bold uppercase">{isHard ? "MODO EMERGENCIA: Tienes 1:30 minutos." : "MODO PRUEBA: Tienes tiempo libre."}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={initGame}
                                    className="group relative px-12 py-4 bg-[#0098CD] text-white font-pixel text-lg rounded-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(0,152,205,0.4)]"
                                >
                                    <span className="relative z-10">INICIAR PROTOCOLO</span>
                                </button>
                            </motion.div>
                        )}

                        {(gameState === 'playing' || gameState === 'won' || gameState === 'lost') && (
                            <motion.div
                                key="playing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full flex flex-col items-center py-4"
                            >
                                {/* Status Bar */}
                                <div className="w-full max-w-lg flex justify-between items-center mb-6 px-4">
                                    <div className="flex items-center gap-4">
                                        {isHard && (
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${timeLeft < 20 ? 'bg-red-500/20 border-red-500/50 text-red-500 animate-pulse' : 'bg-white/5 border-white/10 text-white'}`}>
                                                <Timer size={16} />
                                                <span className="font-pixel text-sm">{formatTime(timeLeft)}</span>
                                            </div>
                                        )}
                                        <div className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-white text-xs font-pixel flex gap-2 items-center">
                                            <Server size={14} className="text-[#0098CD]" />
                                            NODOS: <span className={placedServers.length === GRID_SIZE ? 'text-green-400' : 'text-[#0098CD]'}>{placedServers.length}/{GRID_SIZE}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={initGame}
                                        className="p-2 transition-all hover:rotate-180 hover:text-white text-[#0098CD]"
                                        title="Resetear sistema"
                                    >
                                        <RefreshCcw size={22} />
                                    </button>
                                </div>

                                {/* Centered Game Grid */}
                                <div className="relative p-3 bg-[#050b14] rounded-2xl border border-[#0098CD]/30 shadow-[0_0_40px_rgba(0,152,205,0.2)]">
                                    <div className="grid grid-cols-6 grid-rows-6 gap-2">
                                        {Array.from({ length: 36 }).map((_, i) => {
                                            const r = Math.floor(i / GRID_SIZE);
                                            const c = i % GRID_SIZE;
                                            const regionId = currentMap[r][c];
                                            const server = placedServers.find(s => s.r === r && s.c === c);
                                            const isConflict = server && conflicts.includes(placedServers.indexOf(server));
                                            const isFixed = server?.fixed;

                                            return (
                                                <motion.div
                                                    key={`${r}-${c}`}
                                                    onClick={() => handleCellClick(r, c)}
                                                    whileHover={!isFixed ? { scale: 1.05 } : {}}
                                                    className={`relative w-12 h-12 md:w-16 md:h-16 rounded-xl cursor-pointer flex items-center justify-center transition-all border border-transparent hover:border-white/20`}
                                                    style={{ backgroundColor: colors[regionId] }}
                                                >
                                                    <AnimatePresence>
                                                        {server && (
                                                            <motion.div
                                                                initial={{ scale: 0, rotate: isFixed ? 0 : -45 }}
                                                                animate={{ scale: 1, rotate: 0 }}
                                                                exit={{ scale: 0 }}
                                                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10"
                                                            >
                                                                <Monitor
                                                                    size={isFixed ? 36 : 28}
                                                                    className={`${isConflict ? 'text-red-500' : 'text-white'} drop-shadow-lg`}
                                                                />
                                                                {isFixed && (
                                                                    <div className="absolute -top-1 -right-1 bg-white text-black text-[6px] font-bold px-1 rounded">FIXED</div>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    {isConflict && (
                                                        <motion.div
                                                            className="absolute inset-0 bg-red-500/20 rounded-xl animate-pulse pointer-events-none"
                                                        />
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Interaction Panel */}
                                <div className="mt-8 w-full max-w-md">
                                    <AnimatePresence mode="wait">
                                        {conflicts.length > 0 ? (
                                            <motion.div
                                                key="conflict"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-500 text-xs font-mono text-center justify-center"
                                            >
                                                <AlertCircle size={18} />
                                                INTERFERENCIA DETECTADA: Los servidores no pueden coincidir.
                                            </motion.div>
                                        ) : placedServers.length === GRID_SIZE ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-xs font-mono text-center justify-center"
                                            >
                                                <CheckCircle2 size={18} />
                                                OPTIMIZACIÓN COMPLETADA: Rendimiento de red estabilizado.
                                            </motion.div>
                                        ) : (
                                            <div className="text-white/50 font-mono text-[11px] text-center px-6 leading-relaxed flex items-center justify-center gap-3">
                                                <Info size={14} className="text-[#0098CD]" />
                                                Recuerda: Solo uno por color y que no se crucen en línea o diagonal.
                                            </div>
                                        )}
                                        {placedServers.length === GRID_SIZE && conflicts.length === 0 && gameState === 'playing' && (
                                            <button
                                                onClick={() => setGameState('won')}
                                                className="mt-4 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-[10px] font-pixel rounded animate-pulse"
                                            >
                                                [ VALIDAR CONFIGURACIÓN FINAL ]
                                            </button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* End States */}
                    <AnimatePresence>
                        {gameState === 'won' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-[#0098CD]/20 backdrop-blur-2xl flex flex-col items-center justify-center rounded-2xl z-50 p-8"
                            >
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="bg-white p-6 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                                >
                                    <CheckCircle2 size={120} className="text-[#0098CD]" />
                                </motion.div>
                                <h2 className="text-4xl font-pixel text-white mt-12 mb-2 uppercase italic tracking-tighter">RED OPTIMIZADA</h2>
                                <p className="text-[#0098CD] font-pixel text-sm mb-8 uppercase">Análisis regional impecable.</p>
                                <button
                                    onClick={() => onComplete()}
                                    className="px-12 py-4 bg-[#0098CD] text-white font-pixel text-lg rounded-xl hover:bg-[#00b4f5] transition-all shadow-[0_0_30px_rgba(0,152,205,0.5)] animate-pulse"
                                >
                                    CONTINUAR PROTOCOLO
                                </button>
                            </motion.div>
                        )}
                        {gameState === 'lost' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-red-900/60 backdrop-blur-2xl flex flex-col items-center justify-center rounded-2xl z-50 p-8 text-center"
                            >
                                <AlertCircle size={100} className="text-white mb-6 animate-bounce" />
                                <h2 className="text-4xl font-pixel text-white mb-2 uppercase">FALLO CRÍTICO</h2>
                                <p className="text-red-200 font-pixel text-xs mb-8">El datacenter no ha podido converger antes del colapso.</p>
                                <button
                                    onClick={noRetry ? onFail : initGame}
                                    className="px-10 py-3 bg-white text-red-600 font-pixel rounded-xl hover:bg-gray-100 transition-all font-bold"
                                >
                                    {noRetry ? "ACEPTAR RESULTADO" : "REINICIALIZAR SISTEMA"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
