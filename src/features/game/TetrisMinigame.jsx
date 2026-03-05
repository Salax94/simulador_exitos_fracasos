import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';

const ROWS = 15;
const COLS = 10;
const INITIAL_SPEED = 800;
const MIN_SPEED = 200;
const SPEED_INCREMENT = 50;
const WIN_LINES = 3; // Easy to win

const SHAPES = {
    I: [[1, 1, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]],
    O: [[1, 1], [1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    T: [[0, 1, 0], [1, 1, 1]],
    Z: [[1, 1, 0], [0, 1, 1]],
};

const COLORS = {
    I: '#00f0f0',
    J: '#0000f0',
    L: '#f0a000',
    O: '#f0f000',
    S: '#00f000',
    T: '#a000f0',
    Z: '#f00000',
};

export const TetrisMinigame = ({ onComplete, onFail }) => {
    const { playSFX } = useAudio();
    const [grid, setGrid] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    const [activePiece, setActivePiece] = useState(null);
    const [nextPiece, setNextPiece] = useState(null);
    const [score, setScore] = useState(0);
    const [linesCleared, setLinesCleared] = useState(0);
    const [gameState, setGameState] = useState('ready');
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const gameLoopRef = useRef(null);

    const handleStartGame = () => {
        setGameState('playing');
        const initialPiece = generatePiece();
        const firstActive = spawnPiece(initialPiece);
        if (firstActive) setActivePiece(firstActive);
        playSFX('click');
    };

    const generatePiece = useCallback(() => {
        const keys = Object.keys(SHAPES);
        const type = keys[Math.floor(Math.random() * keys.length)];
        const shape = SHAPES[type];
        return {
            type,
            shape,
            pos: { x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2), y: 0 },
        };
    }, []);

    const spawnPiece = useCallback((currentNextPiece) => {
        const pieceToSpawn = currentNextPiece || generatePiece();
        const next = generatePiece();

        setNextPiece(next);

        if (checkCollision(pieceToSpawn.shape, pieceToSpawn.pos, grid)) {
            setGameState('fail');
            playSFX('fail');
            setTimeout(() => onFail(), 2000);
            return null;
        }
        return pieceToSpawn;
    }, [grid, playSFX, onFail, generatePiece]);

    const checkCollision = (shape, pos, currentGrid) => {
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const newX = pos.x + x;
                    const newY = pos.y + y;
                    if (
                        newX < 0 || newX >= COLS ||
                        newY >= ROWS ||
                        (newY >= 0 && currentGrid[newY][newX])
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const rotate = (shape) => {
        const rotated = shape[0].map((_, i) => shape.map(row => row[i]).reverse());
        return rotated;
    };

    const handleRotate = () => {
        if (!activePiece || gameState !== 'playing') return;
        const newShape = rotate(activePiece.shape);
        if (!checkCollision(newShape, activePiece.pos, grid)) {
            setActivePiece(prev => ({ ...prev, shape: newShape }));
            playSFX('click');
        }
    };

    const move = (dir) => {
        if (!activePiece || gameState !== 'playing') return;
        const newPos = { x: activePiece.pos.x + dir.x, y: activePiece.pos.y + dir.y };
        if (!checkCollision(activePiece.shape, newPos, grid)) {
            setActivePiece(prev => ({ ...prev, pos: newPos }));
            if (dir.x !== 0) playSFX('click');
        } else if (dir.y > 0) {
            // Drop finished
            lockPiece();
        }
    };

    const hardDrop = () => {
        if (!activePiece || gameState !== 'playing') return;
        let finalPos = { ...activePiece.pos };
        while (!checkCollision(activePiece.shape, { ...finalPos, y: finalPos.y + 1 }, grid)) {
            finalPos.y += 1;
        }
        lockPiece({ ...activePiece, pos: finalPos });
    };

    const lockPiece = (pieceToLock = activePiece) => {
        if (!pieceToLock) return;
        const newGrid = grid.map(row => [...row]);
        pieceToLock.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    const gridY = pieceToLock.pos.y + y;
                    const gridX = pieceToLock.pos.x + x;
                    if (gridY >= 0) newGrid[gridY][gridX] = pieceToLock.type;
                }
            });
        });

        // Clear lines
        let cleared = 0;
        const filteredGrid = newGrid.filter(row => {
            if (row.every(cell => cell !== 0)) {
                cleared++;
                return false;
            }
            return true;
        });

        while (filteredGrid.length < ROWS) {
            filteredGrid.unshift(Array(COLS).fill(0));
        }

        if (cleared > 0) {
            playSFX('success');
            const newLines = linesCleared + cleared;
            setLinesCleared(newLines);
            setScore(prev => prev + (cleared * 100));
            setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREMENT));

            if (newLines >= WIN_LINES) {
                setGameState('success');
                setTimeout(() => onComplete(), 2000);
            }
        }

        setGrid(filteredGrid);
        const next = spawnPiece(nextPiece);
        if (next) setActivePiece(next);
    };

    useEffect(() => {
        if (gameState !== 'playing') return;
        if (!activePiece) return;

        gameLoopRef.current = setInterval(() => {
            move({ x: 0, y: 1 });
        }, speed);

        return () => clearInterval(gameLoopRef.current);
    }, [activePiece, gameState, speed, move]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'playing') return;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') move({ x: -1, y: 0 });
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') move({ x: 1, y: 0 });
            if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') move({ x: 0, y: 1 });
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') handleRotate();
            if (e.key === ' ') {
                e.preventDefault();
                hardDrop();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePiece, gameState, hardDrop, move, handleRotate]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-[rgba(5,11,20,0.85)] backdrop-blur-xl overflow-hidden"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-5xl w-full">
                    {/* Instructions Panel (LEFT) */}
                    <div className="hidden lg:flex flex-col w-72 bg-[#050b14]/80 border-2 border-[#0098CD]/20 rounded-2xl p-6 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0098CD]/50" />
                        <h3 className="text-[#0098CD] font-pixel text-xs mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#0098CD] animate-pulse rounded-full" />
                            ARQUITECTURA DE BLOQUES DE CÓDIGO
                        </h3>

                        <div className="space-y-6 flex-1 text-left">
                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Tarea</p>
                                <p className="text-white/80 font-mono text-sm leading-relaxed">
                                    La arquitectura de un videojuego se construye bloque a bloque, con precisión y visión de conjunto. Como desarrollador formado en la UNIR, tu tarea es ensamblar los módulos de código entrantes de forma que encajen a la perfección, evitando que la complejidad desborde la memoria del sistema.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Comandos</p>
                                <ul className="text-white/80 font-mono text-sm space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span><b>FLECHAS</b> o <b>WASD</b> para mover y rotar piezas.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span><b>ESPACIO</b> para caída instantánea.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Completa líneas para eliminar errores del sistema.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-2xl bg-[#0a192f] border-2 border-[#0098CD] rounded-[2rem] p-4 md:p-8 shadow-[0_0_80px_rgba(0,152,205,0.4)] flex flex-col items-center flex-1"
                    >
                        <div className="text-center mb-4">
                            <h2 className="text-2xl md:text-4xl font-pixel text-[#0098CD] drop-shadow-[0_0_10px_#0098CD] mb-2 italic">GAME DEV CHALLENGE</h2>
                            <div className="flex justify-center gap-8 mb-2">
                                <div className="text-white font-pixel text-xs md:text-sm">
                                    LÍNEAS: <span className="text-[#0098CD]">{linesCleared} / {WIN_LINES}</span>
                                </div>
                                <div className="text-white font-pixel text-xs md:text-sm">
                                    PUNTOS: <span className="text-[#0098CD]">{score}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            {/* Game Board */}
                            <div className="relative bg-[#050b14] p-1 border-4 border-[#0098CD]/20 rounded-xl shadow-inner overflow-hidden">
                                <div
                                    className="grid"
                                    style={{
                                        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                                        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                                        width: 'min(70vw, 200px)',
                                        aspectRatio: `${COLS} / ${ROWS}`
                                    }}
                                >
                                    {grid.map((row, y) => (
                                        row.map((cell, x) => {
                                            let color = cell ? COLORS[cell] : 'transparent';
                                            let isActive = false;

                                            // Check if current active piece occupies this cell
                                            if (activePiece) {
                                                activePiece.shape.forEach((pRow, py) => {
                                                    pRow.forEach((pValue, px) => {
                                                        if (pValue && activePiece.pos.x + px === x && activePiece.pos.y + py === y) {
                                                            color = COLORS[activePiece.type];
                                                            isActive = true;
                                                        }
                                                    });
                                                });
                                            }

                                            return (
                                                <div
                                                    key={`${x}-${y}`}
                                                    className="w-full h-full border border-white/[0.03] flex items-center justify-center relative"
                                                >
                                                    {(cell !== 0 || isActive) && (
                                                        <div
                                                            className={`absolute inset-0.5 rounded-sm shadow-sm ${isActive ? 'animate-pulse' : ''}`}
                                                            style={{
                                                                backgroundColor: color,
                                                                border: '1px solid rgba(255,255,255,0.2)'
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })
                                    ))}
                                </div>

                                {/* Game Over / Success Overlays */}
                                <AnimatePresence>
                                    {gameState === 'ready' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 z-50">
                                            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3 }} className="text-[#0098CD] font-pixel text-[8px] mb-2 uppercase tracking-widest">SISTEMA DE DEPURACIÓN</motion.div>
                                            <h3 className="text-white font-pixel text-xs mb-8 tracking-widest text-center">ORGANIZACIÓN DE<br />BLOQUES DE DATOS</h3>
                                            <button onClick={handleStartGame} className="pixel-button-unir !bg-[#0098CD] !text-white !px-8 !py-4 hover:bg-[#007ba6] transition-all font-bold text-xs uppercase">
                                                INICIAR
                                            </button>
                                        </motion.div>
                                    )}

                                    {gameState !== 'playing' && gameState !== 'ready' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/80 z-20 rounded-lg backdrop-blur-sm">
                                            <h3 className={`text-xl md:text-2xl font-pixel text-center px-4 ${gameState === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                                {gameState === 'success' ? 'PRUEBA SUPERADA' : 'DEPURACIÓN FALLIDA'}
                                            </h3>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right Panel: Next Piece & Controls */}
                            <div className="flex flex-col gap-6 w-full max-w-[200px]">
                                {/* Next Piece Preview */}
                                <div className="bg-[#050b14] p-4 border-2 border-[#0098CD]/30 rounded-xl shadow-inner flex flex-col items-center">
                                    <p className="text-[10px] font-pixel text-[#0098CD]/60 uppercase mb-3 tracking-widest">Siguiente</p>
                                    <div className="grid grid-cols-4 grid-rows-2 gap-1 w-16 h-8">
                                        {[...Array(2)].map((_, y) => (
                                            [...Array(4)].map((_, x) => {
                                                const isFilled = nextPiece && nextPiece.shape[y] && nextPiece.shape[y][x];
                                                return (
                                                    <div
                                                        key={`${x}-${y}`}
                                                        className="w-full h-full rounded-sm"
                                                        style={{
                                                            backgroundColor: (nextPiece && isFilled) ? COLORS[nextPiece.type] : 'transparent',
                                                            border: (nextPiece && isFilled) ? '1px solid rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.02) 1px solid'
                                                        }}
                                                    />
                                                );
                                            })
                                        ))}
                                    </div>
                                </div>

                                {/* Controls Panel */}
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div />
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={handleRotate}
                                            className="p-4 bg-[#0098CD]/20 border-2 border-[#0098CD]/50 rounded-xl text-white flex justify-center"
                                        >
                                            <span className="font-pixel text-lg">↑</span>
                                        </motion.button>
                                        <div />

                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => move({ x: -1, y: 0 })}
                                            className="p-4 bg-[#0098CD]/20 border-2 border-[#0098CD]/50 rounded-xl text-white flex justify-center"
                                        >
                                            <span className="font-pixel text-lg">←</span>
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => move({ x: 0, y: 1 })}
                                            className="p-4 bg-[#0098CD]/20 border-2 border-[#0098CD]/50 rounded-xl text-white flex justify-center"
                                        >
                                            <span className="font-pixel text-lg">↓</span>
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => move({ x: 1, y: 0 })}
                                            className="p-4 bg-[#0098CD]/20 border-2 border-[#0098CD]/50 rounded-xl text-white flex justify-center"
                                        >
                                            <span className="font-pixel text-lg">→</span>
                                        </motion.button>
                                    </div>
                                    <p className="text-[10px] font-mono text-center text-white/40 uppercase tracking-widest mt-4">
                                        Depura el código <br /> eliminando {WIN_LINES} líneas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
