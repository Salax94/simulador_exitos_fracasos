import React from 'react';
import { motion } from 'framer-motion';

export const PlaceholderMinigame = ({ onComplete }) => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="pixel-box p-12 bg-[#050b14] border-2 border-[#0098CD] flex flex-col items-center gap-8 text-center"
            >
                <h2 className="text-2xl font-pixel text-[#0098CD] uppercase tracking-widest animate-pulse">
                    Módulo de Análisis en Construcción
                </h2>

                <p className="text-white font-mono text-lg max-w-md">
                    El sistema de visualización de datos está siendo calibrado por el equipo de ingeniería informática.
                    Por favor, confirma que los datos procesados son correctos para continuar.
                </p>

                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-y-0 left-0 bg-game-accent"
                    />
                </div>

                <button
                    onClick={onComplete}
                    className="pixel-button-unir !bg-[#0098CD] !text-white !px-12 !py-4 hover:scale-105 transition-transform"
                >
                    CONTINUAR ANÁLISIS
                </button>
            </motion.div>
        </div>
    );
};
