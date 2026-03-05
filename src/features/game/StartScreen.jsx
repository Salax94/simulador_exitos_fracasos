import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useAudio } from '../../hooks/useAudio';

const characters = [
    {
        type: 'male',
        label: 'Richard',
        portrait: '/assets/personaje_hombre.png',
    },
    {
        type: 'female',
        label: 'Ileana',
        portrait: '/assets/personaje_mujer.png',
    }
];

const BackgroundAnimation = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-15 z-0">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-[#0098CD] rounded-full blur-3xl"
                    style={{
                        width: Math.random() * 200 + 100,
                        height: Math.random() * 200 + 100,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 60 - 30],
                        y: [0, Math.random() * 60 - 30],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
            <div className="absolute inset-0 institutional-bg" />
        </div>
    );
};

export const StartScreen = () => {
    const [selected, setSelected] = useState(null);
    const { startGame, setShowDebug } = useGameStore();
    const { playSFX, changeBGM } = useAudio();

    // Konami / WASD Code Detection
    const [inputBuffer, setInputBuffer] = useState([]);
    const codes = [
        ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'],
        ['w', 'w', 's', 's', 'a', 'd', 'a', 'd']
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            const nextBuffer = [...inputBuffer, e.key].slice(-8);
            setInputBuffer(nextBuffer);

            const isMatch = codes.some(code =>
                code.length === nextBuffer.length &&
                code.every((val, index) => val.toLowerCase() === nextBuffer[index].toLowerCase())
            );

            if (isMatch) {
                setShowDebug(true);
                playSFX('success');
                // Optional: visual feedback
                console.log("DEBUG ENABLED");
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputBuffer, setShowDebug, playSFX]);

    // Removed automatic BGM start on mount to comply with browser autoplay policies.
    // BGM will start upon the first user interaction (selection).
    useEffect(() => {
        // changeBGM logic moved to handleSelect to ensure user interaction
    }, []);

    const handleSelect = (char) => {
        playSFX('click');
        changeBGM('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        setSelected(char);
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-white overflow-y-auto overflow-x-hidden font-sans">
            <BackgroundAnimation />

            {/* Logo UNIR - Tamaño equilibrado */}
            <div className="pt-6 md:pt-8 md:pl-10 z-50 flex justify-center md:justify-start w-full md:absolute md:top-0 md:left-0">
                <img
                    src="/assets/Logo_UNIR.png"
                    alt="Logo UNIR"
                    className="h-12 md:h-20 lg:h-24 object-contain drop-shadow-sm"
                />
            </div>

            <main className="flex-grow flex flex-col items-center justify-center px-4 py-4 md:py-8 relative z-20 w-full mt-4 md:mt-16">
                {/* Título - Más compacto */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 md:mb-10 w-full max-w-4xl"
                >
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-[#333333] mb-2 leading-tight">
                        ÉXITOS Y FRACASOS EN LA <br className="hidden md:block" />
                        <span className="text-[#0098CD]">INGENIERÍA INFORMÁTICA</span>
                    </h1>
                    <div className="bg-[#0098CD] text-white inline-block px-4 py-1 font-pixel text-[9px] md:text-[11px] uppercase tracking-widest border border-black">
                        Selecciona tu identidad
                    </div>
                </motion.div>

                {/* Selección de Personaje - Más pequeños para visibilidad */}
                <div className="flex flex-row justify-center items-center gap-4 md:gap-8 mb-8 md:mb-12 w-full px-2">
                    {characters.map((char) => (
                        <motion.div
                            key={char.type}
                            whileHover={{ y: -5 }}
                            className={`cursor-pointer unir-card p-3 md:p-5 flex flex-col items-center text-center w-36 md:w-52 border-2 transition-all duration-300 rounded-none shadow-lg ${selected?.type === char.type ? 'selected border-[#0098CD] bg-[#0098CD]/5 ring-2 ring-[#0098CD]/20' : 'border-gray-100'
                                }`}
                            onClick={() => handleSelect(char)}
                        >
                            <div className="w-full aspect-[3/4] mb-2 bg-gray-50 flex items-center justify-center p-1 border border-gray-100">
                                <img
                                    src={char.portrait}
                                    alt={char.label}
                                    className="w-full h-full object-contain image-pixelated"
                                />
                            </div>
                            <h3 className={`text-base md:text-xl font-black ${selected?.type === char.type ? 'text-[#0098CD]' : 'text-gray-800'}`}>
                                {char.label}
                            </h3>
                            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tight">Estudiante</p>
                        </motion.div>
                    ))}
                </div>

                {/* Botón Iniciar - Ajustado */}
                <div className="mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`pixel-button-unir text-sm md:text-base px-10 md:px-16 py-3 ${!selected ? 'opacity-30 cursor-not-allowed grayscale' : ''}`}
                        disabled={!selected}
                        onClick={() => {
                            playSFX('click');
                            startGame(selected);
                        }}
                    >
                        INICIAR JUEGO
                    </motion.button>
                </div>
            </main>

            {/* Footer Negro Estilo UNIR Compacto */}
            <footer className="w-full py-6 md:py-8 px-6 bg-[#1a1a1a] text-white border-t-4 border-[#0098CD] relative z-30">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4 md:gap-6">
                    <div className="space-y-1 md:space-y-2">
                        <p className="text-[10px] md:text-xs font-bold tracking-wider uppercase opacity-80">
                            Juego educativo para foro estudiantil calificable
                        </p>
                        <p className="text-sm md:text-lg font-black text-[#0098CD]">
                            Universidad Internacional de La Rioja (UNIR)
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-tighter">
                            Programa de Ingeniería Informática
                        </p>
                    </div>

                    <div className="pt-4 border-t border-gray-700 w-full max-w-lg">
                        <p className="text-sm md:text-lg font-bold">
                            Desarrollado por: <span className="text-white font-black underline decoration-[#0098CD] decoration-2 underline-offset-4 tracking-wide uppercase">Anllyli Galeano</span>
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-8 h-0.5 bg-[#0098CD]" />
                        <div className="w-8 h-0.5 bg-white opacity-30" />
                        <div className="w-8 h-0.5 bg-[#0098CD]" />
                    </div>
                </div>
            </footer>
        </div>
    );
};
