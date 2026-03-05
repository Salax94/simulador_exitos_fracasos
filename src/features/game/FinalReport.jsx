import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Trophy, XCircle, Clock, BarChart3, Target, Home, RotateCcw } from 'lucide-react';

const REPORT_CONTENT = {
    director: {
        success: {
            title: "PROJECT MANAGER: CASO DE ÉXITO",
            subtitle: "Felicidades, lideraste un proyecto exitoso.",
            logo: "/assets/wow.png",
            content: "Tus decisiones priorizaron la planificación estratégica sobre la improvisación. Definiste el alcance claramente, gestionando los riesgos antes de que escalaran y alineaste al equipo bajo objetivos realistas y medibles.\n\nEntendiste que dirigir no es acelerar sin control, sino mantener el ritmo correcto en el momento adecuado, el decir no cuando era necesario y posponer expansiones hasta consolidar resultados.\n\nComo ocurrió con <b style='color: #4ade80'>World of Warcraft</b>, comprendiste que un proyecto sólido crece sobre sistemas estables y equipos coordinados, no sobre promesas apresuradas. La expansión fue consecuencia de la organización, no del entusiasmo desenfrenado. Construiste con gran liderazgo un proyecto sostenible.",
            color: "#0098CD"
        },
        fail: {
            title: "PROJECT MANAGER: CASO DE FRACASO",
            subtitle: "Qué mal, dirigiste el proyecto al colapso.",
            logo: "/assets/ashes.png",
            content: "Tus decisiones sesgadas por la presión externa y la necesidad de resultados inmediatos te llevaron a expandir el alcance sin fortalecer los procesos internos y prometiste más de lo que el equipo podía ejecutar.\n\nLa falta de prioridades llevo a que cada nueva idea fuese una carga más, el cronograma dejó de ser una guía y se volvió una ilusión.\n\nComo sucedió con <b style='color: #f87171'>Ashes of Creation</b>, una visión demasiado ambiciosa superó la capacidad real de ejecución, debilitando la confianza y desmoronando la credibilidad del proyecto.",
            color: "#FF4D4D"
        }
    },
    analyst: {
        success: {
            title: "ANALISTA DE DATOS: CASO DE ÉXITO",
            subtitle: "Felicidades, transformaste datos en ventaja competitiva.",
            logo: "/assets/wow.png",
            content: "Tus decisiones se basaron en la evidencia, no en intuiciones aisladas. Validaste hipótesis, mediste el impacto y corregiste desviaciones antes de que se convirtieran en pérdidas para el proyecto.\n\nComprendiste que los datos no solo describen el pasado, sino que orientan la toma de decisiones futuras cuando se interpretan con criterio.\n\nAl igual que <b style='color: #4ade80'>World of Warcraft</b>, supiste analizar el comportamiento de los usuarios para ajustar sistemas progresivamente, manteniendo el equilibrio entre accesibilidad y profundidad. Optimizaste antes de escalar, convirtiendo la información en dirección estratégica.",
            color: "#0098CD"
        },
        fail: {
            title: "ANALISTA DE DATOS: CASO DE FRACASO",
            subtitle: "Qué mal, acumulaste datos sin convertirlos en decisiones.",
            logo: "/assets/ashes.png",
            content: "Tus métricas se volvieron decorativas y tus reportes no influyeron en nada de la estrategia. Interpretaste correlaciones como causalidades y omitiste la validación de supuestos críticos.\n\nEl exceso de indicadores sin enfoque generó ruido en lugar de claridad.\n\nComo ocurrió con <b style='color: #f87171'>Ashes of Creation</b>, la promesa de sistemas complejos no fue respaldada por análisis sólidos ni pruebas consistentes. La información existía, el crecimiento se proyectó en gráficos, pero no fue comprendido.",
            color: "#FF4D4D"
        }
    },
    developer: {
        success: {
            title: "DESARROLLADOR: CASO DE ÉXITO",
            subtitle: "Felicidades, construiste una experiencia memorable.",
            logo: "/assets/wow.png",
            content: "Tus decisiones priorizaron la jugabilidad antes que la complejidad innecesaria. Optimizaste sistemas, corregiste errores críticos y aseguraste la estabilidad del proyecto antes de añadir nuevas mecánicas.\n\nEntendiste que un videojuego no se sostiene por la cantidad de características presentes, sino por las coherencias entre ellas, aunque sean pocas.\n\nComo <b style='color: #4ade80'>World of Warcraft</b>, apostaste por una base técnica firme que permitió evolucionar sin romper lo construido. La innovación fue progresiva y acertada en cada desarrollo.",
            color: "#0098CD"
        },
        fail: {
            title: "DESARROLLADOR: CASO DE FRACASO",
            subtitle: "Qué mal, tu proyecto se volvió inviable.",
            logo: "/assets/ashes.png",
            content: "Tus decisiones apostaron por implementar múltiples sistemas avanzados sin finalizar los fundamentales. El código creció más rápido que su estabilidad afectando directamente la experiencia del jugador.\n\nComo en <b style='color: #f87171'>Ashes of Creation</b>, la promesa de profundidad superó la ejecución práctica, en la que el proyecto dependía de lo que sería, no de lo que ya era. La expansión fue un ideal con una base frágil.",
            color: "#FF4D4D"
        }
    }
};

