import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';

const ROWS = 15;
const COLS = 15;
const INITIAL_SPEED = 450; // Slower for better control
const TARGET_POINTS = 100;

const getRandomPosition = (exclude = []) => {
    let pos;
    while (true) {
        pos = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
        };
        const isExcluded = exclude.some(e => (e.x === pos.x && e.y === pos.y));
        if (!isExcluded) return pos;
    }
};

export const SnakeMinigame = ({ onComplete, onFail }) => {
    const { playSFX } = useAudio();
    const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
    const [food, setFood] = useState({ x: 12, y: 12 });
    const [obstacles, setObstacles] = useState([]);
    const [direction, setDirection] = useState({ x: 0, y: -1 });
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'success' | 'fail'

    // Direction buffer to improve responsiveness and prevent illegal 180s
    const nextDirection = useRef({ x: 0, y: -1 });
    const lastProcessedDir = useRef({ x: 0, y: -1 });

    // Initial setup
    useEffect(() => {
        const obs = [];
        for (let i = 0; i < 8; i++) {
            obs.push(getRandomPosition([{ x: 7, y: 7 }, { x: 7, y: 6 }, { x: 7, y: 8 }, { x: 12, y: 12 }]));
        }
        setObstacles(obs);
    }, []);

    const moveSnake = useCallback(() => {
        if (gameState !== 'playing') return;

        setSnake(prevSnake => {
            const head = prevSnake[0];
            const currentDir = nextDirection.current;
            lastProcessedDir.current = currentDir;
            setDirection(currentDir);

            // Wrap around logic (No wall collision)
            const newHead = {
                x: (head.x + currentDir.x + COLS) % COLS,
                y: (head.y + currentDir.y + ROWS) % ROWS
            };

            // Body or Obstacle collision
            const collidedWithBody = prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y);
            const collidedWithObstacle = obstacles.some(obs => obs.x === newHead.x && obs.y === newHead.y);

            if (collidedWithBody || collidedWithObstacle) {
                playSFX('fail');
                const newLives = lives - 1;
                setLives(newLives);

                if (newLives <= 0) {
                    setGameState('fail');
                    setTimeout(onFail, 1500);
                } else {
                    // Reset snake position
                    nextDirection.current = { x: 0, y: -1 };
                    return [{ x: 7, y: 7 }];
                }
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check food
            if (newHead.x === food.x && newHead.y === food.y) {
                const newScore = score + 10;
                setScore(newScore);
                playSFX('success');
                setFood(getRandomPosition([...newSnake, ...obstacles]));
                if (newScore >= TARGET_POINTS) {
                    setGameState('success');
                    playSFX('success');
                    setTimeout(onComplete, 1500);
                }
                return newSnake;
            } else {
                newSnake.pop();
                return newSnake;
            }
        });
    }, [obstacles, score, lives, gameState, onComplete, onFail, playSFX, food]);

    // Game Loop
    useEffect(() => {
        if (gameState !== 'playing') return;
        const interval = setInterval(moveSnake, INITIAL_SPEED);
        return () => clearInterval(interval);
    }, [moveSnake, gameState]);

    // Responsive controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'playing') return;
            const lastDir = lastProcessedDir.current;

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (lastDir.y !== 1) nextDirection.current = { x: 0, y: -1 };
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (lastDir.y !== -1) nextDirection.current = { x: 0, y: 1 };
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (lastDir.x !== 1) nextDirection.current = { x: -1, y: 0 };
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (lastDir.x !== -1) nextDirection.current = { x: 1, y: 0 };
                    break;
                default: break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    const handleVirtualControl = (newDir) => {
        const lastDir = lastProcessedDir.current;
        if (newDir.x !== -lastDir.x || newDir.y !== -lastDir.y) {
            nextDirection.current = newDir;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-[rgba(5,11,20,0.95)] backdrop-blur-xl overflow-hidden"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-5xl w-full">
                    {/* Instructions Panel (LEFT) */}
                    <div className="hidden lg:flex flex-col w-72 bg-[#050b14]/80 border-2 border-[#0098CD]/20 rounded-2xl p-6 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0098CD]/50" />
                        <h3 className="text-[#0098CD] font-pixel text-xs mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#0098CD] animate-pulse rounded-full" />
                            PROTOCOLO DE DEPURACIÓN DE MEMORIA
                        </h3>

                        <div className="space-y-6 flex-1 text-left">
                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Tarea</p>
                                <p className="text-white/80 font-mono text-sm leading-relaxed">
                                    Una fuga de memoria está devorando los registros del servidor central. Como Lead Developer formado en la UNIR, debes pilotar el script de depuración para recolectar los paquetes de datos corruptos antes de que el proceso toque los límites de seguridad del sistema. ¡Cuidado con los bordes del mainframe!
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Comandos</p>
                                <ul className="text-white/80 font-mono text-sm space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span><b>FLECHAS</b> o <b>WASD</b> para navegar por la red.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Atraviesa los bordes para moverte libremente.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Recolecta {TARGET_POINTS} puntos de datos para completar la optimización.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-2xl bg-[#0a192f] border-2 border-[#0098CD]/50 rounded-[2rem] p-4 md:p-8 shadow-[0_0_100px_rgba(0,152,205,0.3)] flex flex-col items-center flex-1"
                    >
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-pixel text-[#0098CD] drop-shadow-[0_0_8px_#0098CD] mb-4 italic uppercase tracking-wider">NETWORK DEBUGGER PRO</h2>
                            <div className="flex justify-center gap-3">
                                <div className="font-pixel text-[10px] md:text-xs bg-[#0b2545] py-2 px-4 rounded-lg border border-blue-500/20 text-blue-300">
                                    DATA: <span className="text-white ml-2">{score}/{TARGET_POINTS}</span>
                                </div>
                                <div className="font-pixel text-[10px] md:text-xs bg-[#2d0a0a] py-2 px-4 rounded-lg border border-red-500/20 text-red-400 flex items-center gap-2">
                                    NODES: <span className="flex gap-1 text-sm leading-none">
                                        {[...Array(3)].map((_, i) => (
                                            <span key={i} className={i < lives ? "text-red-500" : "text-white/10"}>♥</span>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Simulation Grid */}
                        <div className="relative bg-[#050b14] p-1 border-4 border-[#0098CD]/20 rounded-xl shadow-inner overflow-hidden">
                            <div
                                className="grid"
                                style={{
                                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                                    width: 'min(80vw, 320px)',
                                    aspectRatio: '1/1'
                                }}
                            >
                                {[...Array(ROWS * COLS)].map((_, i) => {
                                    const x = i % COLS;
                                    const y = Math.floor(i / COLS);

                                    const isSnakeHead = snake[0].x === x && snake[0].y === y;
                                    const isSnakeBody = snake.slice(1).some(s => s.x === x && s.y === y);
                                    const isFood = food.x === x && food.y === y;
                                    const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);

                                    return (
                                        <div
                                            key={i}
                                            className={`w-full h-full border border-white/[0.02] flex items-center justify-center ${isSnakeHead ? 'bg-[#0098CD] z-10' :
                                                isSnakeBody ? 'bg-[#0098CD]/40' :
                                                    isFood ? 'bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)] rounded-sm' :
                                                        isObstacle ? 'bg-red-950/80 border border-red-500/30' :
                                                            'bg-transparent'
                                                }`}
                                        />
                                    );
                                })}
                            </div>

                            {/* Overlays */}
                            <AnimatePresence>
                                {gameState === 'ready' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a192f]/90 z-20"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05, backgroundColor: "#0098CD" }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                playSFX('click');
                                                setGameState('playing');
                                            }}
                                            className="pixel-button-unir !px-10 !py-5 text-xl !bg-[#1a3a5f] border-2 border-[#0098CD]/50 !text-[#87ceeb]"
                                        >
                                            ESTABLECER ENLACE
                                        </motion.button>
                                        <p className="text-blue-300 font-pixel text-[9px] mt-6 opacity-60 tracking-[0.2em] text-center px-6 uppercase">
                                            TRASMUTACIÓN DE DATOS <br /> SIN BORDES ACTIVADA
                                        </p>
                                    </motion.div>
                                )}

                                {gameState !== 'playing' && gameState !== 'ready' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-sm"
                                    >
                                        <h3 className={`text-2xl font-pixel text-center px-4 mb-4 ${gameState === 'success' ? 'text-green-400' : 'text-red-500'}`}>
                                            {gameState === 'success' ? 'OPTIMIZACIÓN COMPLETA' : 'ERROR: PÉRDIDA DE SEÑAL'}
                                        </h3>
                                        <p className="text-white/60 font-pixel text-[10px] text-center uppercase tracking-widest">
                                            {gameState === 'success' ? 'PROTOCOLOS ESTABLECIDOS CORRECTAMENTE' : 'LA INTEGRIDAD DE LA MEMORIA HA FALLADO'}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Controls & Instructions */}
                        <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-sm">
                            <div className="grid grid-cols-3 gap-3 w-full max-w-[180px]">
                                <div />
                                <ControlBtn icon="↑" onClick={() => handleVirtualControl({ x: 0, y: -1 })} />
                                <div />
                                <ControlBtn icon="←" onClick={() => handleVirtualControl({ x: -1, y: 0 })} />
                                <ControlBtn icon="↓" onClick={() => handleVirtualControl({ x: 0, y: 1 })} />
                                <ControlBtn icon="→" onClick={() => handleVirtualControl({ x: 1, y: 0 })} />
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-[#0098CD]/60 font-pixel uppercase tracking-[0.2em]">
                                    ATRAVIESA LOS BORDES PARA NAVEGAR LIBREMENTE
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

const ControlBtn = ({ icon, onClick }) => (
    <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="w-full aspect-square bg-[#0b2545] border border-blue-500/30 rounded-xl text-blue-300 font-pixel text-xl flex items-center justify-center hover:bg-[#1a3a5f] transition-all"
    >
        {icon}
    </motion.button>
);
