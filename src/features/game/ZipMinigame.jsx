import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';

const LEVELS = [
    {
        id: 1,
        rows: 5,
        cols: 5,
        start: { x: 0, y: 0 },
        checkpoints: [
            { x: 1, y: 1, value: 2 },
            { x: 1, y: 4, value: 3 },
            { x: 4, y: 4, value: 4 },
            { x: 4, y: 1, value: 5 }
        ],
        obstacles: [
            { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }
        ]
    },
    {
        id: 2,
        rows: 5,
        cols: 5,
        start: { x: 0, y: 0 },
        checkpoints: [
            { x: 0, y: 1, value: 2 },
            { x: 4, y: 1, value: 3 },
            { x: 4, y: 4, value: 4 },
            { x: 0, y: 4, value: 5 }
        ],
        obstacles: [
            { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }
        ]
    },
    {
        id: 3,
        rows: 5,
        cols: 5,
        start: { x: 0, y: 0 },
        checkpoints: [
            { x: 4, y: 0, value: 2 },
            { x: 4, y: 4, value: 3 },
            { x: 0, y: 4, value: 4 },
            { x: 2, y: 1, value: 5 }
        ],
        obstacles: [
            { x: 2, y: 2 }
        ]
    }
];

const TOTAL_TIME = 120; // 2 minutes

const isAdjacent = (pos1, pos2) => {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
};

