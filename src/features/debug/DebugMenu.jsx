import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Play, X, Bug } from 'lucide-react';

export const DebugMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { goToScene, gameState, showDebug } = useGameStore();

    if (!showDebug || gameState === 'start') return null;

    const minigames = [
        { id: 'debug_snake', label: 'Snake (PM)', icon: <Play size={14} /> },
        { id: 'debug_space_invaders', label: 'Space Invaders (Dev)', icon: <Play size={14} /> },
        { id: 'debug_tetris', label: 'Tetris (Dev)', icon: <Play size={14} /> },
        { id: 'debug_memory', label: 'Memory (PM)', icon: <Play size={14} /> },
        { id: 'debug_director', label: 'Director (PM)', icon: <Play size={14} /> },
        { id: 'debug_zip', label: 'Zip (Analyst)', icon: <Play size={14} /> },
        { id: 'debug_datacenter', label: 'Datacenter (Analyst)', icon: <Play size={14} /> },
        { id: 'debug_tictactoe', label: 'TicTacToe (PM)', icon: <Play size={14} /> },
        { id: 'debug_placeholder', label: 'Placeholder', icon: <Play size={14} /> },
    ];

    const secrets = [
        { id: 'debug_secret_dev', label: 'Ruky Secret (Dev)' },
        { id: 'debug_secret_dir', label: 'Frank Secret (PM)' },
        { id: 'debug_secret_ana', label: 'Yui Secret (Ana)' },
        { id: 'debug_secret_win', label: 'Final Secreto (Credits)' },
    ];

    return (
        <>
            {/* Pulsador de Debug */}
            <div className="fixed bottom-4 right-4 z-[999]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-[#050b14] border-2 border-[#0098CD]/50 text-[#0098CD] rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                    title="Debug Menu"
                >
                    <Bug size={24} />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-20 right-4 z-[999] w-64 bg-[#050b14]/95 backdrop-blur-md border-2 border-[#0098CD] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,152,205,0.3)]"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-[#0098CD]/20 bg-[#0098CD]/10">
                            <div className="flex items-center gap-2">
                                <Bug size={16} className="text-[#0098CD]" />
                                <span className="font-pixel text-xs text-white uppercase tracking-wider">Debug Menu</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col gap-2">
                            <p className="text-[10px] font-pixel text-[#0098CD]/60 uppercase mb-2">Testar Minijuegos</p>

                            {minigames.map((mg) => (
                                <button
                                    key={mg.id}
                                    onClick={() => {
                                        goToScene(mg.id);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center justify-between w-full p-2 bg-white/5 hover:bg-[#0098CD]/20 border border-white/10 hover:border-[#0098CD]/50 rounded-xl group transition-all"
                                >
                                    <span className="text-[10px] font-pixel text-white/80 group-hover:text-white">{mg.label}</span>
                                    <div className="text-[#0098CD]">{mg.icon}</div>
                                </button>
                            ))}

                            <div className="mt-2 pt-2 border-t border-white/10">
                                <p className="text-[10px] font-pixel text-[#ff4444]/60 uppercase mb-2">Contenido Secreto</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {secrets.map((sec) => (
                                        <button
                                            key={sec.id}
                                            onClick={() => {
                                                goToScene(sec.id);
                                                setIsOpen(false);
                                            }}
                                            className="p-2 bg-red-500/10 hover:bg-red-500/30 border border-red-500/20 rounded-lg text-center transition-all"
                                        >
                                            <span className="text-[8px] font-pixel text-white/90">{sec.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-[10px] font-pixel text-[#0098CD]/60 uppercase mb-2">Herramientas Escena</p>
                                <button
                                    onClick={() => {
                                        const sceneId = prompt("Ingresa el ID de la escena:");
                                        if (sceneId) goToScene(sceneId);
                                    }}
                                    className="w-full p-2 bg-white/5 hover:bg-white/10 text-[10px] text-white/70 font-pixel rounded-lg transition-all"
                                >
                                    Ir a escena por ID
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
