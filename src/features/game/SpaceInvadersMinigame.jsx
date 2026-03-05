import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';

const CANV_WIDTH = 400;
const CANV_HEIGHT = 400;
const PLAYER_SPEED = 8;
const BULLET_SPEED = 8;
const FIRE_RATE = 350;

export const SpaceInvadersMinigame = ({ difficulty = 'normal', onComplete }) => {
    const { playSFX } = useAudio();
    const [gameState, setGameState] = useState('ready');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(difficulty === 'easy' ? 8 : (difficulty === 'hard' ? 2 : 5));

    // Engine State
    const playerXRef = useRef(CANV_WIDTH / 2 - 20);
    const bulletsRef = useRef([]);
    const enemiesRef = useRef([]);
    const enemyBulletsRef = useRef([]);
    const keysPressed = useRef({});
    const lastFireTime = useRef(0);
    const lastEnemyFireTime = useRef(0);
    const requestRef = useRef();

    // Render State for UI sync
    const [renderData, setRenderData] = useState({
        playerX: CANV_WIDTH / 2 - 20,
        bullets: [],
        enemies: [],
        enemyBullets: []
    });

    const initEnemies = () => {
        const rows = difficulty === 'hard' ? 5 : 4;
        const cols = 6;
        const newEnemies = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                newEnemies.push({
                    id: `${r}-${c}`,
                    x: 60 + c * 50,
                    y: 40 + r * 35,
                    width: 30,
                    height: 20,
                    type: r % 2 === 0 ? 'top' : 'bottom'
                });
            }
        }
        enemiesRef.current = newEnemies;
    };

    const startGame = () => {
        initEnemies();
        setGameState('playing');
        lastEnemyFireTime.current = Date.now();
    };

    const shoot = () => {
        const now = Date.now();
        if (now - lastFireTime.current > FIRE_RATE) {
            // Adjusted shooting point to match new ship cockpit
            bulletsRef.current.push({ x: playerXRef.current + 20, y: CANV_HEIGHT - 50 });
            lastFireTime.current = now;
            playSFX('click');
        }
    };

    const gameLoop = useCallback(() => {
        if (gameState !== 'playing') return;

        // 1. Move Player
        if (keysPressed.current['ArrowLeft']) playerXRef.current -= PLAYER_SPEED;
        if (keysPressed.current['ArrowRight']) playerXRef.current += PLAYER_SPEED;
        playerXRef.current = Math.max(0, Math.min(CANV_WIDTH - 40, playerXRef.current));

        // 2. Update Player Bullets
        bulletsRef.current = bulletsRef.current
            .map(b => ({ ...b, y: b.y - BULLET_SPEED }))
            .filter(b => b.y > -10);

        // 3. Update Enemy Bullets
        const ebSpeed = difficulty === 'hard' ? 4.5 : 3;
        enemyBulletsRef.current = enemyBulletsRef.current
            .map(b => ({ ...b, y: b.y + ebSpeed }))
            .filter(b => b.y < CANV_HEIGHT + 20);

        // 4. Enemy Firing Logic
        const now = Date.now();
        const fireInterval = difficulty === 'hard' ? 700 : 1400;
        if (now - lastEnemyFireTime.current > fireInterval) {
            const currentEnemies = enemiesRef.current;
            if (currentEnemies.length > 0) {
                const shootersCount = difficulty === 'hard' ? 2 : 1;
                for (let i = 0; i < shootersCount; i++) {
                    const shooter = currentEnemies[Math.floor(Math.random() * currentEnemies.length)];
                    enemyBulletsRef.current.push({
                        x: shooter.x + (shooter.width / 2),
                        y: shooter.y + shooter.height
                    });
                }
                lastEnemyFireTime.current = now;
            }
        }

        // 5. Collisions: Player bullets -> Enemies
        let hitFlag = false;
        const nextBullets = [];
        bulletsRef.current.forEach(b => {
            let collisionOccurred = false;
            const remainingEnemies = enemiesRef.current.filter(e => {
                const hit = b.x >= e.x && b.x <= e.x + e.width &&
                    b.y >= e.y && b.y <= e.y + e.height;
                if (hit) {
                    collisionOccurred = true;
                    hitFlag = true;
                    setScore(s => s + 100);
                }
                return !hit;
            });
            if (collisionOccurred) {
                enemiesRef.current = remainingEnemies;
            } else {
                nextBullets.push(b);
            }
        });
        bulletsRef.current = nextBullets;
        if (hitFlag) playSFX('success');

        // 6. Collisions: Enemy bullets -> Player
        let playerHit = false;
        enemyBulletsRef.current = enemyBulletsRef.current.filter(eb => {
            // Ship hit box area (approx 40x25 at y=360)
            const hit = eb.x > playerXRef.current && eb.x < playerXRef.current + 40 &&
                eb.y > CANV_HEIGHT - 50 && eb.y < CANV_HEIGHT - 10;
            if (hit) {
                playerHit = true;
                return false;
            }
            return true;
        });

        if (playerHit) {
            playSFX('fail');
            setLives(l => {
                const nl = l - 1;
                if (nl <= 0) {
                    setGameState('ended');
                    setTimeout(onComplete, 2000);
                }
                return nl;
            });
        }

        // 7. Check win
        if (enemiesRef.current.length === 0 && gameState === 'playing') {
            setGameState('ended');
            setTimeout(onComplete, 2000);
        }

        // 8. Sync Render State
        setRenderData({
            playerX: playerXRef.current,
            bullets: [...bulletsRef.current],
            enemies: [...enemiesRef.current],
            enemyBullets: [...enemyBulletsRef.current]
        });

        requestRef.current = requestAnimationFrame(gameLoop);
    }, [gameState, difficulty, onComplete, playSFX]);

    useEffect(() => {
        if (gameState === 'playing') {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameState, gameLoop]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if (key === 'arrowleft' || key === 'a') keysPressed.current['ArrowLeft'] = true;
            if (key === 'arrowright' || key === 'd') keysPressed.current['ArrowRight'] = true;
            if (e.key === ' ' || e.key === 'Control' || key === 'w' || key === 's') {
                if (e.key === ' ' || e.key === 'Control') shoot();
            }
        };
        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase();
            if (key === 'arrowleft' || key === 'a') keysPressed.current['ArrowLeft'] = false;
            if (key === 'arrowright' || key === 'd') keysPressed.current['ArrowRight'] = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-6xl w-full">
                {/* Instructions Panel (LEFT) */}
                <div className="hidden lg:flex flex-col w-72 bg-[#050b14]/80 border-2 border-cyan-500/20 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50" />
                    <h3 className="text-cyan-400 font-pixel text-xs mb-4 tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 animate-pulse rounded-full" />
                        DESAFÍO: DEFENSA
                    </h3>

                    <div className="space-y-6 flex-1">
                        <div className="space-y-2">
                            <p className="text-white/40 font-pixel text-[8px] uppercase">Objetivo</p>
                            <p className="text-white/80 font-mono text-sm leading-relaxed">
                                Protege el servidor central de la masiva inyección de malware. Como Project Manager, debes coordinar la defensa y eliminar todas las amenazas externas.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-white/40 font-pixel text-[8px] uppercase">Instrucciones</p>
                            <ul className="text-white/80 font-mono text-sm space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-500">▶</span>
                                    <span>Mueve la nave con <b>FLECHAS</b> o <b>A/D</b>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-500">▶</span>
                                    <span>Dispara con <b>ESPACIO</b> o <b>W</b>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-500">▶</span>
                                    <span>No permitas que las inyecciones de código impacten tu sistema.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5">
                            <p className="text-cyan-500/40 font-pixel text-[7px] text-center tracking-widest">
                                UNIR SECURITY SYSTEMS v4.0
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Game Container */}
                <div className="relative flex-1 max-w-[400px] h-[600px] bg-[#050b14] border-2 border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col items-center p-4 mx-auto shadow-[0_0_100px_rgba(0,152,205,0.2)]">

                    {/* HUD */}
                    <div className="w-full flex justify-between items-center mb-4 font-pixel bg-black/60 p-3 border border-cyan-500/20 rounded">
                        <div className="flex flex-col">
                            <span className="text-cyan-500/60 text-[8px]">DATA SCORE</span>
                            <span className="text-white text-xs tabular-nums">{score.toString().padStart(5, '0')}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-red-500/60 text-[8px]">SYSTEM NODES</span>
                            <div className="flex gap-1.5 mt-1">
                                {[...Array(Math.max(0, lives))].map((_, i) => (
                                    <div key={i} className="w-2.5 h-2.5 bg-red-600 rounded-sm shadow-[0_0_8px_red]" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Game Engine Viewport */}
                    <div className="relative w-full aspect-square bg-[#02060a] border border-white/5 rounded-sm overflow-hidden">
                        {/* Background Detail */}
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'linear-gradient(#0098CD 1px, transparent 1px), linear-gradient(90deg, #0098CD 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                        {/* Enemies (Improved: Alien-like bots) */}
                        {renderData.enemies.map(e => (
                            <div key={e.id} className="absolute" style={{ transform: `translateX(${e.x}px) translateY(${e.y}px)`, width: e.width, height: e.height }}>
                                {/* Main alien body */}
                                <div className={`w-full h-full rounded-t-full shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden ${e.type === 'top' ? 'bg-indigo-600' : 'bg-rose-600'}`}>
                                    {/* Glowing 'eyes' */}
                                    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_#fff]" />
                                    <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_#fff]" />
                                    {/* Detail pattern */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/20" />
                                </div>
                                {/* Small 'legs' or tentacles */}
                                <div className="flex justify-around px-1">
                                    <div className={`w-1 h-2 rounded-full ${e.type === 'top' ? 'bg-indigo-400' : 'bg-rose-400'} animate-bounce`} />
                                    <div className={`w-1 h-3 rounded-full ${e.type === 'top' ? 'bg-indigo-300' : 'bg-rose-300'} animate-bounce delay-100`} />
                                    <div className={`w-1 h-2 rounded-full ${e.type === 'top' ? 'bg-indigo-400' : 'bg-rose-400'} animate-bounce delay-200`} />
                                </div>
                            </div>
                        ))}

                        {/* Player Bullets (Improved size: not point, not line) */}
                        {renderData.bullets.map((b, i) => (
                            <div key={i} className="absolute bg-white w-[3px] h-[6px] shadow-[0_0_10px_#fff]" style={{ transform: `translateX(${b.x}px) translateY(${b.y}px)` }} />
                        ))}

                        {/* Enemy Bullets (Small square blocks, visible) */}
                        {renderData.enemyBullets.map((eb, i) => (
                            <div key={i} className="absolute bg-amber-400 w-[4px] h-[4px] rounded-sm shadow-[0_0_8px_#fbbf24] animate-pulse"
                                style={{ transform: `translateX(${eb.x}px) translateY(${eb.y}px)` }} />
                        ))}

                        {/* Player Ship (Improved: Advanced Defender) */}
                        <div className="absolute" style={{ transform: `translateX(${renderData.playerX}px) translateY(${CANV_HEIGHT - 45}px)`, pointerEvents: 'none' }}>
                            <div className="relative w-12 h-10 flex flex-col items-center">
                                {/* Tip/Weapon Cannons */}
                                <div className="flex justify-between w-6 mb-[-2px]">
                                    <div className="w-1.5 h-3 bg-cyan-300 rounded-t-sm shadow-[0_0_10px_cyan]" />
                                    <div className="w-1.5 h-3 bg-cyan-300 rounded-t-sm shadow-[0_0_10px_cyan]" />
                                </div>
                                {/* Main Hull */}
                                <div className="w-10 h-5 bg-cyan-600 rounded-t-xl relative border-t border-cyan-400 shadow-[0_0_15px_rgba(0,184,255,0.4)]">
                                    {/* Cockpit Glow */}
                                    <div className="absolute top-1 left-2.5 right-2.5 h-2 bg-white/40 rounded-t-lg" />
                                </div>
                                {/* Massive Wings/Base */}
                                <div className="w-12 h-3 bg-cyan-800 rounded-sm relative mt-[-2px]">
                                    <div className="absolute -left-1 -top-1 w-3 h-4 bg-cyan-500 rounded-sm" />
                                    <div className="absolute -right-1 -top-1 w-3 h-4 bg-cyan-500 rounded-sm" />
                                </div>
                                {/* Triple Thrusters */}
                                <div className="flex gap-2.5 mt-0.5">
                                    <motion.div animate={{ scaleY: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.2 }} className="w-2 h-3 bg-orange-500 rounded-full blur-[2px]" />
                                    <motion.div animate={{ scaleY: [1.2, 1.8, 1.2] }} transition={{ repeat: Infinity, duration: 0.15 }} className="w-3 h-4 bg-orange-400 rounded-full blur-[2px]" />
                                    <motion.div animate={{ scaleY: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.2, delay: 0.1 }} className="w-2 h-3 bg-orange-500 rounded-full blur-[2px]" />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {gameState === 'ready' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-8 z-50">
                                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3 }} className="text-cyan-500 font-pixel text-xs mb-2">SECURITY PROTOCOL 404</motion.div>
                                    <h3 className="text-white font-pixel text-lg mb-12 tracking-widest text-center">MASSIVE DEPLOYMENT<br />DEFENSE SYSTEM</h3>
                                    <button onClick={startGame} className="pixel-button-unir !bg-cyan-600 !text-white !px-20 !py-5 hover:bg-cyan-500 transition-all font-bold shadow-[0_0_40px_rgba(0,255,255,0.2)]">
                                        BOOT SERVER
                                    </button>
                                    <div className="mt-12 font-pixel text-[7px] text-white/30 space-y-1 text-center tracking-tighter">
                                        <p>KEYBOARD ARROWS: STEERING</p>
                                        <p>SPACE / TOUCH: DEBUG THREAT</p>
                                    </div>
                                </motion.div>
                            )}

                            {gameState === 'ended' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-[60]">
                                    <h3 className={`font-pixel text-2xl tracking-[0.2em] font-bold ${enemiesRef.current.length === 0 ? 'text-green-500' : 'text-red-600'}`}>
                                        {enemiesRef.current.length === 0 ? 'SERVER UP' : 'SERVER CRASH'}
                                    </h3>
                                    <div className="mt-4 w-32 h-1 bg-white/10 overflow-hidden">
                                        <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2 }} className="w-full h-full bg-cyan-500" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Tactical Controller */}
                    <div className="mt-auto mb-4 grid grid-cols-3 gap-6 w-full px-4 h-24">
                        <button
                            onMouseDown={() => { keysPressed.current['ArrowLeft'] = true }}
                            onMouseUp={() => { keysPressed.current['ArrowLeft'] = false }}
                            onMouseLeave={() => { keysPressed.current['ArrowLeft'] = false }}
                            onTouchStart={(e) => { e.preventDefault(); keysPressed.current['ArrowLeft'] = true; }}
                            onTouchEnd={(e) => { e.preventDefault(); keysPressed.current['ArrowLeft'] = false; }}
                            className="bg-white/5 border border-white/10 rounded-xl flex items-center justify-center active:bg-cyan-500/20 active:border-cyan-500 transition-all text-white font-pixel text-3xl"
                        >
                            {'<'}
                        </button>

                        <button
                            onMouseDown={(e) => { e.preventDefault(); shoot(); }}
                            onTouchStart={(e) => { e.preventDefault(); shoot(); }}
                            className="bg-cyan-600 rounded-xl shadow-[0_0_30px_rgba(0,184,255,0.4)] flex items-center justify-center active:scale-95 active:bg-cyan-500 transition-all border-b-4 border-cyan-900"
                        >
                            <span className="text-white font-pixel text-[11px] font-bold">EXEC</span>
                        </button>

                        <button
                            onMouseDown={() => { keysPressed.current['ArrowRight'] = true }}
                            onMouseUp={() => { keysPressed.current['ArrowRight'] = false }}
                            onMouseLeave={() => { keysPressed.current['ArrowRight'] = false }}
                            onTouchStart={(e) => { e.preventDefault(); keysPressed.current['ArrowRight'] = true; }}
                            onTouchEnd={(e) => { e.preventDefault(); keysPressed.current['ArrowRight'] = false; }}
                            className="bg-white/5 border border-white/10 rounded-xl flex items-center justify-center active:bg-cyan-500/20 active:border-cyan-500 transition-all text-white font-pixel text-3xl"
                        >
                            {'>'}
                        </button>
                    </div>

                    {/* Mobile/Small Screen Instructions Panel (BOTTOM) */}
                    <div className="lg:hidden w-full max-w-[400px] mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-white/60 font-mono text-xs text-center">
                            <b>TIP:</b> Usa las flechas para moverte y el botón central para ejecutar la defensa.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