export const ZipMinigame = ({ onComplete, onFail }) => {
    const { playSFX } = useAudio();
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const [gameState, setGameState] = useState('ready'); // 'ready', 'playing', 'level_success', 'success', 'fail'
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [path, setPath] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const level = LEVELS[currentLevelIdx];
    const timerRef = useRef(null);

    const initLevel = useCallback(() => {
        setPath([level.start]);
    }, [level]);

    const handleCellAction = useCallback((x, y) => {
        if (gameState !== 'playing') return;

        // Check if it's an obstacle
        if (level.obstacles.some(obs => obs.x === x && obs.y === y)) return;

        // Reset if clicking an already visited cell that is not the last one
        const existingIdx = path.findIndex(p => p.x === x && p.y === y);
        if (existingIdx !== -1) {
            if (existingIdx === path.length - 1) return; // clicking the tail
            // Truncate path if clicking back
            setPath(path.slice(0, existingIdx + 1));
            playSFX('click');
            return;
        }

        const last = path[path.length - 1];
        if (isAdjacent(last, { x, y })) {
            // Check checkpoints
            const checkpoint = level.checkpoints.find(c => c.x === x && c.y === y);
            if (checkpoint) {
                // Find highest checkpoint reached so far
                const reachedCheckpoints = level.checkpoints.filter(c =>
                    path.some(p => p.x === c.x && p.y === c.y)
                );
                const nextExpectedValue = reachedCheckpoints.length + 2; // +1 for start(1), +1 for next
                if (checkpoint.value !== nextExpectedValue) {
                    // Invalid sequence
                    return;
                }
            } else {
                // If moving to an empty cell but there's a checkpoint with current value + 1 elsewhere
                const reachedCheckpoints = level.checkpoints.filter(c =>
                    path.some(p => p.x === c.x && p.y === c.y)
                );
                const nextNeededValue = reachedCheckpoints.length + 2;
                const nextCheckpoint = level.checkpoints.find(c => c.value === nextNeededValue);
                // If it exists but we are not moving to it, we can still move to empty cell.
            }

            const newPath = [...path, { x, y }];
            setPath(newPath);
            playSFX('click');

            // Check Win Condition for level
            const totalPlayableCells = (level.rows * level.cols) - level.obstacles.length;
            if (newPath.length === totalPlayableCells) {
                // Check if all checkpoints reached
                const allCheckpointsReached = level.checkpoints.every(c =>
                    newPath.some(p => p.x === c.x && p.y === c.y)
                );

                if (allCheckpointsReached) {
                    if (currentLevelIdx < LEVELS.length - 1) {
                        setGameState('level_success');
                        playSFX('success');
                        setTimeout(() => {
                            setCurrentLevelIdx(prev => prev + 1);
                            setGameState('playing');
                        }, 1500);
                    } else {
                        setGameState('success');
                        playSFX('success');
                        setTimeout(onComplete, 2000);
                    }
                }
            }
        }
    }, [gameState, level, path, playSFX, currentLevelIdx, onComplete]);

    const handleKeyDown = useCallback((e) => {
        if (gameState !== 'playing') return;

        const last = path[path.length - 1];
        let next = { ...last };

        switch (e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                next.y -= 1;
                break;
            case 's':
            case 'arrowdown':
                next.y += 1;
                break;
            case 'a':
            case 'arrowleft':
                next.x -= 1;
                break;
            case 'd':
            case 'arrowright':
                next.x += 1;
                break;
            default:
                return;
        }

        // Validate bounds
        if (next.x >= 0 && next.x < level.cols && next.y >= 0 && next.y < level.rows) {
            handleCellAction(next.x, next.y);
        }
    }, [gameState, path, level, handleCellAction]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (gameState === 'playing' || gameState === 'level_success') {
            initLevel();
        }
    }, [currentLevelIdx, initLevel]);

    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
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
    }, [gameState, playSFX, onFail]);

    const handleStart = () => {
        setGameState('playing');
        initLevel();
        playSFX('click');
    };

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
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-[rgba(5,11,20,0.9)] backdrop-blur-xl overflow-hidden"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-6xl w-full">
                    {/* Instructions Panel */}
                    <div className="hidden lg:flex flex-col w-72 bg-[#050b14]/80 border-2 border-[#0098CD]/20 rounded-2xl p-6 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0098CD]/50" />
                        <h3 className="text-[#0098CD] font-pixel text-xs mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#0098CD] animate-pulse rounded-full" />
                            RED NEURONAL: YUI-CONNECT
                        </h3>

                        <div className="space-y-6 flex-1 text-left">
                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Misión</p>
                                <p className="text-white/80 font-mono text-sm leading-relaxed">
                                    Conecta las sinapsis de la nueva red neuronal. Debes activar cada nodo de la matriz para estabilizar la consciencia de Yui.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Protocolo</p>
                                <ul className="text-white/80 font-mono text-sm space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Traza la ruta de conexión entre neuronas.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Sigue la secuencia de impulsos eléctricos (1, 2, 3...).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Estabiliza la red antes de que el núcleo se sobrecaliente.</span>
                                    </li>
                                </ul>
                                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-[10px] font-pixel leading-relaxed">
                                    SISTEMA: Conectando nodos para la integración final de la Inteligencia Artificial.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Game Panel */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-3xl bg-[#0a192f] border-2 border-[#0098CD] rounded-[2rem] p-6 md:p-10 shadow-[0_0_80px_rgba(0,152,205,0.4)] relative flex-1 flex flex-col items-center"
                    >
                        {/* Header */}
                        <div className="text-center mb-8 w-full">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-white font-pixel text-xs">
                                    NODO: <span className="text-[#0098CD]">{currentLevelIdx + 1} / 3</span>
                                </div>
                                <div className="text-2xl md:text-4xl font-pixel text-[#0098CD] drop-shadow-[0_0_10px_#0098CD] italic">
                                    NEURAL CONNECT
                                </div>
                                <div className={`font-pixel text-xs ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                    ESTABILIDAD: <span className="text-[#0098CD]">{formatTime(timeLeft)}</span>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-[#0098CD]/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#0098CD]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(path.length / ((level.rows * level.cols) - level.obstacles.length)) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Grid */}
                        <div
                            className="relative bg-[#050b14] p-3 border-4 border-[#0098CD]/20 rounded-2xl shadow-inner select-none"
                            onMouseLeave={() => setIsDragging(false)}
                            onMouseUp={() => setIsDragging(false)}
                        >
                            <div
                                className="grid gap-2"
                                style={{
                                    gridTemplateRows: `repeat(${level.rows}, 1fr)`,
                                    gridTemplateColumns: `repeat(${level.cols}, 1fr)`,
                                    width: 'min(70vw, 400px)',
                                    aspectRatio: `${level.cols} / ${level.rows}`
                                }}
                            >
                                {Array.from({ length: level.rows * level.cols }).map((_, i) => {
                                    const x = i % level.cols;
                                    const y = Math.floor(i / level.cols);
                                    const pathIdx = path.findIndex(p => p.x === x && p.y === y);
                                    const isVisited = pathIdx !== -1;
                                    const isLast = pathIdx === path.length - 1 && path.length > 0;
                                    const isStart = x === level.start.x && y === level.start.y;
                                    const checkpoint = level.checkpoints.find(c => c.x === x && c.y === y);
                                    const maxCheckpointValue = Math.max(1, ...level.checkpoints.map(c => c.value));
                                    const isMeta = checkpoint?.value === maxCheckpointValue || (!level.checkpoints.length && isStart);
                                    const isObstacle = level.obstacles.some(obs => obs.x === x && obs.y === y);

                                    return (
                                        <div
                                            key={`${x}-${y}`}
                                            onMouseDown={() => {
                                                if (!isObstacle) {
                                                    setIsDragging(true);
                                                    handleCellAction(x, y);
                                                }
                                            }}
                                            onMouseEnter={() => {
                                                if (isDragging && !isObstacle) handleCellAction(x, y);
                                            }}
                                            className={`
                                                w-full h-full rounded-lg flex flex-col items-center justify-center relative cursor-pointer
                                                transition-all duration-200 border-2
                                                ${isObstacle ? 'border-red-500/20 bg-red-950/30' :
                                                    isMeta ? (isVisited ? 'border-yellow-500 bg-yellow-500/30' : 'border-yellow-500/40 bg-yellow-500/10') :
                                                        (isStart || checkpoint) ? (isVisited ? 'border-green-500 bg-green-500/30' : 'border-green-500/40 bg-green-500/10') :
                                                            isVisited ? 'border-[#0098CD] bg-[#0098CD]/20' :
                                                                'border-[#0098CD]/10 bg-white/5 hover:bg-white/10'}
                                                ${isLast ? (isMeta ? 'shadow-[0_0_15px_#eab308]' : (isStart || checkpoint ? 'shadow-[0_0_15px_#22c55e]' : 'shadow-[0_0_15px_#0098CD]')) : ''}
                                            `}
                                        >
                                            {isObstacle && (
                                                <div className="text-red-500/40 font-bold text-xs uppercase opacity-50">Lock</div>
                                            )}
                                            {isVisited && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className={`absolute inset-1 rounded-md ${isMeta ? (isLast ? 'bg-yellow-500' : 'bg-yellow-500/40') : (isStart || checkpoint) ? (isLast ? 'bg-green-500' : 'bg-green-500/40') : (isLast ? 'bg-[#0098CD]' : 'bg-[#0098CD]/40')}`}
                                                />
                                            )}

                                            {/* Numbers */}
                                            {(isStart || checkpoint) && (
                                                <span className={`z-10 font-bold font-pixel text-[10px] ${isVisited ? 'text-white' : (isMeta ? 'text-yellow-500' : 'text-green-500')}`}>
                                                    {isStart ? 1 : checkpoint.value}
                                                </span>
                                            )}
                                            {isMeta && (
                                                <span className={`z-10 font-pixel text-[8px] uppercase tracking-tighter ${isVisited ? 'text-white/70' : 'text-yellow-500/70'}`}>
                                                    Meta
                                                </span>
                                            )}

                                            {/* Path Connections */}
                                            {isVisited && pathIdx > 0 && (
                                                <div className="absolute inset-0 pointer-events-none">
                                                    {/* Drawing a simple line to previous cell */}
                                                    {(() => {
                                                        const prev = path[pathIdx - 1];
                                                        if (prev.x < x) return <div className="absolute top-1/2 -left-3 w-4 h-1 bg-[#0098CD] -translate-y-1/2" />;
                                                        if (prev.x > x) return <div className="absolute top-1/2 -right-3 w-4 h-1 bg-[#0098CD] -translate-y-1/2" />;
                                                        if (prev.y < y) return <div className="absolute left-1/2 -top-3 w-1 h-4 bg-[#0098CD] -translate-x-1/2" />;
                                                        if (prev.y > y) return <div className="absolute left-1/2 -bottom-3 w-1 h-4 bg-[#0098CD] -translate-x-1/2" />;
                                                        return null;
                                                    })()}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Overlays */}
                            <AnimatePresence>
                                {gameState === 'ready' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 z-50 rounded-2xl backdrop-blur-sm"
                                    >
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                            className="text-[#0098CD] font-pixel text-[8px] mb-2 uppercase tracking-widest"
                                        >
                                            ENTRENAMIENTO NEURAL
                                        </motion.div>
                                        <h3 className="text-white font-pixel text-xs mb-8 tracking-widest text-center">
                                            CONEXIÓN DE SINAPSIS <br /> MODELO YUI v1.0
                                        </h3>
                                        <button
                                            onClick={handleStart}
                                            className="pixel-button-unir !bg-[#0098CD] !text-white !px-10 !py-5 hover:bg-[#007ba6] transition-all font-bold text-sm uppercase group relative overflow-hidden"
                                        >
                                            <span className="relative z-10">INICIAR CONEXIÓN</span>
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </button>
                                        <p className="mt-8 text-white/30 font-mono text-[9px] text-center max-w-xs uppercase leading-relaxed">
                                            Ayuda a Lee a conectar los nodos de la red neuronal para dar vida a Yui.
                                        </p>
                                    </motion.div>
                                )}

                                {gameState === 'level_success' && (
                                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-[#0098CD]/20 backdrop-blur-md z-40 rounded-2xl">
                                        <div className="text-center">
                                            <h3 className="text-3xl font-pixel text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">BATCH {currentLevelIdx + 1} OK</h3>
                                            <p className="text-[#0098CD] font-pixel text-xs mt-2">OPTIMIZANDO SIGUIENTE SECTOR...</p>
                                        </div>
                                    </motion.div>
                                )}

                                {(gameState === 'success' || gameState === 'fail') && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 rounded-2xl backdrop-blur-sm">
                                        <div className="text-center">
                                            <h3 className={`text-2xl md:text-3xl font-pixel ${gameState === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                                {gameState === 'success' ? 'RED NEURONAL ACTIVA' : 'SISTEMA INESTABLE'}
                                            </h3>
                                            <p className="text-white/60 font-pixel text-[10px] mt-4 uppercase tracking-[0.2em]">
                                                {gameState === 'success' ? 'YUI HA SIDO SINCRONIZADA' : 'FALLO EN LA INTEGRIDAD SINÁPTICA'}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-8 grid grid-cols-3 gap-8 w-full">
                            <div className="text-center group">
                                <p className="text-[8px] font-pixel text-[#0098CD]/60 uppercase mb-1">Celdas</p>
                                <p className="text-white font-pixel text-sm">{path.length} / {(level.rows * level.cols) - level.obstacles.length}</p>
                            </div>

                            <div className="flex items-center justify-center">
                                <button
                                    onClick={initLevel}
                                    className="px-4 py-2 bg-[#0098CD]/10 border border-[#0098CD]/40 rounded-xl hover:bg-[#0098CD]/30 active:scale-95 text-[#0098CD] font-pixel text-[10px] tracking-wide transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,152,205,0.1)] hover:shadow-[0_0_20px_rgba(0,152,205,0.3)]"
                                >
                                    <RefreshCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                                    REINICIAR RUTA
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-[8px] font-pixel text-[#0098CD]/60 uppercase mb-1">Checkpoints</p>
                                <p className="text-white font-pixel text-sm">
                                    {level.checkpoints.filter(c => path.some(p => p.x === c.x && p.y === c.y)).length} / {level.checkpoints.length}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
