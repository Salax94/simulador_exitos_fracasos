import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
    gameState: 'start', // 'start' | 'playing' | 'end'
    currentCharacter: null, // { label: string, type: string, portrait: string }
    currentSceneId: 'intro_1',

    // Scoring / Archetypes
    // Answer Sequence for Profile Test
    answers: [], // Array of 'A', 'B' or 'C'

    currentRole: null, // 'director' | 'developer' | 'analyst'
    minigameAttempts: 0,
    totalDays: 0, // General time counter in days
    showDebug: false, // Hidden by default, activated via Konami/WASD code

    // Secret Endings Logic
    finishedRoles: [], // Roles completed in the current session
    blockedRoles: [], // Roles lost to secret NPCs
    isRepeatSession: false, // Flag if the current run is a repeat of the last one

    roleNames: {
        director: 'Project Manager',
        developer: 'Desarrollador de Videojuegos',
        analyst: 'Analista de Datos'
    },

    // Audio Settings
    audioSettings: {
        bgmVolume: 0.4,
        sfxVolume: 0.7,
        isMuted: false
    },

    setAudioSetting: (key, value) => set((state) => ({
        audioSettings: { ...state.audioSettings, [key]: value }
    })),

    toggleMute: () => set((state) => ({
        audioSettings: { ...state.audioSettings, isMuted: !state.audioSettings.isMuted }
    })),

    startGame: (character) => {
        const { finishedRoles } = get();
        set({
            currentCharacter: character,
            gameState: 'playing',
            currentSceneId: 'intro_1',
            answers: [],
            currentRole: null,
            minigameAttempts: 0,
            totalDays: 0,
            isRepeatSession: false // Reset initial flag, it will be checked on role determination
        });
    },

    setTotalDays: (days) => set({ totalDays: days }),
    advanceTime: (days) => set((state) => ({ totalDays: state.totalDays + days })),

    formatGameTime: () => {
        const { totalDays } = get();
        if (totalDays === 0) return "DÍA 1";

        const years = Math.floor(totalDays / 365);
        const remainingDaysAfterYear = totalDays % 365;
        const months = Math.floor(remainingDaysAfterYear / 30);
        const remainingDaysAfterMonth = remainingDaysAfterYear % 30;
        const weeks = Math.floor(totalDays / 7);
        const days = totalDays % 7;

        let parts = [];
        if (years > 0) parts.push(`${years} ${years === 1 ? 'AÑO' : 'AÑOS'}`);
        if (months > 0) parts.push(`${months} ${months === 1 ? 'MES' : 'MESES'}`);

        // Premium switch: Show weeks if more than 2 weeks, but only if no months/years
        if (parts.length === 0 && weeks >= 2) {
            parts.push(`${weeks} SEMANAS`);
        }

        if (parts.length === 0) {
            parts.push(`DÍA ${totalDays + 1}`);
        }

        return parts.join(', ');
    },

    incrementMinigameAttempts: () => set((state) => ({
        minigameAttempts: state.minigameAttempts + 1
    })),

    addPoints: (type) => {
        const { answers } = get();
        set({
            answers: [...answers, type]
        });
    },

    determineRole: () => {
        const { answers, finishedRoles } = get();
        const pattern = answers.join('-');

        // Roles Mapping
        const pmPatterns = ['A-A-A', 'A-A-B', 'A-B-A', 'B-A-A', 'A-C-A'];
        const devPatterns = ['B-B-B', 'B-B-A', 'B-A-B', 'A-B-B', 'B-C-B'];
        const analystPatterns = ['C-C-C', 'C-C-A', 'C-A-C', 'A-C-C', 'C-B-C'];
        const specialPatterns = ['A-B-C', 'C-B-A'];

        let role = 'director'; // Project Manager id

        if (pmPatterns.includes(pattern)) {
            role = 'director';
        } else if (devPatterns.includes(pattern)) {
            role = 'developer';
        } else if (analystPatterns.includes(pattern)) {
            role = 'analyst';
        } else if (specialPatterns.includes(pattern)) {
            // Regla Especial: Segunda pregunta determina el rol
            const secondAnswer = answers[1];
            if (secondAnswer === 'A') role = 'director';
            else if (secondAnswer === 'B') role = 'developer';
            else if (secondAnswer === 'C') role = 'analyst';
        } else {
            // Fallback: Majority or 2nd question
            const counts = answers.reduce((acc, val) => {
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {});

            if (counts.A > 1) role = 'director';
            else if (counts.B > 1) role = 'developer';
            else if (counts.C > 1) role = 'analyst';
            else {
                const second = answers[1];
                if (second === 'B') role = 'developer';
                else if (second === 'C') role = 'analyst';
                else role = 'director';
            }
        }

        // Check if this role is a repeat and NOT blocked
        const lastFinishedRole = finishedRoles.length > 0 ? finishedRoles[finishedRoles.length - 1] : null;
        const isRepeat = role === lastFinishedRole;

        set({
            currentRole: role,
            isRepeatSession: isRepeat
        });
        return role;
    },

    finishRole: (role) => set((state) => ({
        finishedRoles: [...state.finishedRoles, role]
    })),

    blockRole: (role) => set((state) => ({
        blockedRoles: [...state.blockedRoles, role]
    })),

    goToScene: (sceneId) => set({ currentSceneId: sceneId }),

    clearAnswers: () => set({ answers: [] }),

    resetMinigameAttempts: () => set({ minigameAttempts: 0 }),

    resetGame: () => set({
        gameState: 'start',
        currentCharacter: null,
        currentSceneId: 'intro_1',
        answers: [],
        currentRole: null,
        minigameAttempts: 0,
        totalDays: 0
    }),

    setShowDebug: (val) => set({ showDebug: val }),
}));
