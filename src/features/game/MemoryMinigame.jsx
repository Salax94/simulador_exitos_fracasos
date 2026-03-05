import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';

const EMOJIS = ['📁', '📊', '🤝', '⏱️', '🎯', '💡'];
const MAX_ERRORS = 8;

export const MemoryMinigame = ({ onComplete, onFail }) => {
    const { playSFX } = useAudio();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [errors, setErrors] = useState(0);
    const [gameState, setGameState] = useState('playing');

    useEffect(() => {
        const deck = [...EMOJIS, ...EMOJIS]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));
        setCards(deck);
    }, []);

    const handleCardClick = (index) => {
        if (gameState !== 'playing' || flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        playSFX('click');
        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const card1 = cards[newFlipped[0]];
            const card2 = cards[newFlipped[1]];

            if (card1.emoji === card2.emoji) {
                // Match
                setMatched(prev => [...prev, ...newFlipped]);
                setFlipped([]);
                playSFX('success');

                if (matched.length + 2 === cards.length) {
                    setGameState('success');
                    setTimeout(() => onComplete(), 2000);
                }
            } else {
                // Mismatch
                setTimeout(() => {
                    setFlipped([]);
                    setErrors(prev => {
                        const newErrors = prev + 1;
                        if (newErrors >= MAX_ERRORS) {
                            setGameState('fail');
                            playSFX('fail');
                            setTimeout(() => onFail(), 2000);
                        }
                        return newErrors;
                    });
                }, 1000);
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-[rgba(5,11,20,0.85)] backdrop-blur-md"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-5xl w-full">
                    {/* Instructions Panel (LEFT) */}
                    <div className="hidden lg:flex flex-col w-72 bg-[#050b14]/80 border-2 border-[#0098CD]/20 rounded-2xl p-6 shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0098CD]/50" />
                        <h3 className="text-[#0098CD] font-pixel text-xs mb-4 tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#0098CD] animate-pulse rounded-full" />
                            GESTIÓN DE RECURSOS CRÍTICOS
                        </h3>

                        <div className="space-y-6 flex-1 text-left">
                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Tarea</p>
                                <p className="text-white/80 font-mono text-sm leading-relaxed">
                                    En la gestión de proyectos, la memoria y la organización son los pilares del éxito. Como futuro Project Manager de la UNIR, tu misión es emparejar los recursos críticos del equipo para optimizar el roadmap antes de que el tiempo de gestión se agote.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-white/40 font-pixel text-[8px] uppercase">Instrucciones</p>
                                <ul className="text-white/80 font-mono text-sm space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Haz clic en las tarjetas para revelar los recursos.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>Encuentra todos los pares antes de agotar los intentos.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0098CD]">▶</span>
                                        <span>El sistema fallará si excedes el límite de errores permitidos.</span>
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
                                PROJECT MANAGER TEST
                            </h2>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-pixel text-xl text-white">
                                    ERRORES: <span className={errors >= MAX_ERRORS - 1 ? 'text-red-500' : 'text-[#0098CD]'}>{errors} / {MAX_ERRORS}</span>
                                </span>
                                <div className="w-full max-w-[200px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${(errors / MAX_ERRORS) * 100}%` }}
                                        className={`h-full ${errors >= MAX_ERRORS - 1 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-[#0098CD] shadow-[0_0_10px_#0098CD]'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto relative">
                            {cards.map((card, index) => {
                                const isFlipped = flipped.includes(index) || matched.includes(index);
                                return (
                                    <div
                                        key={card.id}
                                        className="aspect-square perspective-1000 cursor-pointer"
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <motion.div
                                            className="relative w-full h-full transform-style-3d shadow-xl"
                                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {/* Back of Card */}
                                            <div className="absolute inset-0 backface-hidden bg-[#0098CD]/20 border-2 border-[#0098CD]/50 flex items-center justify-center rounded-xl overflow-hidden group">
                                                <div className="text-[#0098CD] opacity-20 group-hover:opacity-40 transition-opacity">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Front of Card */}
                                            <div
                                                className="absolute inset-0 backface-hidden bg-[#0098CD] border-2 border-white/20 flex items-center justify-center rounded-xl text-3xl md:text-4xl shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]"
                                                style={{ transform: 'rotateY(180deg)' }}
                                            >
                                                {card.emoji}
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}

                            {/* Game State Overlay */}
                            {gameState !== 'playing' && (
                                <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center rounded-2xl border-2 border-[#0098CD]">
                                    <h3 className={`text-3xl font-pixel mb-4 ${gameState === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameState === 'success' ? '¡COMPLETADO!' : 'SISTEMA FALLIDO'}
                                    </h3>
                                    <p className="text-white font-mono opacity-70">
                                        {gameState === 'success'
                                            ? 'Gestión de recursos validada.'
                                            : 'Sobrecarga de errores superada.'}
                                    </p>
                                </div>
                            )}
                        </div>

                        <p className="text-center mt-8 text-white/40 font-mono text-[10px] uppercase tracking-[0.3em]">
                            Empareja los recursos del proyecto <br /> antes de exceder el límite de errores
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
