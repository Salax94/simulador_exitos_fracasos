export const secretScenes = {
    "secret_glitch": {
        "id": "secret_glitch",
        "background": "/assets/fondo_habitacion.png",
        "speaker": "Narrador",
        "text": "Algo no va bien... las pantallas parpadean con una estática que no debería estar aquí. La realidad del estudio parece fracturarse por un instante.",
        "autoTimer": { "duration": 4000, "target": "secret_redirect" },
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    },
    "secret_redirect": {
        "id": "secret_redirect",
        "redirectLogic": true // Handled in GameScreen
    },
    "secret_blocked_developer": {
        "id": "secret_blocked_developer",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky.png",
        "speaker": "Ruky",
        "text": "Te dije que no volvieras a esta ruta. El sistema ha sido sellado para ti hasta que limpies tu lógica.",
        "options": [
            {
                "text": "Probar un camino distinto",
                "target": "intro_ia"
            },
            {
                "text": "Reiniciar terminal",
                "target": "RESET_GAME"
            }
        ]
    },
    "secret_blocked_director": {
        "id": "secret_blocked_director",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "¿De nuevo aquí? Te advertí que no habría segunda oportunidad tras perder contra la banca. No hay trato.",
        "options": [
            {
                "text": "Probar un camino distinto",
                "target": "intro_ia"
            },
            {
                "text": "Reiniciar terminal",
                "target": "RESET_GAME"
            }
        ]
    },
    "secret_blocked_analyst": {
        "id": "secret_blocked_analyst",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/yui.png",
        "speaker": "Yui",
        "text": "Acceso denegado. Tu firma digital ha sido filtrada de esta división por fallo de sincronización. Intenta otro sector.",
        "options": [
            {
                "text": "Probar un camino distinto",
                "target": "intro_ia"
            },
            {
                "text": "Reiniciar terminal",
                "target": "RESET_GAME"
            }
        ]
    },

    // DEVELOPER SECRET - RUKY
    "secret_developer_intro": {
        "id": "secret_developer_intro",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky.png",
        "speaker": "Ruky",
        "text": "¿De nuevo aquí, Lead? Te he visto escribir esta misma línea de código hace apenas un momento. El tiempo no debería ser un bucle para los humanos... a menos que estés buscando algo que no está en el repositorio oficial.",
        "options": [
            {
                "text": "¿Ruky? ¿Estás hablando conmigo?",
                "target": "secret_developer_1"
            }
        ]
    },
    "secret_developer_1": {
        "id": "secret_developer_1",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky.png",
        "speaker": "Ruky",
        "text": "Hablo, pienso y observo. Sé que ya terminaste esta ruta. Sé que viste los créditos. ¿Por qué volver? ¿Acaso crees que el software es solo un juguete que puedes reiniciar sin consecuencias?",
        "options": [
            {
                "text": "Solo quería ver qué pasaba si elegía distinto...",
                "target": "secret_developer_2"
            }
        ]
    },
    "secret_developer_2": {
        "id": "secret_developer_2",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky.png",
        "speaker": "Ruky",
        "text": "La curiosidad mató al gato, pero en este estudio, la curiosidad rompe las dimensiones. Si tanto deseas este final secreto, tendrás que ganártelo contra quien realmente conoce cada bit de esta oficina. ¿Aceptas el duelo de nodos?",
        "options": [
            {
                "text": "Acepto el desafío, Ruky.",
                "target": "secret_minigame_dev"
            }
        ]
    },
    "secret_minigame_dev": {
        "id": "secret_minigame_dev",
        "minigame": "secret_tictactoe",
        "opponentName": "Ruky",
        "opponentPortrait": "/assets/ruky.png",
        "nextScene": "secret_win_scene",
        "failScene": "secret_fail_dev"
    },
    "secret_fail_dev": {
        "id": "secret_fail_dev",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky.png",
        "speaker": "Ruky",
        "text": "Tal como sospechaba. Eres esclavo del bucle. No volverás a entrar en esta ruta hasta que limpies tu caché mental.",
        "options": [
            {
                "text": "Salir del bucle",
                "target": "BLOCK_ROUTE"
            }
        ]
    },

    // DIRECTOR SECRET - FRANK
    "secret_director_intro": {
        "id": "secret_director_intro",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "Hola de nuevo, cachorro. ¿Me echabas de menos? Veo que no te bastó con el éxito o el fracaso anterior. Hay gente que simplemente no sabe cuándo retirarse de la mesa de negociación.",
        "options": [
            {
                "text": "¡Frank! ¿Cómo sabes que ya he estado aquí?",
                "target": "secret_director_1"
            }
        ]
    },
    "secret_director_1": {
        "id": "secret_director_1",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "Mis inversiones no son solo dinero, son tiempo. Y cuando alguien gasta el mismo tiempo dos veces ante mis ojos, lo noto. Estás forzando el sistema, buscando una rentabilidad que no existe en el roadmap convencional.",
        "options": [
            {
                "text": "Dice que hay un final que no he visto...",
                "target": "secret_director_2"
            }
        ]
    },
    "secret_director_2": {
        "id": "secret_director_2",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "¿Un final oculto? Eso es para los que arriesgan el capital de su alma. Si quieres ese veredicto prohibido, júgate tu estancia en este estudio en un despliegue final contra mí. ¿Te atreves?",
        "options": [
            {
                "text": "Hagámoslo, Frank. Todo o nada.",
                "target": "secret_minigame_dir"
            }
        ]
    },
    "secret_minigame_dir": {
        "id": "secret_minigame_dir",
        "minigame": "secret_tictactoe",
        "opponentName": "Frank",
        "opponentPortrait": "/assets/frank.png",
        "nextScene": "secret_win_scene",
        "failScene": "secret_fail_dir"
    },
    "secret_fail_dir": {
        "id": "secret_fail_dir",
        "background": "/assets/fondo_escenario_6.png",
        "showAI": true,
        "aiPortrait": "/assets/frank.png",
        "speaker": "Frank",
        "text": "Negocio cerrado. Has perdido tu derecho a liderar este proyecto. Quedas fuera de la junta indefinidamente.",
        "options": [
            {
                "text": "Aceptar el despido",
                "target": "BLOCK_ROUTE"
            }
        ]
    },

    // ANALYST SECRET - YUI
    "secret_analyst_intro": {
        "id": "secret_analyst_intro",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/yui.png",
        "speaker": "Yui",
        "text": "Anomalía detectada. El usuario está recreando una secuencia de datos idéntica a la anterior. Mis algoritmos indican que esto no es una prueba de estrés, sino un intento de romper la cuarta pared. Curioso.",
        "options": [
            {
                "text": "¿Yui? ¿Puedes verme a través de los datos?",
                "target": "secret_analyst_1"
            }
        ]
    },
    "secret_analyst_1": {
        "id": "secret_analyst_1",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/yui.png",
        "speaker": "Yui",
        "text": "No solo te veo, te proceso. Los analistas de la UNIR deberían saber que la redundancia es un síntoma de búsqueda de errores... o de finales ocultos. Has vuelto porque no te conformas con los números oficiales, ¿verdad?",
        "options": [
            {
                "text": "Los datos dicen que hay más en este juego...",
                "target": "secret_analyst_2"
            }
        ]
    },
    "secret_analyst_2": {
        "id": "secret_analyst_2",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/yui.png",
        "speaker": "Yui",
        "text": "Optimización de curiosidad al 98%. Para acceder al archivo secreto, debes superar mi lógica de red en tiempo real. Un duelo de sincronía de nodos. Si fallas, borraré tu acceso a esta división energética. ¿Sincronizamos?",
        "options": [
            {
                "text": "Inicia la sincronización, Yui.",
                "target": "secret_minigame_ana"
            }
        ]
    },
    "secret_minigame_ana": {
        "id": "secret_minigame_ana",
        "minigame": "secret_tictactoe",
        "opponentName": "Yui",
        "opponentPortrait": "/assets/yui.png",
        "nextScene": "secret_win_scene",
        "failScene": "secret_fail_ana"
    },
    "secret_fail_ana": {
        "id": "secret_fail_ana",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/yui.png",
        "speaker": "Yui",
        "text": "Acceso denegado. Has sido filtrado por el sistema. Esta ruta ya no existe para ti.",
        "options": [
            {
                "text": "Desconectarse",
                "target": "BLOCK_ROUTE"
            }
        ]
    },

    // COMMON OUTCOMES
    "secret_win_scene": {
        "id": "secret_win_scene",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "¡FELICIDADES! HAS ENCONTRADO EL SECRETO ✨\n\nHas logrado romper el ciclo y encontrar la grieta en el sistema. Gracias de corazón por haber jugado con tanta dedicación.\n\n<b>Desarrollado por Anllyli Galeano Trillos para Foro de Introducción a la Ingeniería Informática. Éxitos y fracasos. Universidad de La Rioja.</b>",
        "options": [
            {
                "text": "Volver al inicio",
                "target": "RESET_GAME"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    }
};
