import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';

/**
 * DirectorMinigame: Versión DEFINITIVA con Lógica de Símbolos Corregida (Mapeo Específico)
 * - Estética: Pro, Gamer, Azul UNIR sobre fondo oscuro transparente.
 * - Lógica: Mapeo exacto de símbolos a posiciones según la última solicitud.
 * - Responsividad: Matriz adaptable y centrada.
 */
export const DirectorMinigame = ({ onComplete, onFail }) => {
    const { playSFX } = useAudio();
    const [grid, setGrid] = useState([]);
    const [targetCode, setTargetCode] = useState([]);
    const [targetIndices, setTargetIndices] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [attempts, setAttempts] = useState(3);
    const [gameState, setGameState] = useState('playing');
    const [shake, setShake] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const shuffledGrid = [...numbers].sort(() => Math.random() - 0.5).slice(0, 9);
        setGrid(shuffledGrid);

        const indices = [];
        for (let i = 0; i < 4; i++) {
            indices.push(Math.floor(Math.random() * 9));
        }
        setTargetIndices(indices);
        setTargetCode(indices.map(idx => shuffledGrid[idx]));
    }, []);

    const handleNumberClick = (num) => {
        if (gameState !== 'playing' || userInput.length >= 4) return;
        setUserInput(prev => prev + num);
    };

    const handleDelete = () => {
        setUserInput(prev => prev.slice(0, -1));
    };

    const verifyCode = () => {
        const correct = targetCode.join("");
        if (userInput === correct) {
            setGameState('success');
            playSFX('success');
            setTimeout(() => onComplete(), 1500);
        } else {
            setShake(true);
            setError(true);
            const remaining = attempts - 1;
            setAttempts(remaining);

            setTimeout(() => {
                setShake(false);
                setError(false);
                setUserInput("");
            }, 600);

            if (remaining <= 0) {
                setGameState('fail');
                playSFX('fail');
                setTimeout(() => onFail(), 1000);
            }
        }
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'playing') return;

            // Numbers 0-9
            if (/^[0-9]$/.test(e.key)) {
                handleNumberClick(e.key);
            }
            // Backspace to delete
            else if (e.key === 'Backspace') {
                handleDelete();
            }
            // Enter to verify
            else if (e.key === 'Enter' && userInput.length === 4) {
                verifyCode();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, userInput, targetCode]);

    /**
     * MAPEADO DE SÍMBOLOS SEGÚN INSTRUCCIONES ESPECÍFICAS (Step Id: 559):
     * (┘): superior izquierda (0) -> Borde Derecho e Inferior
     * (⊔): superior centro (1)    -> Borde Izquierdo, Derecho e Inferior (U)
     * (└): superior derecha (2)   -> Borde Izquierdo e Inferior
     * (⊐): centro izquierda (3)   -> Borde Superior, Derecho e Inferior
     * (□): centro (4)             -> Todos los bordes
     * (⊏): centro derecha (5)     -> Borde Superior, Izquierdo e Inferior
     * (┐): inferior izquierda (6) -> Borde Superior y Derecho
     * (⊓): inferior centro (7)    -> Borde Superior, Izquierdo y Derecho (n)
     * (┌): inferior derecha (8)   -> Borde Superior e Izquierdo
     */
    const renderSymbol = (index, i) => {
        const borderMap = {
            0: "border-r-4 border-b-4",           // (┘) -> Superior Izquierda
            1: "border-l-4 border-r-4 border-b-4", // (⊔) -> Superior Centro
            2: "border-l-4 border-b-4",           // (└) -> Superior Derecha
            3: "border-t-4 border-r-4 border-b-4", // (⊐) -> Centro Izquierda
            4: "border-4",                         // (□) -> Centro
            5: "border-t-4 border-l-4 border-b-4", // (⊏) -> Centro Derecha
            6: "border-t-4 border-r-4",           // (┐) -> Inferior Izquierda
            7: "border-t-4 border-l-4 border-r-4", // (⊓) -> Inferior Centro
            8: "border-t-4 border-l-4",           // (┌) -> Inferior Derecha
        };

        return (
            <motion.div
                key={`sym-${index}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-10 h-10 md:w-14 md:h-14 border-[#0098CD] inline-block mx-1 md:mx-2 shadow-[0_0_15px_rgba(0,152,205,0.4)] transition-all ${borderMap[index]}`}
            />
        );
    };

    if (grid.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-[#050b14]/70 backdrop-blur-md overflow-y-auto"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-6xl w-full">
                    {/* Instructions Panel (LEFT) */}
                    <div className="hidden lg:flex flex-col w-72 bg-[#050b14]/80 border-2 border-[#0098CD]/20 rounded-2xl p-6 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0098CD]/50" />
                        <h3 className="text-[#0098CD] font-pixel text-xs mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#0098CD] animate-pulse rounded-full" />
                            PROTOCOLO DE ACCESO ESTRATÉGICO
                        </h3>

                        <div className="space-y-6 flex-1 text-left">
                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Tarea</p>
                                <p className="text-white/80 font-mono text-sm leading-relaxed">
                                    El sistema de seguridad de la empresa utiliza un cifrado simétrico basado en formas lógicas. Como analista formado en la UNIR, tu tarea es mapear visualmente cada símbolo a su valor numérico correspondiente en la cuadrícula de datos para validar tu identidad técnica.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Instrucciones</p>
                                <ul className="text-white/80 font-mono text-sm space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Observa el mapeo de los símbolos en la cuadrícula de datos.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Ingresa el código de 4 dígitos basado en los símbolos mostrados.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Tienes 3 intentos antes de que el servidor se bloquee.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            x: shake ? [0, -10, 10, -10, 10, 0] : 0
                        }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-3xl bg-[#0a192f] border-2 border-[#0098CD] rounded-[2rem] p-6 md:p-10 shadow-[0_0_80px_rgba(0,152,205,0.4)] relative flex-1"
                    >
                        {/* Header Estilo Gamer */}
                        <div className="text-center mb-8 relative z-10">
                            <h2 className="text-3xl md:text-5xl font-pixel text-[#0098CD] drop-shadow-[0_0_15px_#0098CD] mb-2 uppercase tracking-tighter italic">ENTREVISTA TÉCNICA</h2>

                            {/* Indicador de Intentos en Texto */}
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-pixel text-xl md:text-3xl text-[#0098CD] animate-pulse">
                                    INTENTOS: {attempts} / 3
                                </span>
                                <div className="w-full max-w-[200px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "100%" }}
                                        animate={{ width: `${(attempts / 3) * 100}%` }}
                                        className="h-full bg-[#0098CD] shadow-[0_0_15px_#0098CD]"
                                    />
                                </div>
                            </div>
                        </div>

                        {gameState === 'playing' ? (
                            <div className="flex flex-col gap-8">
                                {/* Panel Principal */}
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
                                    {/* Cuadrícula de Números con Tic-Tac-Toe Style (Responsiva) */}
                                    <div className="w-full max-w-[280px] md:max-w-none md:w-auto p-4 bg-black/40 rounded-2xl border border-[#0098CD]/30 shadow-inner relative overflow-hidden transition-all duration-300">
                                        <div className="grid grid-cols-3 relative">
                                            {/* Líneas de Tic-Tac-Toe */}
                                            <div className="absolute inset-0 pointer-events-none z-20">
                                                {/* Líneas Verticales */}
                                                <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-[#0098CD]/30" />
                                                <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-[#0098CD]/30" />
                                                {/* Líneas Horizontales */}
                                                <div className="absolute top-1/3 left-0 right-0 h-1 bg-[#0098CD]/30" />
                                                <div className="absolute top-2/3 left-0 right-0 h-1 bg-[#0098CD]/30" />
                                            </div>

                                            {grid.map((num, i) => (
                                                <div
                                                    key={i}
                                                    className="aspect-square w-16 md:w-20 flex items-center justify-center text-3xl md:text-5xl font-pixel text-white relative z-10"
                                                >
                                                    {num}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Desafío Lógico */}
                                    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                                        <div className="flex justify-center bg-[#0098CD]/5 p-4 md:p-6 rounded-2xl border border-[#0098CD]/20 shadow-lg">
                                            {targetIndices.map((idx, i) => renderSymbol(idx, i))}
                                        </div>

                                        {/* Entrada del Jugador */}
                                        <div className={`w-full py-4 rounded-2xl border-2 transition-all duration-300 ${error ? 'border-red-500 bg-red-500/10' : 'border-[#0098CD] bg-black/50'} shadow-lg`}>
                                            <div className="flex justify-center gap-4">
                                                {userInput.split("").map((char, i) => (
                                                    <span key={i} className="text-4xl md:text-5xl font-pixel text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                                                        {char}
                                                    </span>
                                                ))}
                                                {Array.from({ length: 4 - userInput.length }).map((_, i) => (
                                                    <span key={i} className="text-4xl md:text-5xl font-pixel text-white/5 animate-pulse">_</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Teclado Arcade */}
                                <div className="max-w-md mx-auto w-full space-y-4">
                                    <div className="grid grid-cols-5 gap-2 md:gap-3">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                                            <motion.button
                                                key={num}
                                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,152,205,0.8)' }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleNumberClick(num.toString())}
                                                className="h-12 md:h-14 bg-[#0098CD]/20 border-2 border-[#0098CD]/50 text-white font-pixel text-lg rounded-xl transition-all"
                                            >
                                                {num}
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleDelete}
                                            className="flex-1 py-3 md:py-4 border-2 border-red-600/50 text-red-500 font-pixel text-xs rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg"
                                        >
                                            DEL
                                        </button>
                                        <button
                                            onClick={verifyCode}
                                            disabled={userInput.length < 4}
                                            className={`flex-[3] py-3 md:py-4 bg-[#0098CD] text-white font-pixel text-sm rounded-xl shadow-[0_6px_0_0_#006b91] hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#006b91] active:translate-y-[6px] active:shadow-none transition-all ${userInput.length < 4 ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
                                        >
                                            VALIDAR CODIGO
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : gameState === 'success' ? (
                            <div className="py-20 text-center">
                                <h3 className="text-4xl md:text-6xl font-pixel text-green-500 mb-6 drop-shadow-[0_0_20px_#22c55e]">¡FELICIDADES!</h3>
                                <p className="text-white font-mono text-xl opacity-70 animate-pulse px-4">
                                    Has superado la prueba técnica con éxito. Tu perfil de ANALISTA DE DATOS ha sido validado.
                                </p>
                            </div>
                        ) : (
                            <div className="py-20 text-center px-4">
                                <h3 className="text-4xl md:text-5xl font-pixel text-red-600 mb-6 drop-shadow-[0_0_15px_#ef4444]">SISTEMA BLOQUEO</h3>
                                <p className="text-white font-mono text-xl opacity-70 animate-pulse px-4 uppercase tracking-widest">
                                    No superaste la prueba tecnica
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
