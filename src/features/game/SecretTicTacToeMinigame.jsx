import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';
import { Home, MessageCircle } from 'lucide-react';

export const SecretTicTacToeMinigame = ({ opponentName, opponentPortrait, playerPortrait, onComplete, onFail }) => {
    const { playSFX } = useAudio();
    const [board, setBoard] = useState(Array(9).fill(null));
    const [movesX, setMovesX] = useState([]); // Historial de movimientos del jugador
    const [movesO, setMovesO] = useState([]); // Historial de movimientos de la IA
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [gameState, setGameState] = useState('playing'); // playing, success, fail
    const [opponentSpeech, setOpponentSpeech] = useState("Veamos si esta vez el resultado es distinto...");
    const [nextToVanish, setNextToVanish] = useState(null);

    const winLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const opponentDialogues = {
        "Ruky": {
            start: ["¿Otra vez por aquí, Lead?", "El código tiene memoria, y yo también.", "¿Buscando un commit distinto?", "Esta vez no habrá 'rollback' que te salve."],
            playerMove: ["Interesante... no estaba en el repositorio.", "¿Un parche en caliente? Predecible.", "Esa función tiene demasiada complejidad ciclomática.", "Veo que has optimizado tus clics."],
            opponentMove: ["Ejecutando script de victoria...", "Haciendo un 'force push' a tu estrategia.", "Tu nodo ahora me pertenece.", "Sincronizando bloqueo de ruta..."],
            win: ["Stack Overflow. Tu lógica ha colapsado.", "Como sospechaba, tu arquitectura es frágil.", "Vuelve cuando tu código sea... real."],
            lose: ["Imposible... has roto el puntero del destino.", "Has ganado este duelo, pero ¿a qué coste?", "Felicidades, has encontrado la grieta en el sistema."]
        },
        "Frank": {
            start: ["Hola de nuevo, cachorro. ¿Jugamos?", "Las inversiones de tiempo son las más caras.", "No hay trato que me gane hoy.", "Veo que no sabes cuándo retirarte de la mesa."],
            playerMove: ["Un movimiento arriesgado para tu capital.", "Esa jugada no está en el roadmap.", "¿Crees que eso mejorará tu ROI?", "Interesante... pero poco rentable."],
            opponentMove: ["Mi turno de negociar tu derrota.", "Adquisición hostil de este cuadrante.", "Estoy diversificando mis opciones de ganar.", "Bloqueando tus activos."],
            win: ["Negocio cerrado. Estás fuera del estudio.", "Has perdido tu liquidez de tiempo.", "Vuelve cuando sepas gestionar tu suerte."],
            lose: ["Un trato justo... has ganado la ronda.", "Has roto la banca de la realidad.", "Interesante beneficio has obtenido hoy."]
        },
        "Yui": {
            start: ["Anomalía detectada. Iniciando proceso.", "Tu secuencia de datos es redundante.", "Sincronizando lógica de red...", "Procesando probabilidad de victoria: 99.8%."],
            playerMove: ["Input recibido. Analizando impacto...", "Ese dato no encaja en mi modelo.", "Patrón de comportamiento identificado.", "Tu varianza es insignificante."],
            opponentMove: ["Globalizando control de nodos.", "Actualizando matriz de estado.", "Filtrando tus posibilidades de éxito.", "Nodo asegurado bajo cifrado crítico."],
            win: ["Acceso denegado. Usuario filtrado.", "La redundancia ha sido eliminada.", "Sincronización fallida para el sujeto."],
            lose: ["Error de sistema: integridad comprometida.", "Has introducido ruido en mi algoritmo perfecto.", "Sincronía total alcanzada. Has ganado."]
        },
        "generic": {
            start: ["Veamos de qué eres capaz.", "¿Buscando un final distinto?", "El sistema tiene reglas."],
            playerMove: ["Interesante movimiento...", "¿Crees que eso te salvará?", "Predecible."],
            opponentMove: ["Mi turno.", "Bloqueando tu camino.", "Sincronizando..."],
            win: ["El sistema prevalece.", "Estás bloqueado.", "Vuelve luego."],
            lose: ["Has ganado este duelo.", "Has roto el patrón.", "Felicidades."]
        }
    };

    const getRandomSpeech = (type) => {
        const charPool = opponentDialogues[opponentName] || opponentDialogues["generic"];
        const pool = charPool[type] || opponentDialogues["generic"][type];
        return pool[Math.floor(Math.random() * pool.length)];
    };

    const checkWinner = useCallback((currentBoard) => {
        for (let line of winLines) {
            const [a, b, c] = line;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a];
            }
        }
        return null;
    }, []);

    const handleMove = (index, player) => {
        if (gameState !== 'playing' || board[index]) return;

        const newBoard = [...board];
        const currentMoves = player === 'X' ? [...movesX] : [...movesO];

        // LOGIC: Disappearing moves (Max 3)
        if (currentMoves.length === 3) {
            const oldest = currentMoves.shift();
            newBoard[oldest] = null;
        }

        newBoard[index] = player;
        currentMoves.push(index);

        setBoard(newBoard);
        if (player === 'X') {
            setMovesX(currentMoves);
            setOpponentSpeech(getRandomSpeech('playerMove'));
            setIsPlayerTurn(false);
        } else {
            setMovesO(currentMoves);
            setOpponentSpeech(getRandomSpeech('opponentMove'));
            setIsPlayerTurn(true);
        }

        const winner = checkWinner(newBoard);
        if (winner) {
            setGameState(winner === 'X' ? 'success' : 'fail');
            setOpponentSpeech(winner === 'X' ? getRandomSpeech('lose') : getRandomSpeech('win'));
            playSFX(winner === 'X' ? 'success' : 'fail');
            setTimeout(() => {
                if (winner === 'X') onComplete();
                else onFail();
            }, 3000);
            return;
        }

        if (!newBoard.includes(null) && currentMoves.length < 3) {
            setGameState('draw');
            setOpponentSpeech("Un empate... el sistema está estancado.");
            setTimeout(() => onFail(), 2000);
            return;
        }
    };

    // Update which tile will flash
    useEffect(() => {
        if (isPlayerTurn) {
            setNextToVanish(movesX.length === 3 ? movesX[0] : null);
        } else {
            setNextToVanish(movesO.length === 3 ? movesO[0] : null);
        }
    }, [isPlayerTurn, movesX, movesO]);

    // Simple AI for Tic Tac Toe with disappearing moves awareness
    useEffect(() => {
        if (!isPlayerTurn && gameState === 'playing') {
            const timer = setTimeout(() => {
                const availableSpots = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);

                const canWin = (player, currentBoard, currentMoves) => {
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

                const winMove = canWin('O', board, movesO);
                const blockMove = canWin('X', board, movesX);

                if (winMove !== null) {
                    handleMove(winMove, 'O');
                } else if (blockMove !== null) {
                    handleMove(blockMove, 'O');
                } else {
                    const randomIdx = availableSpots[Math.floor(Math.random() * availableSpots.length)];
                    handleMove(randomIdx, 'O');
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, board, gameState, movesX, movesO]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-hidden"
            >
                {/* Glitch Background Effect */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUic1G9i/giphy.gif')] bg-cover" />

                <div className="relative w-full max-w-6xl flex flex-col items-center gap-12">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-6xl font-pixel text-red-500 animate-pulse mb-2">DUELO DE REALIDAD</h2>
                        <p className="text-white/60 font-mono tracking-widest uppercase">Rompiendo el bucle del estudio</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
                        {/* Player Column */}
                        <div className="flex flex-col items-center gap-4 order-2 lg:order-1">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
                                <img src={playerPortrait} alt="Tú" className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10" />
                            </div>
                            <div className="bg-blue-500/20 border border-blue-500/50 px-6 py-2 rounded-full">
                                <span className="text-blue-400 font-pixel text-sm uppercase">Jugador (X)</span>
                            </div>
                        </div>

                        {/* Game Board */}
                        <div className="relative p-8 bg-white/5 border-2 border-white/10 rounded-[3rem] shadow-[0_0_50px_rgba(255,255,255,0.05)] order-1 lg:order-2">
                            <div className="grid grid-cols-3 grid-rows-3 gap-4 w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
                                {board.map((cell, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={!cell && isPlayerTurn ? { scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" } : {}}
                                        onClick={() => isPlayerTurn && handleMove(i, 'X')}
                                        className="bg-white/5 border border-white/20 rounded-2xl flex items-center justify-center cursor-pointer relative overflow-hidden group"
                                    >
                                        <AnimatePresence>
                                            {cell && (
                                                <motion.span
                                                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                                    className={`text-6xl md:text-8xl font-pixel ${cell === 'X' ? 'text-blue-400' : 'text-red-500'}`}
                                                >
                                                    {cell}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Opponent Column */}
                        <div className="flex flex-col items-center gap-4 order-3 relative">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse" />
                                <img src={opponentPortrait} alt={opponentName} className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 filter sepia(0.5) hue-rotate(-20deg)" />

                                {/* Dialogue Bubble */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={opponentSpeech}
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-white p-4 rounded-3xl rounded-bl-none shadow-2xl z-20 shadow-red-500/20"
                                    >
                                        <p className="text-gray-900 font-mono text-sm leading-tight">{opponentSpeech}</p>
                                        <div className="absolute -bottom-4 left-0 w-8 h-8 bg-white rotate-45" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="bg-red-500/20 border border-red-500/50 px-6 py-2 rounded-full flex items-center gap-3">
                                <div className="w-2 h-2 bg-red-500 animate-ping rounded-full" />
                                <span className="text-red-400 font-pixel text-sm uppercase">{opponentName} (O)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Overlays */}
                {gameState !== 'playing' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-8 text-center"
                    >
                        <div className="max-w-md">
                            <h3 className={`text-5xl font-pixel mb-6 ${gameState === 'success' ? 'text-green-400' : 'text-red-500'}`}>
                                {gameState === 'success' ? 'ANOMALÍA SUPERADA' : 'SISTEMA BLOQUEADO'}
                            </h3>
                            <p className="text-white/80 font-mono mb-8 italic">
                                {gameState === 'success'
                                    ? "Has logrado romper el ciclo de repetición. La realidad se estabiliza..."
                                    : "El adversario ha tomado el control del bucle. No podrás volver a esta ruta."}
                            </p>
                            <div className="animate-pulse text-[#0098CD] font-pixel text-xs">REDIRECCIONANDO...</div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};
