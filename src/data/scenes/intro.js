export const introScenes = {
    // INTRO
    "intro_1": {
        "id": "intro_1",
        "background": "/assets/fondo_habitacion.png",
        "speaker": "Narrador",
        "playerSkin": "estudiante",
        "text": "Acabas de graduarte en la Universidad Internacional de La Rioja (UNIR). Han sido años de esfuerzo, noches de estudio y proyectos complejos. Ahora, en el silencio de tu habitación, te enfrentas al abismo del mundo profesional. Con tu flamante título bajo el brazo, enciendes tu equipo y abres el asistente de orientación profesional. Es el momento de que tus sueños se conviertan en código real.",
        "options": [
            {
                "text": "Comenzar mi búsqueda de empleo",
                "target": "intro_ia"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    "intro_ia": {
        "id": "intro_ia",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "speaker": "IA",
        "playerSkin": "estudiante",
        "text": "¡Hola, colega! Soy tu Asistente Digital de Orientación Profesional de la UNIR. He analizado tu rendimiento académico y tus proyectos de fin de grado; tienes un potencial increíble. Mi función es ayudarte a navegar por las turbulentas aguas de la industria del software para encontrar tu lugar ideal. ¿Estás listo para realizar tu mapa de aptitudes profesionales?",
        "options": [
            {
                "text": "¡Sí! Por favor, realicemos el test de perfil técnico.",
                "target": "profile_1"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    // PROFILE QUESTIONS (Archetype Mapping)
    "profile_1": {
        "id": "profile_1",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "speaker": "IA",
        "playerSkin": "estudiante",
        "text": "Comencemos con el Test de Perfil Técnico. Primera pregunta clave:\n\nCuando trabajas en un proyecto de grupo en el campus virtual, ¿qué es lo que más te motiva a nivel personal?",
        "options": [
            {
                "text": "A) Desarrollar y optimizar las funciones de bajo nivel que hacen que todo funcione.",
                "target": "profile_2",
                "points": "B"
            },
            {
                "text": "B) Coordinar el flujo de trabajo y asegurar que cada pieza encaje en el roadmap.",
                "target": "profile_2",
                "points": "A"
            },
            {
                "text": "C) Analizar las métricas de rendimiento y detectar patrones de comportamiento del usuario.",
                "target": "profile_2",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    "profile_2": {
        "id": "profile_2",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "speaker": "IA",
        "playerSkin": "estudiante",
        "text": "Segunda pregunta estratégica:\n\nSi un proyecto crítico experimenta un fallo inesperado a pocas horas de la entrega, tu instinto natural es:",
        "options": [
            {
                "text": "A) Sumergirte en los logs y en los datos históricos para identificar el origen exacto.",
                "target": "profile_3",
                "points": "C"
            },
            {
                "text": "B) Abrir el depurador y rastrear el error paso a paso hasta corregir el código.",
                "target": "profile_3",
                "points": "B"
            },
            {
                "text": "C) Reunir al equipo, evaluar el impacto y priorizar una solución de contingencia viable.",
                "target": "profile_3",
                "points": "A"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    "profile_3": {
        "id": "profile_3",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "speaker": "IA",
        "playerSkin": "estudiante",
        "text": "Tercera y última pregunta definitva:\n\n¿Qué tipo de éxito profesional te daría más satisfacción personal?",
        "options": [
            {
                "text": "A) Ver que un proyecto extremadamente complejo se entrega puntual y con calidad magistral.",
                "target": "DETERMINE_ROLE",
                "points": "A"
            },
            {
                "text": "B) Descubrir un patrón de datos que cambie por completo la estrategia de negocio.",
                "target": "DETERMINE_ROLE",
                "points": "C"
            },
            {
                "text": "C) Construir una funcionalidad que sea reconocida por su eficiencia y elegancia técnica.",
                "target": "DETERMINE_ROLE",
                "points": "B"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },

    "profile_result": {
        "id": "profile_result",
        "background": "/assets/fondo_habitacion.png",
        "advanceDays": 1,
        "playerSkin": "estudiante",
        "text": "Has pasado la noche analizando tus resultados. Según tu perfil técnico y tus respuestas, la IA ha identificado un patrón claro en tu trayectoria profesional...",
        "options": [
            {
                "text": "Ver el diagnóstico detallado de la IA",
                "target": "role_result"
            }
        ]
    },
    "role_result": {
        "id": "role_result",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "hidePlayer": true,
        "centerAI": true,
        "speaker": "IA",
        "playerSkin": "entrevista",
        "text": "¡Análisis de aptitudes completado con éxito! Según tus respuestas, tu perfil encaja perfectamente como: [ROLE]. Posees la combinación ideal de destreza y visión estratégica que este rol demanda en la industria del videojuego moderna.",
        "options": [
            {
                "text": "Entiendo. ¡Vamos a buscar mi primera oportunidad!",
                "target": "send_resume"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },

    "send_resume": {
        "id": "send_resume",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "hidePlayer": true,
        "centerAI": true,
        "speaker": "IA",
        "advanceDays": 1,
        "text": "Excelente. He optimizado tu currículum basándome en tus fortalezas de la UNIR y lo he enviado a los estudios más prestigiosos que buscan un perfil de [ROLE]. ¿Deseas proceder con el envío masivo o prefieres recalibrar tus respuestas?",
        "options": [
            {
                "text": "¡Enviar currículum ahora mismo!",
                "target": "time_skip"
            },
            {
                "text": "Prefiero repetir la evaluación.",
                "target": "profile_1"
            }
        ]
    },

    "time_skip": {
        "id": "time_skip",
        "advanceDays": 7,
        "background": "/assets/fondo_habitacion.png",
        "hidePlayer": true,
        "text": "... Pasa una semana de nervios y espera, revisando el correo cada cinco minutos ...",
        "autoTimer": { "duration": 5500, "target": "interview_offer" },
        "options": []
    },

    "interview_offer": {
        "id": "interview_offer",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "speaker": "IA",
        "playerSkin": "entrevista",
        "text": "¡Excelentes noticias, colega! Un estudio de videojuegos puntero en la industria ha quedado fascinado con tu perfil de [ROLE] de la UNIR. Han solicitado una entrevista personal y técnica de carácter inmediato. ¿Estás preparado para dar el salto definitivo al sector profesional?",
        "options": [
            {
                "text": "¡Sí! Prepárame el transporte, voy directo a la entrevista.",
                "target": "pre_interview"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },

    "pre_interview": {
        "id": "pre_interview",
        "background": "/assets/fondo_compania.png",
        "speaker": "Narrador",
        "playerSkin": "entrevista",
        "text": "Te detienes frente al imponente edificio del estudio. Los cristales reflejan un ambiente de creatividad y alta tecnología. Al otro lado de esas puertas, el software cobra vida y las ideas se convierten en mundos. Es aquí donde pondrás a prueba todo lo aprendido en la UNIR ante los ojos de los expertos más exigentes del sector.",
        "options": [
            {
                "text": "Entrar con decisión a las instalaciones",
                "target": "interview_welcome"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    "interview_welcome": {
        "id": "interview_welcome",
        "background": "/assets/fondo_entrevista.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "Entrevistador",
        "playerSkin": "entrevista",
        "text": "Buenos días. Es un auténtico placer recibirte personalmente en nuestro estudio. Aquí no buscamos meros graduados, sino visionarios apasionados por crear experiencias únicas que marquen a una generación. Hemos seguido tu trayectoria académica y estábamos ansiosos por conocerte. Por favor, toma asiento.",
        "options": [
            {
                "text": "Muchas gracias. Es un honor estar aquí.",
                "target": "interview_start"
            }
        ]
    },

    "interview_start": {
        "id": "interview_start",
        "background": "/assets/fondo_entrevista.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "Entrevistador",
        "playerSkin": "entrevista",
        "text": "He revisado con detalle tu currículum de la UNIR y tu perfil como [ROLE] es realmente impresionante. Sin embargo, en esta empresa valoramos el coraje técnico sobre el papel. Deberás superar un desafío de lógica pura en tiempo real para validar tu puesto y demostrar si estás a la altura de nuestro equipo. ¿Podemos comenzar la prueba?",
        "options": [
            {
                "text": "¡Comenzar la prueba técnica ahora mismo!",
                "target": "START_MINIGAME"
            }
        ]
    },

    "minigame_pm": {
        "id": "minigame_pm",
        "background": "/assets/fondo_entrevista.png",
        "minigame": "memory",
        "nextScene": "interview_success",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
    },

    "minigame_analyst": {
        "id": "minigame_analyst",
        "background": "/assets/fondo_entrevista.png",
        "minigame": "director",
        "nextScene": "interview_success",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },

    "minigame_developer": {
        "id": "minigame_developer",
        "background": "/assets/fondo_entrevista.png",
        "minigame": "tetris",
        "nextScene": "interview_success",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },

    "interview_success": {
        "id": "interview_success",
        "background": "/assets/fondo_entrevista.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "Entrevistador",
        "playerSkin": "entrevista",
        "advanceDays": 0,
        "text": "¡Absolutamente brillante! Has demostrado una agudeza lógica y una capacidad de resolución de problemas impecable. No hay duda de que el puesto de [ROLE] te pertenece por derecho propio. Estamos impacientes por ver tu contribución a nuestro próximo gran título mundial. Te esperamos el próximo lunes a primera hora.",
        "options": [
            {
                "text": "¡Muchas gracias! Allí estaré con toda mi energía.",
                "target": "back_home_success"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },

    "interview_fail": {
        "id": "interview_fail",
        "background": "/assets/fondo_entrevista.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "Entrevistador",
        "text": "Vaya... parece que has tenido dificultades imprevistas con el desafío técnico. Los nervios han podido jugar una mala pasada. ¿Deseas realizar una nueva iteración de la prueba o prefieres finalizar la entrevista en este punto?",
        "options": [
            {
                "text": "¡Deseo realizar la prueba de nuevo!",
                "target": "START_MINIGAME"
            },
            {
                "text": "Prefiero finalizar la entrevista por hoy.",
                "target": "game_over_interview"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
    },

    "game_over_interview": {
        "id": "game_over_interview",
        "background": "/assets/fondo_entrevista.png",
        "hidePlayer": true,
        "isGameOver": true,
        "autoTimer": { "duration": 7000, "target": "ai_reorientation" },
        "options": [],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
    },

    "ai_reorientation": {
        "id": "ai_reorientation",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "speaker": "IA",
        "playerSkin": "estudiante",
        "text": "No te desanimes, amigo. En la industria del software, el fracaso es solo el paso previo al éxito. Quizás ese rol no era el adecuado para tu configuración actual. ¡Vamos a reorientar tu perfil y buscar tu verdadero lugar en el mundo técnico!",
        "options": [
            {
                "text": "¡Sí! Iniciemos una nueva evaluación de perfil.",
                "target": "profile_1"
            }
        ]
    },

    "back_home_success": {
        "id": "back_home_success",
        "background": "/assets/fondo_habitacion.png",
        "showAI": true,
        "speaker": "IA",
        "playerSkin": "entrevista",
        "advanceDays": 1,
        "text": "¡Buenísimo trabajo! He recibido la confirmación oficial del estudio. Ya eres formalmente parte del equipo de élite como [ROLE]. Tu pasión y la formación integral de la UNIR han dado sus frutos. Aprovecha este fin de semana para descansar; el lunes comienza la aventura que transformará tu vida profesional para siempre.",
        "options": [
            {
                "text": "Prepararme para el primer día de trabajo",
                "target": "monday_skip"
            }
        ]
    },

    "monday_skip": {
        "id": "monday_skip",
        "advanceDays": 10,
        "background": "/assets/fondo_compania.png",
        "hidePlayer": true,
        "text": "... El lunes amanece con un brillo diferente. Tu carrera profesional comienza aquí ...",
        "autoTimer": { "duration": 5500, "target": "first_day_arrival" },
        "options": []
    },

    "first_day_arrival": {
        "id": "first_day_arrival",
        "background": "/assets/fondo_compania.png",
        "speaker": "Narrador",
        "text": "Aquí estás de nuevo, ante la sede del estudio. Pero hoy ya no eres un aspirante con dudas. Eres el nuevo [ROLE] del equipo. El destino de los próximos grandes títulos de la industria está, en parte, en tus manos. Inspira hondo... ¡es hora de empezar!",
        "options": [
            {
                "text": "Entrar a comenzar mi primer día oficial",
                "target": "START_BRANCH"
            }
        ]
    }
};
