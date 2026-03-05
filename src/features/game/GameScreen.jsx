import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { scenes } from '../../data/scenes';
import { DialogBox } from './DialogBox';
import { DirectorMinigame } from './DirectorMinigame';
import { TetrisMinigame } from './TetrisMinigame';
import { MemoryMinigame } from './MemoryMinigame';
import { SnakeMinigame } from './SnakeMinigame';
import { SpaceInvadersMinigame } from './SpaceInvadersMinigame';
import { ZipMinigame } from './ZipMinigame';
import { DatacenterMinigame } from './DatacenterMinigame';
import { TicTacToeMinigame } from './TicTacToeMinigame';
import { SimonSaysMinigame } from './SimonSaysMinigame';
import { MemoryPathMinigame } from './MemoryPathMinigame';
import { PlaceholderMinigame } from './PlaceholderMinigame';
import { SecretTicTacToeMinigame } from './SecretTicTacToeMinigame';
import { FinalReport } from './FinalReport';
import { LogOut, Volume2, VolumeX, Plus, Minus } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

export const GameScreen = () => {
    const { currentSceneId, currentCharacter, goToScene, resetGame, currentRole, roleNames, audioSettings, setAudioSetting, toggleMute, incrementMinigameAttempts, totalDays, setTotalDays, advanceTime, formatGameTime, isRepeatSession } = useGameStore();
    const { playSFX, changeBGM } = useAudio();
    const scene = scenes[currentSceneId];

    // Animation state for sprites
    const [animationFrame, setAnimationFrame] = useState(0);

    useEffect(() => {
        if (scene && scene.aiAnimation) {
            const { frames, interval, once } = scene.aiAnimation;
            const timer = setInterval(() => {
                setAnimationFrame((prev) => {
                    const nextFrame = prev + 1;
                    if (once && nextFrame >= frames.length) {
                        clearInterval(timer);
                        return prev; // Stay on last frame
                    }
                    return nextFrame % frames.length;
                });
            }, interval || 500);
            return () => clearInterval(timer);
        } else {
            setAnimationFrame(0);
        }
    }, [currentSceneId, scene]);

    // Handle auto-transitions (one week later, etc)
    useEffect(() => {
        if (scene && scene.autoTimer) {
            const timer = setTimeout(() => {
                const target = scene.autoTimer.target === 'START_BRANCH'
                    ? `${currentRole}_1`
                    : scene.autoTimer.target;
                goToScene(target);
            }, scene.autoTimer.duration);
            return () => clearTimeout(timer);
        }
    }, [currentSceneId, scene, goToScene, currentRole]);

    // Play SFX, Change BGM and Update Day on scene transition
    useEffect(() => {
        if (currentSceneId) {
            playSFX('transition');

            // Intercept Q2 if it's a repeat session
            if (isRepeatSession) {
                const q2Scenes = ['developer_2', 'analyst_q2', 'director_q2'];
                if (q2Scenes.includes(currentSceneId)) {
                    goToScene('secret_glitch');
                    return;
                }
            }

            // Handle secret redirect logic
            if (scene && scene.redirectLogic) {
                const redirectMap = {
                    developer: 'secret_developer_intro',
                    analyst: 'secret_analyst_intro',
                    director: 'secret_director_intro'
                };
                goToScene(redirectMap[currentRole] || 'intro_1');
                return;
            }

            // Handle automatic time jumps from scene data
            if (scene && scene.advanceDays !== undefined) {
                advanceTime(scene.advanceDays);
            }

            // Check if scene has a specific music track defined
            if (scene && scene.musicTrack) {
                changeBGM(scene.musicTrack);
            }
        }
    }, [currentSceneId, scene, setTotalDays, advanceTime, playSFX, changeBGM, isRepeatSession, currentRole, goToScene]);

    if (!scene) return null;

    const handleMinigameFail = () => {
        const { minigameAttempts, incrementMinigameAttempts, goToScene } = useGameStore.getState();
        const futureAttempts = minigameAttempts + 1; // This is the attempt count AFTER increment
        incrementMinigameAttempts();

        // Special logic for developer route: 1 initial + 1 repetition (total 2)
        if (scene.id === 'developer_minigame') {
            if (futureAttempts < 2) {
                // First attempt failed: Go to narrative retry
                goToScene('developer_minigame_retry');
                return;
            }
        }

        if (scene.id === 'developer_final_minigame') {
            goToScene('developer_post_launch');
            return;
        }

        const target = scene.failScene || 'interview_fail';
        goToScene(target);
    };

    const handleMinigameSuccess = () => {
        let target = scene.nextScene || 'interview_success';
        if (scene.id === 'developer_minigame') {
            target = 'developer_minigame_success';
        }
        if (scene.id === 'developer_final_minigame') {
            target = 'developer_post_launch';
        }
        goToScene(target);
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden select-none">
            {/* 1. Fondo (Background) - Lowest Layer */}
            <div className="absolute inset-0 layer-bg">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={scene.background}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${scene.background})` }}
                    >
                        {currentSceneId === 'secret_glitch' && (
                            <div className="glitch-overlay" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 2. Personajes (Sprites) - Middle Layer */}
            {!scene.minigame && (
                <div className="absolute inset-0 flex items-end justify-center layer-character pointer-events-none pb-24 px-12">
                    <AnimatePresence mode="popLayout">
                        {/* Personaje Jugador - Solo si no está explícitamente oculto */}
                        {!scene.hidePlayer && currentCharacter && (() => {
                            const gender = currentCharacter.type === 'female' ? 'mujer' : 'hombre';

                            // Determine skin with proper fallbacks
                            let skin = scene.playerSkin;
                            if (!skin) {
                                if (currentRole === 'director') skin = 'project';
                                else if (currentRole === 'developer') skin = 'desarrollador';
                                else if (currentRole === 'analyst') skin = 'analista';
                                else skin = 'estudiante';
                            }

                            let skinSuffix = skin;
                            // Handle gender-specific naming for 'desarrollador'
                            if (gender === 'mujer' && skin === 'desarrollador') skinSuffix = 'desarrolladora';

                            return (
                                <motion.img
                                    key={`player-${currentCharacter.type}-${skin}`}
                                    src={`/assets/personaje_${gender}_${skinSuffix}.png`}
                                    initial={{ opacity: 0, x: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: 1,
                                        x: scene.showAI ? "45%" : "0%",
                                        scale: 1
                                    }}
                                    exit={{ opacity: 0, x: "100%" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20,
                                        duration: 0.6
                                    }}
                                    className="h-[70vh] md:h-[80vh] object-contain image-pixelated absolute"
                                />
                            );
                        })()}

                        {/* Personaje NPC (IA / Entrevistador) */}
                        {scene.showAI && (
                            <motion.img
                                key={scene.aiAnimation ? `anim-${currentSceneId}` : (scene.aiPortrait || "default-ia")}
                                src={scene.aiAnimation ? scene.aiAnimation.frames[animationFrame] : (scene.aiPortrait || "/assets/personaje_ia.png")}
                                initial={{
                                    opacity: 0,
                                    x: scene.centerAI ? "0%" : "-100%",
                                    y: ((scene.aiPortrait?.includes('ruky') || (scene.aiAnimation && scene.aiAnimation.frames[0].includes('frank'))) && !scene.aiPortrait?.includes('laura')) ? (scene.aiPortrait?.includes('ruky') ? "40px" : "0px") : "0px",
                                    scale: (scene.aiPortrait?.includes('ruky') && !scene.aiPortrait?.includes('laura')) ? 0.4 : 0.7
                                }}
                                animate={{
                                    opacity: 1,
                                    x: (scene.aiPortrait?.includes('ruky') && !scene.aiPortrait?.includes('laura')) ? "-25%" : (scene.centerAI ? "0%" : "-45%"),
                                    y: (scene.aiPortrait?.includes('ruky') && !scene.aiPortrait?.includes('laura')) ? "40px" : "0px",
                                    scale: (scene.aiPortrait?.includes('ruky') && !scene.aiPortrait?.includes('laura')) ? 0.63 : (scene.aiPortrait?.includes('arquitecto') ? 1.035 : 0.9)
                                }}
                                exit={{ opacity: 0, x: "-100%" }}
                                transition={{
                                    delay: 0.1,
                                    type: "spring",
                                    stiffness: 80,
                                    damping: 15,
                                    duration: 0.8
                                }}
                                className="h-[70vh] md:h-[80vh] object-contain image-pixelated absolute"
                            />
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* 3. UI Layer - Top Layer */}
            <div className="relative z-30 flex flex-col h-screen layer-ui">
                {/* Header Info */}
                <div className="flex justify-between items-start p-6">
                    <div className="pixel-box px-4 py-3 flex items-center gap-5 !bg-[#050b14] !border-[#0098CD] shadow-[0_0_20px_rgba(0,152,205,0.2)]">
                        {/* Portrait */}
                        <div className="w-12 h-12 border-2 border-[#0098CD] bg-white/5 p-1 relative">
                            {currentCharacter?.portrait && (
                                <img src={currentCharacter.portrait} alt="Bio" className="w-full h-full object-contain" />
                            )}
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#050b14] rounded-full animate-pulse" />
                        </div>

                        {/* Info Content */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-3">
                                <h4 className="font-pixel text-sm md:text-base text-white tracking-tighter">
                                    {currentCharacter?.label?.toUpperCase() || "JUGADOR"}
                                </h4>
                                <span className="text-[8px] font-pixel text-[#0098CD] border border-[#0098CD]/30 px-1.5 py-0.5 rounded-sm">
                                    ID: STU_001
                                </span>
                            </div>

                            <div className="flex items-center gap-4 border-t border-white/10 pt-1.5">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[8px] font-pixel text-game-accent/60 uppercase">Rol</span>
                                    <span className="text-[10px] md:text-xs font-pixel text-white/90">
                                        {currentRole ? roleNames[currentRole] : "Aspirante"}
                                    </span>
                                </div>
                                <div className="w-px h-6 bg-white/10" />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[8px] font-pixel text-game-accent/60 uppercase">Fase</span>
                                    <span className="text-[10px] md:text-xs font-pixel text-white/90">
                                        {formatGameTime()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Audio Controls */}
                        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-sm mr-4">
                            <button
                                onClick={toggleMute}
                                className="p-2 text-white hover:text-game-accent transition-colors"
                                title={audioSettings.isMuted ? "Unmute" : "Mute"}
                            >
                                {audioSettings.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>

                            <div className="h-4 w-[1px] bg-white/10" />

                            <button
                                onClick={() => setAudioSetting('bgmVolume', Math.max(0, audioSettings.bgmVolume - 0.1))}
                                className="p-1 text-white hover:text-red-500 transition-colors"
                            >
                                <Minus size={14} />
                            </button>

                            <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden relative">
                                <div
                                    className="absolute inset-y-0 left-0 bg-game-accent transition-all duration-300"
                                    style={{ width: `${audioSettings.bgmVolume * 100}%` }}
                                />
                            </div>

                            <button
                                onClick={() => setAudioSetting('bgmVolume', Math.min(1, audioSettings.bgmVolume + 0.1))}
                                className="p-1 text-white hover:text-green-500 transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>

                        <button
                            onClick={resetGame}
                            className="pixel-button !p-2 !bg-red-600 !text-white"
                            title="Abandonar puesto"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>

                {/* Narrative Section, Minigame or Game Over Overlay */}
                <div className="mt-auto w-full max-w-7xl mx-auto p-6 max-h-[70vh]">
                    <AnimatePresence mode="wait">
                        {scene.isGameOver ? (
                            <motion.div
                                key="game-over-arcade"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl p-6"
                            >
                                {scene.text ? (
                                    <motion.div
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        className="pixel-box max-w-2xl w-full p-8 md:p-12 bg-[#050b14] border-2 border-[#0098CD] flex flex-col gap-8"
                                    >
                                        <div className="flex justify-between items-center border-b border-[#0098CD]/30 pb-4">
                                            <h2 className="text-[#0098CD] font-pixel text-xl tracking-widest uppercase">Informe de Gestión</h2>
                                            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                                        </div>

                                        <p className="text-white font-mono text-lg md:text-xl leading-relaxed whitespace-pre-line text-center">
                                            {scene.text}
                                        </p>

                                        <div className="grid grid-cols-1 gap-4 mt-4">
                                            {scene.options?.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        if (opt.target === 'START_BRANCH') {
                                                            const { setTotalDays, clearAnswers, resetMinigameAttempts, goToScene } = useGameStore.getState();
                                                            clearAnswers();
                                                            resetMinigameAttempts();
                                                            setTotalDays(19); // Day 20 start
                                                            goToScene(`${currentRole}_1`);
                                                        } else {
                                                            resetGame();
                                                        }
                                                    }}
                                                    className="pixel-button-unir !bg-[#0098CD] !text-white !py-4"
                                                >
                                                    {opt.text}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            animate={{
                                                textShadow: ["0 0 20px #ff0000", "0 0 40px #ff0000", "0 0 20px #ff0000"],
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                            className="text-7xl md:text-9xl font-pixel text-red-600 italic tracking-tighter"
                                        >
                                            GAME OVER
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1 }}
                                            className="mt-8 text-[#0098CD] font-pixel text-sm md:text-xl animate-pulse tracking-[0.5em]"
                                        >
                                            REESTABLECIENDO CONEXIÓN...
                                        </motion.div>
                                    </div>
                                )}
                                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[210] bg-[length:100%_2px,3px_100%]" />
                            </motion.div>
                        ) : scene.minigame === 'director' ? (
                            <motion.div
                                key="minigame-container-director"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <DirectorMinigame
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.minigame === 'tetris' ? (
                            <motion.div
                                key="minigame-container-tetris"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <TetrisMinigame
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.minigame === 'memory' ? (
                            <motion.div
                                key="minigame-container-memory"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <MemoryMinigame
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.minigame === 'snake' ? (
                            <motion.div
                                key="minigame-container-snake"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <SnakeMinigame
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.minigame === 'space_invaders' ? (
                            <motion.div
                                key="minigame-container-space-invaders"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <SpaceInvadersMinigame
                                    difficulty={(() => {
                                        const { answers } = useGameStore.getState();
                                        const claveResult = [answers[0], answers[2], answers[4], answers[6]].join('');
                                        const cCount = (claveResult.match(/C/g) || []).length;
                                        return cCount >= 3 ? 'hard' : (cCount >= 1 ? 'normal' : 'easy');
                                    })()}
                                    onComplete={handleMinigameSuccess}
                                />
                            </motion.div>
                        ) : scene.minigame === 'placeholder' ? (
                            <motion.div
                                key="minigame-container-placeholder"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <PlaceholderMinigame
                                    onComplete={handleMinigameSuccess}
                                />
                            </motion.div>
                        ) : scene.minigame === 'zip' ? (
                            <motion.div
                                key="minigame-container-zip"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ZipMinigame
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.minigame === 'secret_tictactoe' ? (
                            <motion.div
                                key="minigame-container-secret-tictactoe"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <SecretTicTacToeMinigame
                                    opponentName={scene.opponentName}
                                    opponentPortrait={scene.opponentPortrait}
                                    playerPortrait={currentCharacter?.portrait}
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.minigame === 'tictactoe' ? (
                            <motion.div
                                key="minigame-container-tictactoe"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <TicTacToeMinigame
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.minigame === 'simonsays' ? (
                            <motion.div
                                key="minigame-container-simonsays"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <SimonSaysMinigame
                                    totalRounds={scene.minigameProps?.totalRounds}
                                    initialCount={scene.minigameProps?.initialCount}
                                    initialLives={scene.minigameProps?.initialLives}
                                    showTimer={scene.minigameProps?.showTimer}
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.minigame === 'memorypath' ? (
                            <motion.div
                                key="minigame-container-memorypath"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <MemoryPathMinigame
                                    totalRounds={scene.minigameProps?.totalRounds}
                                    initialCount={scene.minigameProps?.initialCount}
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : (scene.minigame === 'conflict' || scene.minigame === 'datacenter') ? (
                            <motion.div
                                key="minigame-container-datacenter"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <DatacenterMinigame
                                    difficulty={(() => {
                                        const { answers } = useGameStore.getState();
                                        // Count 'C' (bad/aggressive choices) to determine difficulty
                                        const cCount = answers.filter(a => a === 'C').length;
                                        return cCount >= 4 ? 'hard' : 'easy';
                                    })()}
                                    noRetry={scene.noRetry}
                                    onComplete={handleMinigameSuccess}
                                    onFail={handleMinigameFail}
                                />
                            </motion.div>
                        ) : scene.isFinalReport ? (
                            <motion.div
                                key={`report-${scene.id}`}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <FinalReport
                                    scene={scene}
                                    onAction={goToScene}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`dialog - ${scene.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <DialogBox scene={scene} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
