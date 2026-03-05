import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';

export const TicTacToeMinigame = ({ onComplete, onFail }) => {
    const { playSFX } = useAudio();
    const [board, setBoard] = useState(Array(9).fill(null));
    const [movesX, setMovesX] = useState([]); // Historial de movimientos del jugador
    const [movesO, setMovesO] = useState([]); // Historial de movimientos de la IA
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [gameState, setGameState] = useState('playing'); // playing, success, fail
    const [totalMovesCount, setTotalMovesCount] = useState(0);
    const [nextToVanish, setNextToVanish] = useState(null); // Índice que desaparecerá en el próximo movimiento del jugador activo

    const checkWinner = useCallback((currentBoard) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }
        }
        return null;
    }, []);

    const handleMove = (index, player) => {
        if (gameState !== 'playing') return;

        // 1. Clonar el tablero y los movimientos
        const newBoard = [...board];
        const currentMoves = player === 'X' ? [...movesX] : [...movesO];

        // 2. Si ya hay 3, el nuevo movimiento borra el más antiguo
        if (currentMoves.length === 3) {
            const oldest = currentMoves.shift();
            newBoard[oldest] = null;
        }

        // 3. Aplicar el nuevo movimiento
        newBoard[index] = player;
        currentMoves.push(index);

        // 4. Actualizar estados
        setBoard(newBoard);
        if (player === 'X') {
            setMovesX(currentMoves);
            setIsPlayerTurn(false);
        } else {
            setMovesO(currentMoves);
            setIsPlayerTurn(true);
        }
        setTotalMovesCount(prev => prev + 1);

        // 5. Verificar victoria
        const winner = checkWinner(newBoard);
        if (winner) {
            setGameState(winner === 'X' ? 'success' : 'fail');
            playSFX(winner === 'X' ? 'success' : 'fail');
            setTimeout(() => {
                if (winner === 'X') onComplete();
                else onFail();
            }, 2000);
        }
    };

    // Actualizar qué ficha parpadeará (porque se va a borrar)
    useEffect(() => {
        if (isPlayerTurn) {
            setNextToVanish(movesX.length === 3 ? movesX[0] : null);
        } else {
            setNextToVanish(movesO.length === 3 ? movesO[0] : null);
        }
    }, [isPlayerTurn, movesX, movesO]);

    // Lógica de la IA
    useEffect(() => {
        if (!isPlayerTurn && gameState === 'playing') {
            const timer = setTimeout(() => {
                const availableSpots = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
                if (availableSpots.length === 0) return;

                let moveIndex;
                const winLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

                const canWin = (player, currentBoard, currentMoves) => {
                    // Simular eliminación para ver tablero real resultante
                    const boardSim = [...currentBoard];
                    if (currentMoves.length === 3) boardSim[currentMoves[0]] = null;

                    for (let line of winLines) {
                        const [a, b, c] = line;
                        const vals = [boardSim[a], boardSim[b], boardSim[c]];
                        if (vals.filter(v => v === player).length === 2 && vals.filter(v => v === null).length === 1) {
                            const target = line[vals.indexOf(null)];
                            if (currentBoard[target] === null) return target;
                        }
                    }
                    return null;
                };

                const blockMove = canWin('X', board, movesX);
                const winMove = canWin('O', board, movesO);

                if (winMove !== null) moveIndex = winMove;
                else if (blockMove !== null) moveIndex = blockMove;
                else if (totalMovesCount < 8) {
                    // Fase defensiva: evitar ganar si no es necesario (pero bloquear al jugador)
                    const safeSpots = availableSpots.filter(spot => {
                        const boardSim = [...board];
                        if (movesO.length === 3) boardSim[movesO[0]] = null;
                        boardSim[spot] = 'O';
                        return checkWinner(boardSim) !== 'O';
                    });
                    moveIndex = safeSpots.length > 0 ? safeSpots[Math.floor(Math.random() * safeSpots.length)] : availableSpots[0];
                } else {
                    moveIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
                }

                handleMove(moveIndex, 'O');
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, board, gameState, movesX, movesO, totalMovesCount]);

    const onCellClick = (index) => {
        if (!isPlayerTurn || board[index] !== null || gameState !== 'playing') return;
        playSFX('click');
        handleMove(index, 'X');
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-[rgba(5,11,20,0.85)] backdrop-blur-md"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-5xl w-full">
                    {/* Instructions Panel */}
                    <div className="hidden lg:flex flex-col w-72 bg-[#050b14]/80 border-2 border-[#0098CD]/20 rounded-2xl p-6 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0098CD]/50" />
                        <h3 className="text-[#0098CD] font-pixel text-xs mb-4 tracking-widest flex items-center gap-2 text-pretty">
                            <span className="w-2 h-2 bg-[#0098CD] animate-pulse rounded-full" />
                            GESTOR DINÁMICO DE RECURSOS
                        </h3>
                        <div className="space-y-6 flex-1 text-left">
                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Concepto</p>
                                <p className="text-white/80 font-mono text-sm leading-relaxed text-pretty">
                                    En la gestión técnica, los recursos no son infinitos. Solo puedes gestionar 3 nodos a la vez. Al activar un 4º, el recurso más antiguo se libera.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Reglas del Sistema</p>
                                <ul className="text-white/80 font-mono text-sm space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Gana alineando 3 nodos (X).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Solo 3 marcas por usuario.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>La ficha que parpadea se borrará en tu próximo movimiento.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-2xl bg-[#0a192f] border-2 border-[#0098CD] rounded-[2rem] p-6 md:p-10 shadow-[0_0_80px_rgba(0,152,205,0.4)] relative flex-1"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-5xl font-pixel text-[#0098CD] drop-shadow-[0_0_15px_#0098CD] mb-2 uppercase italic tracking-tighter">
                                PM NODE CONTROL
                            </h2>
                            <p className="font-pixel text-white/60 text-xs">
                                {isPlayerTurn ? 'ESTADO: TU TURNO (X)' : 'ESTADO: PROCESANDO IA (O)...'}
                            </p>
                        </div>

                        {/* TABLERO ESTILO TIC-TAC-TOE TRADICIONAL */}
                        <div className="relative aspect-square w-full max-w-[320px] mx-auto group">
                            {/* Líneas de la Cuadrícula */}
                            <div className="absolute top-1/3 left-0 right-0 h-1 md:h-2 bg-[#0098CD]/20 rounded-full" />
                            <div className="absolute top-2/3 left-0 right-0 h-1 md:h-2 bg-[#0098CD]/20 rounded-full" />
                            <div className="absolute left-1/3 top-0 bottom-0 w-1 md:w-2 bg-[#0098CD]/20 rounded-full" />
                            <div className="absolute left-2/3 top-0 bottom-0 w-1 md:w-2 bg-[#0098CD]/20 rounded-full" />

                            <div className="grid grid-cols-3 grid-rows-3 h-full relative z-10">
                                {board.map((cell, i) => (
                                    <div
                                        key={i}
                                        onClick={() => onCellClick(i)}
                                        className="relative flex items-center justify-center cursor-pointer"
                                    >
                                        <AnimatePresence>
                                            {cell && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{
                                                        scale: 1,
                                                        opacity: 1,
                                                        filter: nextToVanish === i ? 'drop-shadow(0 0 10px #FF4D4D)' : 'none'
                                                    }}
                                                    exit={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
                                                    className={`
                                                        text-5xl md:text-7xl font-pixel select-none
                                                        ${cell === 'X' ? 'text-[#0098CD]' : 'text-[#FF4D4D]'}
                                                        ${nextToVanish === i ? 'animate-pulse' : ''}
                                                    `}
                                                >
                                                    {cell}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Hover Indicator */}
                                        {!cell && isPlayerTurn && (
                                            <div className="absolute inset-0 bg-[#0098CD]/5 opacity-0 hover:opacity-100 transition-opacity rounded-lg" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Game State Overlay */}
                            {gameState !== 'playing' && (
                                <div className="absolute inset-x-[-20px] inset-y-[-20px] z-20 bg-[#050b14]/95 flex flex-col items-center justify-center rounded-2xl border-2 border-[#0098CD] backdrop-blur-xl shadow-[0_0_100px_rgba(0,152,205,0.5)]">
                                    <h3 className={`text-4xl font-pixel mb-4 ${gameState === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameState === 'success' ? 'SISTEMA VALIDADO' : 'FALLO DE GESTIÓN'}
                                    </h3>
                                    <p className="text-white/70 font-mono text-center px-8 text-sm italic">
                                        {gameState === 'success'
                                            ? 'Los recursos han sido optimizados con éxito estratégico.'
                                            : 'No se logró el equilibrio necesario en el despliegue.'}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 flex justify-center gap-8">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-white/40 uppercase font-pixel mb-1">Movimientos</span>
                                <span className="text-2xl font-mono text-white/90">{totalMovesCount}</span>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] text-white/40 uppercase font-pixel mb-1">Nodos Activos</span>
                                <span className="text-2xl font-mono text-[#0098CD]">{movesX.length}/3</span>
                            </div>
                        </div>

                        <p className="text-center mt-8 text-white/20 font-mono text-[8px] uppercase tracking-[0.4em]">
                            Infraestructura Crítica de Datos <br /> UNIR Pro Management v2.0
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