export const FinalReport = ({ scene, onAction }) => {
    const { currentRole, totalDays, minigameAttempts, answers, formatGameTime, roleNames } = useGameStore();
    const isSuccess = scene.result === 'success';
    const report = REPORT_CONTENT[currentRole || 'developer'][isSuccess ? 'success' : 'fail'];

    const performanceScore = Math.round((answers.filter(a => a === 'A').length / (answers.length || 1)) * 100);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#050b14]/95 backdrop-blur-xl overflow-y-auto"
        >
            <div className="w-full max-w-4xl bg-black/40 border-2 border-white/10 rounded-[2.5rem] p-8 shadow-[0_0_100px_rgba(0,152,205,0.15)] relative my-8">
                {/* Header Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#0098CD] to-transparent" />

                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Left side: Logo & Stats */}
                    <div className="w-full md:w-1/3 flex flex-col gap-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="aspect-square w-full rounded-3xl bg-white/5 border border-white/10 p-6 flex items-center justify-center relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0098CD]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img src={report.logo} alt="Game Logo" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                        </motion.div>

                        <div className="space-y-4">
                            <p className="text-[#0098CD]/60 font-pixel text-[10px] uppercase tracking-[0.3em] mb-4">Métricas del Proyecto</p>

                            <StatBox icon={<Clock className="w-4 h-4" />} label="Tiempo Total" value={formatGameTime()} />
                            <StatBox icon={<BarChart3 className="w-4 h-4" />} label="Decisiones Tomadas" value={answers.length} />
                            <StatBox icon={<RotateCcw className="w-4 h-4" />} label="Reintentos Técnicos" value={minigameAttempts} />
                            <StatBox icon={<Target className="w-4 h-4" />} label="Eficiencia Liderazgo" value={`${performanceScore}%`} />
                        </div>
                    </div>

                    {/* Right side: Final Assessment */}
                    <div className="flex-1 space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-pixel text-white tracking-tighter" style={{ color: report.color }}>
                                {report.title}
                            </h1>
                            <h2 className="text-xl font-pixel text-white/90 italic">{report.subtitle}</h2>
                        </div>

                        <div className="w-full h-px bg-white/10" />

                        <div className="prose prose-invert max-w-none">
                            <p
                                className="font-mono text-sm leading-relaxed text-white/70 text-pretty whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: report.content }}
                            />
                        </div>

                        <div className="pt-8 space-y-8">
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                <p className="text-[#0098CD]/60 font-pixel text-[8px] uppercase tracking-widest mb-2">Informe Académico / Profesional</p>
                                <p className="font-mono text-xs leading-relaxed text-white/80">
                                    Desarrollado por <b>Anllyli Galeano Trillos</b> para el Foro de Introducción a la Ingeniería Informática. <br />
                                    "Éxitos y fracasos". <b>Universidad Internacional de La Rioja (UNIR)</b>.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    const { resetGame } = useGameStore.getState();
                                    resetGame();
                                }}
                                className="px-10 py-5 bg-[#0098CD]/20 hover:bg-[#0098CD]/30 border-2 border-[#0098CD]/50 hover:border-[#0098CD] rounded-[1.5rem] text-white font-pixel text-sm transition-all flex items-center gap-4 group w-fit shadow-[0_0_30px_rgba(0,152,205,0.2)]"
                            >
                                <span className="uppercase tracking-widest text-[#0098CD] group-hover:text-white transition-colors">Ir al inicio</span>
                                <Home size={20} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Attribution */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-pixel text-white/20 uppercase tracking-[0.5em]">
                        Ingeniería Informática · UNIR · Informe de Desempeño V1.0
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const StatBox = ({ icon, label, value }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
        <div className="text-[#0098CD]">{icon}</div>
        <div className="flex flex-col">
            <span className="text-[8px] font-pixel text-white/40 uppercase tracking-wider">{label}</span>
            <span className="text-xs font-pixel text-white">{value}</span>
        </div>
    </div>
);
