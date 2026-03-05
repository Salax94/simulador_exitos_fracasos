export const directorScenes = {
    // RUTA 1 - PROJECT MANAGER
    "director_1": {
        "id": "director_1",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "playerSkin": "project",
        "text": "Soy Jesica, la Jefa de Operaciones. Me han dicho que vienes de la UNIR con un expediente brillante, pero aquí los títulos son solo papel si no sabes tomar decisiones bajo presión. Hoy tenemos la reunión para definir el alcance del proyecto. Los arquitectos y los diseñadores no te lo pondrán fácil. Demuestra que tienes el temple de un líder.",
        "options": [
            {
                "text": "Entrar a la sala de juntas con seguridad",
                "target": "director_q1"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "director_q1": {
        "id": "director_q1",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": "Hola. Soy Gustavo, Arquitecto Jefe. El equipo de diseño ha presentado 14 sistemas 'esenciales' para el estreno. Mis ingenieros están al límite. Como Project Manager, ¿cuál es tu postura oficial sobre lo que debemos incluir en el lanzamiento?",
        "options": [
            {
                "text": "A) Reduzcamos el alcance a lo más básico y necesario para garantizar que todo funcione perfectamente al lanzarlo.",
                "target": "director_q1_A",
                "points": "A"
            },
            {
                "text": "B) Lancemos una versión por etapas, añadiendo funciones mes a mes para controlar los riesgos.",
                "target": "director_q1_B",
                "points": "B"
            },
            {
                "text": "C) Mantengamos el plan original, la ambición del proyecto es lo más importante para destacar en el mercado.",
                "target": "director_q1_C",
                "points": "C"
            }
        ]
    },
    "director_q1_A": {
        "id": "director_q1_A",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": [
            "¡Brillante! Al menos alguien aquí prioriza que las cosas funcionen antes que los fuegos artificiales. Mis ingenieros podrán dormir hoy sabiendo que no lanzaremos un desastre. Tienes mis respetos.",
            "¡Gracias! No sabes el peso que me quitas de encima. Me pondré ahora mismo con la depuración del sistema base sabiendo que tenemos un jefe con los pies en la tierra. ¡A por ello!",
            "Esa decisión es muy sensata. Prefiero un programa pequeño pero impecable que uno inmenso lleno de fallos. Vamos por el buen camino bajo tu mando.",
            "¡Genial! Entiendo tu punto perfectamente. Me alegre ver que valoras el trabajo técnico antes que las prisas. ¡Cuentas con mi apoyo total para este plan!",
            "Tus instrucciones son claras y realistas. El equipo agradecerá tener un rumbo definido que se pueda cumplir sin problemas. ¡Buen comienzo, Lead PM!"
        ],
        "options": [
            {
                "text": "Escuchar el veredicto de Jesica sobre esta decisión.",
                "target": "director_q1_jesica"
            }
        ]
    },
    "director_q1_B": {
        "id": "director_q1_B",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": [
            "Modular... bueno, es un reto aceptable si nos organizamos bien. Al menos es una meta realista que no nos condena al desastre el primer día. Veré qué podemos hacer.",
            "¡Exacto! Ese enfoque equilibrado nos permitirá no perder el ritmo y estar preparados para los cambios. Me pongo con el plan de optimización de inmediato.",
            "Trabajar por etapas me parece muy acertado, aunque nos obligará a hacer muchas pruebas de conexión. Es un compromiso estratégico muy lógico por tu parte.",
            "¡Entendido! El equipo estará contento con este plan de entregas poco a poco. Menos riesgo y más control... ¡así se lidera un proyecto con cabeza!",
            "Tus instrucciones son muy precisas. El equipo agradecerá tener un rumbo pragmático y que pueda crecer con el tiempo. Me voy a implementar los cambios."
        ],
        "options": [
            {
                "text": "Escuchar el veredicto de Jesica sobre esta gestión.",
                "target": "director_q1_jesica"
            }
        ]
    },
    "director_q1_C": {
        "id": "director_q1_C",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": [
            "Es un riesgo enorme, PM. Mis ingenieros van a sufrir mucho con esto. Lanzar tanto a la vez es muy peligroso para la estabilidad. Espero que tu plan funcione.",
            "Duro. Esa actitud de 'todo o nada' es lo que pone a prueba a los mejores equipos. Espero que sepas gestionar el estrés que vas a generar en la oficina.",
            "Me preocupa la integridad del sistema con tanto peso encima. Esa ambición es lo que diferencia a los grandes proyectos, pero también lo que los hunde si no hay cuidado.",
            "En mis tiempos, priorizábamos la estabilidad. Parece que hoy en día la visión creativa manda sobre la realidad técnica. ¡Habrá que esforzarse el doble!",
            "Espero que tengas un plan de reserva sólido, porque querer abarcarlo todo de golpe es una jugada muy arriesgada cuando el tiempo corre en contra."
        ],
        "options": [
            {
                "text": "Escuchar el veredicto de Jesica sobre esta apuesta.",
                "target": "director_q1_jesica"
            }
        ]
    },
    "director_q1_jesica": {
        "id": "director_q1_jesica",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Interesante decisión. Gustavo ya tiene cara de preocupación. Dependiendo del resultado, serás la nueva estrella de la gestión o simplemente un nombre más fuera de la lista. Esperamos que tu criterio sea el correcto.",
        "options": [
            {
                "text": "Continuar con la planificación del roadmap de desarrollo.",
                "target": "director_transition_1"
            }
        ]
    },
    "director_transition_1": {
        "id": "director_transition_1",
        "background": "/assets/fondo_tasa_cafe.png",
        "advanceDays": 30,
        "text": "Han pasado varias semanas de reuniones intensas y gestión de conflictos entre departamentos. El calendario empieza a pesar...",
        "autoTimer": { "duration": 6000, "target": "director_q2" },
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "director_q2": {
        "id": "director_q2",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "playerSkin": "project",
        "text": "Atención, PM. El calendario se está apretando peligrosamente. Los departamentos se están solapando y hay retrasos en las revisiones diarias. ¿Cómo piensas reorganizar las entregas sin quemar al equipo?",
        "options": [
            {
                "text": "A) Reorganiza las prioridades basándote solo en lo que es realmente crítico para el juego ahora mismo.",
                "target": "director_q2_reaction",
                "points": "A"
            },
            {
                "text": "B) Ajusta las fechas internas mediante reuniones más cortas y rítmicas para mantener el flujo.",
                "target": "director_q2_reaction",
                "points": "B"
            },
            {
                "text": "C) Mantengamos las fechas públicas y reforcemos el apoyo externo, el mercado exige puntualidad absoluta.",
                "target": "director_q2_reaction",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "director_q2_reaction": {
        "id": "director_q2_reaction",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": [
            "Espero que tus cálculos sean tan precisos como crees. Un solo día de retraso nos costaría mucho dinero en publicidad. No pierdas de vista los detalles.",
            "¡Bien! Esa es la visión que busco. Si tú confías en tu plan, el resto del estudio también lo hará. Sé valiente ante los inversores.",
            "¡Interesante riesgo! No muchos apostarían tan fuerte por la ambición de las fechas. Veremos si tu coordinación aguanta el tirón del mes que viene.",
            "Entendido. Me gusta que no te asuste tomar decisiones drásticas cuando el tiempo se acaba. Informaré a los jefes de área para que te sigan.",
            "¡Venga, date prisa en enviar las nuevas tareas! El mundo está esperando a ver qué hemos hecho, ¡y el calendario no se va a cumplir solo!"
        ],
        "options": [
            {
                "text": "Atender la llamada de urgencia de Lee desde Análisis.",
                "target": "director_transition_q3"
            }
        ]
    },
    "director_transition_q3": {
        "id": "director_transition_q3",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Un mes después... el ritmo de trabajo es frenético y los desafíos aparecen en cada rincón del proyecto.",
        "autoTimer": { "duration": 5500, "target": "director_q3" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "director_q3": {
        "id": "director_q3",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "Disculpa la interrupción, PM. Mis modelos de predicción dicen que con el ritmo actual hay muchas dudas sobre llegar a la fecha con una versión estable. ¿Qué informe oficial y qué propuesta de acción le pasamos a los directivos?",
        "options": [
            {
                "text": "A) Proponemos anunciar un pequeño retraso para garantizar que la calidad final sea excelente.",
                "target": "director_q3_A",
                "points": "A"
            },
            {
                "text": "B) Ajustamos el plan interno y quitamos funciones secundarias para salvar la fecha prometida.",
                "target": "director_q3_B",
                "points": "B"
            },
            {
                "text": "C) Mantengamos la fecha oficial cueste lo que cueste; ya solucionaremos los problemas con actualizaciones tras el lanzamiento.",
                "target": "director_q3_C",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "director_q3_A": {
        "id": "director_q3_A",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": [
            "La honestidad es clave para el éxito a largo plazo. Los datos dicen que los jugadores prefieren esperar un poco por algo bueno que recibir algo roto pronto.",
            "Es una decisión valiente. Los inversores se pondrán tensos, pero es mejor que una crisis de reputación por un lanzamiento fallido. ¡Bien hecho!",
            "¡Entendido! Me pongo a redactar el informe destacando que buscamos la excelencia. Tienes mi apoyo total en esta decisión de calidad.",
            "Entendido. La transparencia nos ahorrará muchos problemas en el futuro. Avisaré al equipo para que enfoquen sus fuerzas en terminarlo bien.",
            "Me parece lo más sensato. Al final, un gran juego se recuerda por su calidad, no por si tardó una semana más en salir de la oficina."
        ],
        "options": [
            {
                "text": "Enfrentar la reacción de Jesica ante este retraso.",
                "target": "director_q3_jesica"
            }
        ]
    },
    "director_q3_B": {
        "id": "director_q3_B",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": [
            "Un ajuste estratégico... es arriesgado pero puede funcionar si elegimos bien qué quitar. El equilibrio es muy delicado, espero que acertemos con las tijeras.",
            "¡Exacto! Salvar la fecha es prioritario para el mercado. Me pongo a analizar qué módulos podemos dejar para más adelante sin estropear la experiencia.",
            "Me parece un compromiso razonable. Al menos no perdemos el impulso del lanzamiento. Informaré a los equipos para que prioricen lo esencial.",
            "Entendido. Menos es más si ese 'menos' funciona de maravilla. Vamos a recortar con cuidado para no quitarle el alma al proyecto.",
            "Tus instrucciones son claras. Veré cómo afectan estos recortes a las proyecciones de futuro. ¡Ánimo con la gestión del cambio!"
        ],
        "options": [
            {
                "text": "Enfrentar la reacción de Jesica ante este ajuste.",
                "target": "director_q3_jesica"
            }
        ]
    },
    "director_q3_C": {
        "id": "director_q3_C",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": [
            "Es una apuesta de alto riesgo. Si el juego sale con fallos, los datos de retención podrían hundirse. Pero entiendo que el éxito comercial manda hoy.",
            "¡Entendido! Priorizamos el impacto del día 1. Prepararé al equipo de soporte para que estén listos para una lluvia de informes de errores tras abrir.",
            "Es una decisión muy agresiva. Si sale bien, seremos héroes del éxito rápido. Si sale mal... bueno, esperemos que los parches lleguen a tiempo.",
            "Entendido. El mercado manda y las fechas son sagradas. Informaré de tu decisión para que nadie se relaje ni un minuto hasta el lanzamiento.",
            "Interesante. Confías mucho en la capacidad de reacción post-lanzamiento. Espero que los jugadores sean pacientes con los fallos iniciales."
        ],
        "options": [
            {
                "text": "Enfrentar la reacción de Jesica ante esta apuesta.",
                "target": "director_q3_jesica"
            }
        ]
    },
    "director_q3_jesica": {
        "id": "director_q3_jesica",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Retrasar es una pesadilla de imagen, pero lanzar roto es un suicidio. Has elegido tu camino para este trimestre. Espero que sepas lidiar con las consecuencias.",
        "options": [
            {
                "text": "Continuar gestionando la presión interna.",
                "target": "director_transition_q4"
            }
        ]
    },
    "director_transition_q4": {
        "id": "director_transition_q4",
        "background": "/assets/fondo_habitacion.png",
        "text": "Las semanas finales son intensas. El cansancio se nota en cada rincón de la oficina...",
        "autoTimer": { "duration": 5500, "target": "director_q4" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "director_q4": {
        "id": "director_q4",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": "¡PM! El equipo está agotado. He visto a ingenieros durmiendo bajo las mesas y algunos están pensando en marcharse por la presión. Si los mejores se van ahora, no habrá juego que vender. ¿Qué hacemos con la carga de trabajo?",
        "options": [
            {
                "text": "A) Reduzcamos las tareas menos importantes para que el equipo pueda descansar un poco y recuperar energía técnica.",
                "target": "director_q4_A",
                "points": "A"
            },
            {
                "text": "B) Cambiemos el tipo de tareas para que no se sientan estancados y mantengan la mente fresca.",
                "target": "director_q4_B",
                "points": "B"
            },
            {
                "text": "C) Mantengamos el ritmo con nuevos incentivos y premios por el esfuerzo final; el éxito nos espera.",
                "target": "director_q4_C",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "director_q4_A": {
        "id": "director_q4_A",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": [
            "¡Qué alivio, Jefe! El equipo respirará tranquilo. La moral es clave para que al final todo salga bien. Menos mal que nos cuidas.",
            "¡Genial! Ese respiro nos vendrá de maravilla para no cometer errores por cansancio. Me pongo a reorganizar las tareas menos urgentes ya mismo.",
            "¡Interesante! Priorizar la salud del equipo ayudará a que el sprint final sea mucho más efectivo. ¡Gracias por entendernos, Boss!",
            "Entendido. Les diré a todos que pueden bajar un poco el ritmo en las tareas secundarias. ¡Verás cómo mejora el ambiente de inmediato!",
            "Súper. Me parece una decisión muy humana y profesional. Así el proyecto llegará al final con un equipo que todavía tiene ganas de sonreír."
        ],
        "options": [
            {
                "text": "Escuchar el comentario de Jesica.",
                "target": "director_q4_jesica"
            }
        ]
    },
    "director_q4_B": {
        "id": "director_q4_B",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": [
            "Vale... rotar tareas... bueno, es una idea para intentar no aburrirse, aunque espero que no perdamos tiempo aprendiendo cosas nuevas ahora.",
            "¡Exacto! El cambio de aires puede ayudar a recuperar el entusiasmo. Veré cómo podemos repartir las funciones de forma distinta hoy mismo.",
            "Me parece un experimento interesante. A ver si cambiando de pantalla el equipo se siente menos agobiado. ¡A por ello, PM!",
            "Entendido. Les explicaré el nuevo plan de rotación. Espero que la variedad les devuelva la chispa que necesitan para el lanzamiento.",
            "Interesante. Confías en que la variedad mental venza al agotamiento físico. Informaré de los cambios estratégicos de inmediato."
        ],
        "options": [
            {
                "text": "Escuchar el comentario de Jesica.",
                "target": "director_q4_jesica"
            }
        ]
    },
    "director_q4_C": {
        "id": "director_q4_C",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": [
            "¡Uf! Eres de la vieja escuela... espero que los premios y los bonos basten para que nadie se rinda antes de cruzar la meta.",
            "¡Vaya energía tienes! El equipo tendrá que dar el 200%, pero con esos incentivos seguro que muchos se motivan. ¡Vamos a por el éxito!",
            "Es una apuesta dura pero clara. Si el éxito compensa el esfuerzo, seremos imparables. Me pongo a preparar los anuncios de compensación.",
            "Entendido. Máxima presión con máxima recompensa. Les diré que hay premios especiales para los que aguanten este último empujón.",
            "Entendido. Confías en que el premio final sea suficiente motor. Espero que los ánimos no decaigan en la última semana decisiva."
        ],
        "options": [
            {
                "text": "Escuchar el comentario de Jesica.",
                "target": "director_q4_jesica"
            }
        ]
    },
    "director_q4_jesica": {
        "id": "director_q4_jesica",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Gestionar la moral es parte de tu sueldo. Pero ahora, antes de avanzar, debemos asegurar que la estructura de planificación sea coherente. Mi reporte de gestión detecta asincronías críticas en la secuencia de entregables. Como PM, debes validar el flujo operativo para asegurar que nada se solape en el roadmap final.",
        "options": [
            {
                "text": "Validar secuencia de entregables",
                "target": "director_minigame_pattern"
            }
        ]
    },
    "director_minigame_pattern": {
        "id": "director_minigame_pattern",
        "background": "/assets/fondo_entrevista.png",
        "minigame": "memorypath",
        "nextScene": "director_launch_eval",
        "failScene": "director_fail_pattern",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    },
    "director_fail_pattern": {
        "id": "director_fail_pattern",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Inadmisible. Has perdido el hilo de la planificación estratégica. Si no puedes recordar el orden de tus propias prioridades, ¿cómo esperas que el resto del equipo te siga? La desorganización ha fragmentado el proyecto.",
        "options": [
            {
                "text": "Intentar reorganizar el flujo operativo",
                "target": "director_minigame_pattern"
            },
            {
                "text": "Dimitir por falta de visión (Reiniciar)",
                "target": "intro_1"
            }
        ]
    },
    "director_transition_q5": {
        "id": "director_transition_q5",
        "background": "/assets/fondo_compania.png",
        "text": "EL PROYECTO SE CONSOLIDA. Frank, el principal inversor, llega para evaluar el rendimiento a largo plazo.",
        "autoTimer": { "duration": 4000, "target": "director_q5" },
        "advanceDays": 50,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    // Q5 - Frank (Key 1/2)
    "director_q5": {
        "id": "director_q5",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "Escúchame bien, cachorro. He visto nacer y morir estudios más brillantes que este simplemente porque sus líderes no supieron gestionar el éxito. Mis socios están nerviosos y quieren saber si este proyecto es un castillo de naipes o una fortaleza real. Exijo que me des una hoja de ruta para los próximos tres años ahora mismo.",
        "options": [
            {
                "text": "A) Señor Frank, frenemos cualquier anuncio hasta que el juego base sea totalmente estable.",
                "target": "director_q5_reaction",
                "points": "A"
            },
            {
                "text": "B) Lancemos un mensaje breve y emocionante que mantenga el interés sin compromisos técnicos.",
                "target": "director_q5_reaction",
                "points": "B"
            },
            {
                "text": "C) Señor Frank, aquí tiene el plan completo; nuestra ambición es total y el mercado lo recompensará.",
                "target": "director_q5_reaction",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "director_q5_reaction": {
        "id": "director_q5_reaction",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": [
            "Firmeza. Es una cualidad rara hoy en día. Si tu visión es tan sólida como dices, el tiempo nos dará la razón. Veremos si tus palabras se mantienen.",
            "Astuto... nos das esperanza sin pillarte los dedos. Es una jugada profesional. Espero que ese 'interés' se traduzca en dividendos reales.",
            "¡Ambición! Es lo que mueve este mundo. Espero que tengas el temple necesario para respaldar esas palabras con hechos.",
            "Tus palabras suenan a alguien que sabe lo que hace, o al menos lo finge muy bien. Veré qué puedo decirle a mis socios.",
            "Interesante criterio. Tomaré nota de tu decisión. No permitas que el primer éxito se te suba a la cabeza."
        ],
        "options": [
            {
                "text": "Enfrentar la alerta de mercado de la junta.",
                "target": "director_transition_q6"
            }
        ]
    },
    "director_transition_q6": {
        "id": "director_transition_q6",
        "background": "/assets/fondo_compania.png",
        "text": "Varias semanas después... las decisiones tomadas ante Frank han calado en la junta, pero el mercado tecnológico no espera a nadie.",
        "autoTimer": { "duration": 5000, "target": "director_q6" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    // Q6 - Frank (Key 2/2)
    "director_q6": {
        "id": "director_q6",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "Las noticias externas son alarmantes. Un competidor directo ha lanzado una tecnología que hace que nuestro mapa parezca un juego de hace diez años. La junta está histérica y me presionan para que te obligue a un rediseño total. ¿Qué vas a hacer, PM?",
        "options": [
            {
                "text": "A) Frank, mantengamos nuestro enfoque. Nuestra experiencia es lo que nos hace únicos.",
                "target": "director_q6_reaction",
                "points": "A"
            },
            {
                "text": "B) Evaluemos la situación con calma antes de realizar integraciones tecnológicas arriesgadas.",
                "target": "director_q6_reaction",
                "points": "B"
            },
            {
                "text": "C) ¡La clave sera la modernización inmediata, Frank! No podemos permitir que nadie nos supere.",
                "target": "director_q6_reaction",
                "points": "C"
            }
        ]
    },
    // Reactions for Q6 use the existing logic but target transition to Laura
    "director_q6_reaction": {
        "id": "director_q6_reaction",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": [
            "Firmeza. Si tu visión es tan sólida, el tiempo nos dará la razón. Demuéstrales de qué pasta estás hech[O/A].",
            "Equilibrio... ni cobardes ni temerarios. Me gusta tu estilo, PM. Espero que esa evaluación sea profunda.",
            "Audacia pura. Si consigues ese rediseño sin que el ecosistema implosione, serás leyenda.",
            "Has tomado una decisión difícil. Les diré a los otros inversores que confíen en tu criterio un poco más.",
            "Tus directrices son claras. El destino de los beneficios está ahora totalmente en tus manos."
        ],
        "options": [
            {
                "text": "Atender los desafíos técnicos con Laura.",
                "target": "director_transition_year"
            }
        ]
    },
    "director_fail_simon_1": {
        "id": "director_fail_simon_1",
        "background": "/assets/fondo_escena_5.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "El equipo está totalmente descoordinado por tu falta de ritmo. Si no puedes marcar el camino, no puedes liderar este estudio. Estamos perdiendo tiempo y dinero por tu culpa.",
        "options": [
            {
                "text": "Reintentar la sincronización técnica",
                "target": "director_minigame_simon_success"
            },
            {
                "text": "Dimitir y buscar otro sector (Reiniciar juego)",
                "target": "intro_1"
            }
        ]
    },
    "director_fail_simon_2": {
        "id": "director_fail_simon_2",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Increíble. En el momento más crítico del año, tu gestión de prioridades ha colapsado. No podemos permitirnos este nivel de improvisación en un proyecto de esta magnitud.",
        "options": [
            {
                "text": "Reintentar el despliegue anual",
                "target": "director_minigame_2"
            },
            {
                "text": "Dimitir y buscar otro sector (Reiniciar juego)",
                "target": "intro_1"
            }
        ]
    },
    "director_launch_eval": {
        "id": "director_launch_eval",
        "background": "/assets/fondo_compania.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "text": "El lanzamiento ha concluido. No ha sido el desastre que algunos temían, pero los números son... normales. Jesica, ¿qué opinas de nuestra nueva gestión?",
        "options": [
            {
                "text": "Escuchar la valoración de Jesica.",
                "target": "director_launch_jesica_comment"
            }
        ]
    },
    "director_launch_jesica_comment": {
        "id": "director_launch_jesica_comment",
        "background": "/assets/fondo_compania.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Ha logrado superar este primer trimestre de gestión crítica, señor, lo cual no es poco. Pero sobrevivir al lanzamiento es solo el principio, ahora viene el verdadero reto... la sostenibilidad a largo plazo. Veamos si su estrategia sobrevive a la fase de consolidación.",
        "options": [
            {
                "text": "Avanzar a la fase de consolidación del proyecto.",
                "target": "director_transition_q5"
            }
        ]
    },
    "director_transition_year": {
        "id": "director_transition_year",
        "background": "/assets/fondo_habitacion.png",
        "advanceDays": 365,
        "text": "UN AÑO DESPUÉS. El juego es un éxito global, pero los desafíos técnicos de escala son constantes.",
        "autoTimer": { "duration": 5000, "target": "director_q7" },
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    // Q7 - Laura (Aux 1/2)
    "director_q7": {
        "id": "director_q7",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "¡PM! Los servidores están dando errores de latencia masiva. Si entran todos los usuarios a la vez en el aniversario, el sistema colapsará. ¿Cómo ordenas que hagamos la gran apertura del parche?",
        "options": [
            {
                "text": "A) Ordena un acceso poco a poco mediante turnos de espera.",
                "target": "director_q7_reaction",
                "points": "A"
            },
            {
                "text": "B) Lanzamos el parche por regiones según la hora para repartir el tráfico.",
                "target": "director_q7_reaction",
                "points": "B"
            },
            {
                "text": "C) Hay que aprovechar el entusiasmo mundial, hagamos la apertura total inmediata.",
                "target": "director_q7_reaction",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "director_q7_reaction": {
        "id": "director_q7_reaction",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": [
            "Prudente. Los turnos nos darán tiempo para reaccionar. Configuro el sistema de espera ahora mismo.",
            "¡Exacto! Es la forma más profesional de gestionar la carga mundial. Programo los horarios por región.",
            "¡Cielo santo! Servidores al límite... Espero que nuestra arquitectura de red aguante este impacto.",
            "Entendido. Controlar el flujo nos salvará de un desastre técnico hoy. ¡A por ello!",
            "Estrategia de seguridad activada. Vamos a monitorizar los procesos al milisegundo."
        ],
        "options": [
            {
                "text": "Resolver el dilema de contenido del último trimestre.",
                "target": "director_transition_q8"
            }
        ]
    },
    "director_transition_q8": {
        "id": "director_transition_q8",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Meses más tarde... el juego se acerca a su primer aniversario y la presión por un cierre de año espectacular es máxima.",
        "autoTimer": { "duration": 5000, "target": "director_q8" },
        "advanceDays": 60,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    // Q8 - Laura (Aux 2/2)
    "director_q8": {
        "id": "director_q8",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "¡PM! Tenemos un último dilema técnico este año. Los veteranos quieren estabilidad total, pero los nuevos piden contenido fresco. ¿Dónde ponemos el foco final?",
        "options": [
            {
                "text": "A) Prioricemos arreglar los fallos que arrastramos para que el núcleo sea sólido.",
                "target": "director_q8_reaction",
                "points": "A"
            },
            {
                "text": "B) Desarrollemos un plan equilibrado, un poco de contenido y muchas mejoras de calidad.",
                "target": "director_q8_reaction",
                "points": "B"
            },
            {
                "text": "C) Lancemos una nueva expansión y cerremos el año con un aumento notable de jugadores nuevos.",
                "target": "director_q8_reaction",
                "points": "C"
            }
        ]
    },
    "director_q8_reaction": {
        "id": "director_q8_reaction",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": [
            "¡Sí! Los jugadores van a agradecer tener un juego estable. Me pongo con las correcciones.",
            "Un equilibrio difícil pero sensato. Mantendremos el interés sin olvidar la calidad.",
            "¡Guau! Ambición máxima. Esto reavivará el interés del mercado por completo.",
            "Entendido. Prioridad absoluta a tu visión estratégica. Avisaré a todos los equipos.",
            "Es una apuesta por el crecimiento. ¡Vamos a rematar este plan anual bajo tu mando!"
        ],
        "options": [
            {
                "text": "Finalizar la gestión integral del proyecto anual.",
                "target": "director_final_dialog"
            }
        ]
    },
    "director_final_dialog": {
        "id": "director_final_dialog",
        "background": "/assets/fondo_compania.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "text": "He revisado el balance final de este año. Ha sido un periodo de altibajos bajo tu dirección estratégica. Jesica, ¿cuál es tu diagnóstico definitivo?",
        "options": [
            {
                "text": "Escuchar el veredicto sobre el rendimiento profesional.",
                "target": "director_final_verdict"
            }
        ]
    },
    "director_final_verdict": {
        "id": "director_final_verdict",
        "background": "/assets/fondo_compania.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Los datos no mienten. Sus decisiones han moldeado el futuro del estudio. Pero antes del veredicto final, un Project Manager debe demostrar que puede sincronizar las prioridades bajo la presión máxima de los inversores. Es el momento de la verdad.",
        "options": [
            {
                "text": "Iniciar la sincronización final de prioridades",
                "target": "FINALIZE_DIRECTOR"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    // Removido por redundancia y corrección de bug de transición
    "final_director_success": {
        "id": "final_director_success",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Debo admitirlo... me equivoqué contigo. Tu gestión y tu temple han convertido este proyecto en el nuevo estandarte del estudio. Los resultados son históricos. Pero para cerrar este informe con broche de oro, sincroniza estos últimos hitos estratégicos.",
        "options": [
            {
                "text": "Validar los 5 hitos del éxito",
                "target": "director_minigame_simon_success"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "director_minigame_simon_success": {
        "id": "director_minigame_simon_success",
        "background": "/assets/fondo_entrevista.png",
        "minigame": "simonsays",
        "minigameProps": { "totalRounds": 5, "initialCount": 3, "initialLives": 5, "showTimer": false },
        "nextScene": "director_success_jesica",
        "failScene": "director_fail_simon_success",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
    },
    "director_fail_simon_success": {
        "id": "director_fail_simon_success",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Incluso en la victoria, un error de sincronización puede ser fatal. No te relajes antes de cruzar la meta.",
        "options": [
            {
                "text": "Reintentar la validación de hitos",
                "target": "director_minigame_simon_success"
            }
        ]
    },
    "director_success_jesica": {
        "id": "director_success_jesica",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Debo admitirlo... me equivoqué contigo. Tu gestión y tu temple han convertido este proyecto en un estandarte absoluto para el estudio. Has demostrado una visión estratégica impecable.",
        "options": [
            {
                "text": "Agradecer el reconocimiento de Jesica",
                "target": "director_success_ceo"
            }
        ]
    },
    "director_success_ceo": {
        "id": "director_success_ceo",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "text": "¡Impresionante! El mercado está reaccionando con un entusiasmo que no veíamos en años. Has puesto el nombre de este estudio en lo más alto de la industria.",
        "options": [
            {
                "text": "Recibir a Frank y su valoración",
                "target": "director_frank_easter_egg"
            }
        ]
    },
    "director_frank_easter_egg": {
        "id": "director_frank_easter_egg",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "¡JAJAJAJA! ¡Cachorro, me has devuelto la juventud! ¡Mira esos números, son poesía financiera! ¡Hacía décadas que no sentía este subidón de adrenalina empresarial! Estoy tan feliz... ¡que siento que mi traje ejecutivo ya no puede contener mi éxito!",
        "options": [
            {
                "text": "Señor Frank... ¿está usted bien?",
                "target": "director_frank_transformation"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    "director_frank_transformation": {
        "id": "director_frank_transformation",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank3.png",
        "speaker": "Narrador",
        "text": "De prank, Frank lanza su bastón por los aires y emite un grito de guerra corporativa digno de un guerrero espartano. ¡Desgarra su traje ejecutivo por la mitad mientras su cuerpo delgado de anciano se transforma ante tus ojos! Sus músculos estallan con una potencia sobrehumana, revelando que bajo esa apariencia frágil se escondía el verdadero 'Toro de Wall Street'. ¡El éxito es el mejor esteroide biológico!",
        "options": [
            {
                "text": "Recibir el informe final de gestión",
                "target": "director_victory_report"
            }
        ]
    },
    "director_victory_report": {
        "id": "director_victory_report",
        "background": "/assets/fondo_escenario_6.png",
        "isFinalReport": true,
        "result": "success",
        "options": [
            {
                "text": "¡Celebrar el éxito y reiniciar la aventura profesional!",
                "target": "intro_1"
            }
        ]
    },
    "final_director_fail": {
        "id": "final_director_fail",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Es tal como temía. Tu obsesión por abarcar demasiado y el descuido del equipo han destruido el valor del juego. El estudio está al borde del cierre por tu culpa. Si de verdad quieres intentar salvar algo de este descalabro, sincroniza esta última cadena de errores... aunque dudo que puedas.",
        "options": [
            {
                "text": "Intentar contener el colapso",
                "target": "director_minigame_simon_fail"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "director_minigame_simon_fail": {
        "id": "director_minigame_simon_fail",
        "background": "/assets/fondo_entrevista.png",
        "minigame": "simonsays",
        "minigameProps": { "totalRounds": 1, "initialCount": 10 },
        "nextScene": "director_fail_jesica",
        "failScene": "director_fail_simon_fail",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
    },
    "director_fail_simon_fail": {
        "id": "director_fail_simon_fail",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Incluso ante el abismo, has vuelto a fallar. La incompetencia es total.",
        "options": [
            {
                "text": "Aceptar el veredicto de Jesica",
                "target": "director_fail_jesica"
            }
        ]
    },
    "director_fail_jesica": {
        "id": "director_fail_jesica",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Es tal como temía. Tu falta de visión y el descuido de los recursos han destruido el valor del juego. El estudio está en una situación crítica por tu culpa.",
        "options": [
            {
                "text": "Escuchar al CEO",
                "target": "director_fail_ceo"
            }
        ]
    },
    "director_fail_ceo": {
        "id": "director_fail_ceo",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "text": "Es una verdadera decepción. Teníamos grandes esperanzas puestas en este proyecto, pero la ejecución ha sido desastrosa. Tendremos que rendir cuentas ante la junta.",
        "options": [
            {
                "text": "Enfrentar la reacción de Frank",
                "target": "director_fail_frank"
            }
        ]
    },
    "director_fail_frank": {
        "id": "director_fail_frank",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "Me has hecho perder una fortuna, cachorro. Las proyecciones eran humo y tu gestión ha sido un descalabro financiero. No quiero volver a ver tu nombre en mis informes.",
        "options": [
            {
                "text": "Ver informe final de desempeño",
                "target": "final_report_fail"
            }
        ]
    },
    "final_report_fail": {
        "id": "final_report_fail",
        "background": "/assets/fondo_escenario_6.png",
        "isFinalReport": true,
        "result": "fail",
        "options": [
            {
                "text": "¡Aprender de los errores y volver a intentar la ruta!",
                "target": "START_BRANCH"
            },
            {
                "text": "¡Reiniciar juego completo desde la evaluación!",
                "target": "intro_1"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
};
