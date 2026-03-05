import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const assetsToPreload = {
    images: [
        '/assets/Logo_UNIR.png',
        '/assets/personaje_hombre.png',
        '/assets/personaje_mujer.png',
        '/assets/personaje_ia.png',
        '/assets/personaje_junior.png',
        '/assets/personaje_arquitecto.png',
        '/assets/entrevistador.png',
        '/assets/fondo_habitacion.png',
        '/assets/fondo_compania.png',
        '/assets/fondo_entrevista.png',
        '/assets/fondo_tasa_cafe.png',
        '/assets/fondo_escena_1.png',
        // Add more if they exist, but these are the main ones identified
    ],
    audio: [
        'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
        'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
        'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
        'https://assets.mixkit.co/active_storage/sfx/253/253-preview.mp3',
    ]
};

export const LoadingScreen = ({ onFinished }) => {
    const [progress, setProgress] = useState(0);
    const [currentTask, setCurrentTask] = useState('Inicializando sistemas...');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const totalAssets = assetsToPreload.images.length + assetsToPreload.audio.length;

        const updateProgress = (assetName) => {
            loadedCount++;
            const newProgress = Math.round((loadedCount / totalAssets) * 100);
            setProgress(newProgress);
            setCurrentTask(`Cargando: ${assetName}...`);

            if (loadedCount >= totalAssets) {
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(onFinished, 1000);
                }, 500);
            }
        };

        // Preload Images
        assetsToPreload.images.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => updateProgress(src.split('/').pop());
            img.onerror = () => updateProgress(src.split('/').pop()); // Continue even on error
        });

        // Preload Audio
        assetsToPreload.audio.forEach(url => {
            const audio = new Audio();
            audio.src = url;
            audio.oncanplaythrough = () => updateProgress('Efecto de sonido');
            audio.onerror = () => updateProgress('Efecto de sonido');
            audio.load();
        });
    }, [onFinished]);

    return (
        <div className="fixed inset-0 bg-[#050b14] z-[999] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0098CD]/20 via-transparent to-transparent" />
                <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center max-w-md w-full"
            >
                {/* Logo Section */}
                <motion.div
                    animate={{
                        filter: ["drop-shadow(0 0 0px #0098CD)", "drop-shadow(0 0 20px #0098CD)", "drop-shadow(0 0 0px #0098CD)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-12"
                >
                    <img src="/assets/Logo_UNIR.png" alt="UNIR Logo" className="h-20 object-contain brightness-110" />
                </motion.div>

                {/* Progress Bar Container */}
                <div className="w-full bg-white/5 border border-white/10 p-1.5 rounded-sm relative overflow-hidden mb-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-2 bg-[#0098CD] shadow-[0_0_15px_#0098CD]"
                    />
                </div>

                {/* Info Text */}
                <div className="flex justify-between w-full font-pixel text-[10px] tracking-widest uppercase">
                    <span className="text-white/60">{currentTask}</span>
                    <span className="text-[#0098CD]">{progress}%</span>
                </div>

                {/* Aesthetic Accents */}
                <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                                className="w-2 h-2 bg-[#0098CD]/40 transform rotate-45"
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-20 flex flex-col items-center"
                        >
                            <span className="text-white font-pixel text-xs animate-pulse">SISTEMAS LISTOS</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Corner Decorative Frames */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[#0098CD]/20" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[#0098CD]/20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-[#0098CD]/20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-[#0098CD]/20" />
        </div>
    );
};
