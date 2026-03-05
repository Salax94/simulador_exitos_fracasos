import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useAudio } from '../../hooks/useAudio';

export const DialogBox = ({ scene }) => {
    const { goToScene, addPoints, determineRole, currentCharacter, currentRole, roleNames, setTotalDays } = useGameStore();
    const { playSFX } = useAudio();

    const getSpeakerName = () => {
        if (scene.speaker === 'IA') return 'Asistente UNIR';
        if (scene.speaker === 'Player') return currentCharacter?.label || 'Jugador';
        return scene.speaker;
    };

    const speakerName = getSpeakerName();
    const minigameAttempts = useGameStore(state => state.minigameAttempts);

    // 1. Process text (Support arrays for random responses)
    const processedText = React.useMemo(() => {
        let rawText = scene.text;

        // If text is an array, pick one based on scene.id to keep it consistent during re-renders 
        // OR better, we could pick it once. Since DialogBox re-renders on scene change, 
        // we can use a stable random if needed, but simple array access is fine for now as scene changes swap the component.
        if (Array.isArray(rawText)) {
            // Seeded-ish random for the duration of the scene display
            const index = Math.floor(Math.random() * rawText.length);
            rawText = rawText[index];
        }

        if (!rawText) return "";

        let text = rawText.replace('[ROLE]', currentRole ? roleNames[currentRole] : '');

        const isFemale = currentCharacter?.type === 'female';
        text = text
            .replace(/\[O\/A\]/g, isFemale ? 'a' : 'o')
            .replace(/\[GUAPO\/A\]/g, isFemale ? 'guapa' : 'guapo')
            .replace(/\[JEFE\/A\]/g, isFemale ? 'jefa' : 'jefe')
            .replace(/\[EL\/LA\]/g, isFemale ? 'La' : 'El')
            .replace(/\[ESTIRADO\/A\]/g, isFemale ? 'estirada' : 'estirado')
            .replace(/\[ALT:(.*?)\|(.*?)\]/g, isFemale ? '$2' : '$1');

        if (scene.id === 'interview_start') {
            const intros = {
                director: "Para un Project Manager, la gestión de recursos y la memoria son vitales. He preparado un test de retención de activos críticos. ¿Podrás emparejarlos todos bajo presión?",
                analyst: "Como Analista de Datos, tu fuerte debe ser el reconocimiento de patrones y secuencias lógicas. Deberás descifrar nuestra matriz de símbolos. ¿Estás preparado?",
                developer: "Como Desarrollador, valoramos la capacidad de optimización y organización de estructuras en tiempo real. He preparado un entorno de depuración de bloques. ¿Demostrarás tu habilidad?"
            };
            return intros[currentRole] || text;
        }

        if (scene.id === 'interview_fail' && minigameAttempts >= 3) {
            return "He sido paciente contigo y te he dado muchas oportunidades, pero me temo que este perfil técnico no encaja con lo que buscamos en esta compañia. Quizás debas replantearte tu carrera desde cero.";
        }

        return text;
    }, [scene.id, scene.text, currentRole, roleNames, currentCharacter, minigameAttempts]);

    // 2. Randomize options (except for fixed ones like interview_fail limit)
    const displayOptions = React.useMemo(() => {
        let options = [...(scene.options || [])];

        if (scene.id === 'interview_fail' && minigameAttempts >= 3) {
            return [{ text: "Finalizar entrevista (Game Over)", target: "game_over_interview" }];
        }

        // Only shuffle if there are more than 1 option and it's not a special technical target
        // We avoid shuffling if the scene explicitly says not to, or if they are navigation options (Continue/Next)
        const isActionScene = options.length > 1 && options.every(o => o.points);

        if (isActionScene) {
            // Fisher-Yates shuffle
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
        }

        return options;
    }, [scene.id, scene.options, minigameAttempts]);

    const handleOptionClick = (option) => {
        playSFX('click');
        if (option.points) {
            addPoints(option.points);
        }

        if (option.setDay !== undefined) {
            setTotalDays(option.setDay);
        }

        if (option.target === 'DETERMINE_ROLE') {
            const role = determineRole();
            const { blockedRoles } = useGameStore.getState();
            if (blockedRoles.includes(role)) {
                const blockedMap = {
                    developer: 'secret_blocked_developer',
                    director: 'secret_blocked_director',
                    analyst: 'secret_blocked_analyst'
                };
                goToScene(blockedMap[role]);
                return;
            }
            goToScene('role_result');
        } else if (option.target === 'BLOCK_ROUTE') {
            const { blockRole, currentRole, resetGame } = useGameStore.getState();
            blockRole(currentRole);
            resetGame();
        } else if (option.target === 'RESET_GAME') {
            const { resetGame } = useGameStore.getState();
            resetGame();
        } else if (option.target === 'START_MINIGAME') {
            const minigameMap = {
                director: 'minigame_pm',
                developer: 'minigame_developer',
                analyst: 'minigame_analyst'
            };
            goToScene(minigameMap[currentRole] || 'minigame_pm');
        } else if (option.target === 'START_BRANCH') {
            const { setTotalDays, clearAnswers, resetMinigameAttempts } = useGameStore.getState();
            clearAnswers();
            resetMinigameAttempts();
            setTotalDays(19); // Reset to Day 20 (End of Intro)
            const nextScene = `${currentRole}_1`;
            goToScene(nextScene);
        } else if (option.target === 'FINALIZE_DEVELOPER_V2') {
            const { answers } = useGameStore.getState();
            // Decisions logic: 1, 3, 5, 7 indices (0, 2, 4, 6 in answers array)
            // Questions: Combat, Bug Fantasma, Crafting/Climate, Exploit
            const claveResult = [answers[0], answers[2], answers[4], answers[6]].join('');

            const successPatterns = ['AAAA', 'ABAB', 'BAAA', 'AABA', 'BBAA', 'AABB', 'AAAA'];
            const failurePatterns = ['CCCC', 'CBCC', 'BCCC', 'CCBC', 'CCCB', 'BBCC', 'CCCC'];

            // Weighted success: Mostly A and B are good, C is high risk
            const cCount = (claveResult.match(/C/g) || []).length;
            const aCount = (claveResult.match(/A/g) || []).length;

            if (cCount >= 3) {
                const { finishRole } = useGameStore.getState();
                finishRole('developer');
                goToScene('final_developer_fail');
            } else if (aCount >= 2) {
                const { finishRole } = useGameStore.getState();
                finishRole('developer');
                goToScene('final_developer_success');
            } else {
                const { finishRole } = useGameStore.getState();
                finishRole('developer');
                goToScene('final_developer_success'); // Default to success if balanced
            }
        } else if (option.target === 'FINALIZE_ANALYST') {
            const { answers } = useGameStore.getState();
            // Decisions logic: 1, 3, 5, 7 indices (0, 2, 4, 6 in answers array)
            const claveResult = [answers[0], answers[2], answers[4], answers[6]].join('');

            const successPatterns = ['AAAA', 'ABAA', 'BAAA', 'AABA', 'BBAA'];
            const failurePatterns = ['CCCC', 'CBCC', 'BCCC', 'CCBC', 'CCCB'];

            const { finishRole } = useGameStore.getState();
            finishRole('analyst');
            if (failurePatterns.includes(claveResult)) {
                goToScene('analyst_final_fail');
            } else if (successPatterns.includes(claveResult)) {
                goToScene('analyst_final_success');
            } else {
                // Default to success if not explicitly failure
                goToScene('analyst_final_success');
            }
        } else if (option.target === 'FINALIZE_DIRECTOR') {
            const { answers } = useGameStore.getState();
            // Decisions logic: 1, 3, 5, 7 indices (0, 2, 4, 6 in answers array)
            const claveResult = [answers[0], answers[2], answers[4], answers[6]].join('');

            const successPatterns = ['AAAA', 'ABAA', 'BAAA', 'AABA', 'BBAA'];
            const failurePatterns = ['CCCC', 'CBCC', 'BCCC', 'CCBC', 'CCCB'];

            const { finishRole } = useGameStore.getState();
            finishRole('director');
            if (failurePatterns.includes(claveResult)) {
                goToScene('final_director_fail');
            } else if (successPatterns.includes(claveResult)) {
                goToScene('final_director_success');
            } else {
                // Default to success if not explicitly failure
                goToScene('final_director_success');
            }
        } else {
            goToScene(option.target);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={scene.id}
            className="pixel-box p-4 md:p-5 bg-white border-t-4 border-[#0098CD] shadow-2xl max-w-7xl mx-auto"
        >
            <div className="mb-4">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`text-base md:text-lg text-black font-mono font-bold leading-snug ${scene.autoTimer ? 'text-center text-xl md:text-2xl py-8' : ''}`}
                >
                    {speakerName && (
                        <span className="text-[#0098CD] mr-2 tracking-tighter">
                            {speakerName}:
                        </span>
                    )}
                    {scene.text && (
                        <span dangerouslySetInnerHTML={{ __html: processedText }} />
                    )}
                </motion.p>
            </div>

            {displayOptions && displayOptions.length > 0 && (
                <div className="flex flex-col gap-2">
                    {displayOptions.map((option, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            onClick={() => handleOptionClick(option)}
                            className="pixel-button-unir w-full text-left flex items-center group !bg-[#333] hover:!bg-[#0098CD] border-white/20 !px-4 !py-2"
                        >
                            <span className="mr-3 text-game-accent">{'>'}</span>
                            <span className="text-xs md:text-sm">
                                {option.text
                                    .replace(/^[ABC]\)\s*/i, '')
                                    .replace(/\[O\/A\]/g, currentCharacter?.type === 'female' ? 'a' : 'o')
                                    .replace(/\[GUAPO\/A\]/g, currentCharacter?.type === 'female' ? 'guapa' : 'guapo')
                                    .replace(/\[JEFE\/A\]/g, currentCharacter?.type === 'female' ? 'jefa' : 'jefe')
                                    .replace(/\[EL\/LA\]/g, currentCharacter?.type === 'female' ? 'La' : 'El')
                                    .replace(/\[ESTIRADO\/A\]/g, currentCharacter?.type === 'female' ? 'estirada' : 'estirado')
                                    .replace(/\[ALT:(.*?)\|(.*?)\]/g, currentCharacter?.type === 'female' ? '$2' : '$1')
                                }
                            </span>
                        </motion.button>
                    ))}
                </div>
            )}
        </motion.div>
    );
};
