export const developerScenes = {
    // RUTA 1 - DESARROLLADOR DE VIDEOJUEGOS
    "developer_1": {
        "id": "developer_1",
        "background": "/assets/fondo_escena_1.png",
        "speaker": "Narrador",
        "playerSkin": "desarrollador",
        "text": "Tu primer día como Lead Developer en este prestigioso estudio de videojuegos. Las oficinas son un caos creativo! con luces de neón, pósters de clásicos retro y un murmullo constante de programadores discutiendo sobre optimización. Te sientas en tu silla ergonómica de cuero y el aroma del café recién hecho te da la bienvenida a lo que será el desafío más grande de tu carrera.",
        "options": [
            {
                "text": "Acomodarme en mi nuevo escritorio y saludar al equipo",
                "target": "developer_junior_intro"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "developer_junior_intro": {
        "id": "developer_junior_intro",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": [
            "¡Hola! Te estaba esperando con el café en la mano. Me presentaron como Laura, tu desarrolladora junior asignada. No sabes la ilusión que me hace que alguien con tu formación en la UNIR nos guíe. El equipo tiene muchas expectativas puestas en ti, ¡vamos a crear algo asombroso!",
            "¡Ey, Lead! Bienvenid[O/A] a la trinchera. Soy Laura. He estado revisando tus proyectos anteriores y tu estilo de arquitectura es... wow. El equipo está un poco tenso por el lanzamiento, pero tenerte aquí nos da un respiro de tranquilidad. ¿Empezamos con el despliegue?",
            "¡Al fin llegas! Soy Laura. Te he dejado unos apuntes sobre el estado actual del prototipo. Qué ganas de ver cómo aplicas toda esa teoría técnica de la UNIR a este caos creativo. El equipo confía plenamente en tu visión estratégica.",
            "¡Por fin te pongo cara! Me han hablado maravillas de tu capacidad técnica. Soy Laura, y estoy aquí para absorber todo el conocimiento que puedas compartir. Espero que estés list[O/A] para lidiar con el código heredado de este estudio.",
            "¡Qué alegría verte por aquí! Me presento, soy Laura. Me han asignado como tu apoyo directo. Estábamos un poco perdidos con el sistema de físicas, pero sé que tú pondrás orden en los repositorios. ¡Bienvenid[O/A] al equipo de desarrollo!"
        ],
        "options": [
            {
                "text": "Es un placer conocerte, Laura. Vamos a ver ese prototipo.",
                "target": "developer_combat_clave"
            }
        ]
    },
    "developer_combat_clave": {
        "id": "developer_combat_clave",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "Lead, el equipo de diseño está presionando con una idea de última hora, quieren añadir físicas dinámicas en tiempo real a todas las colisiones de combate. Dicen que el realismo venderá más, pero mis pruebas muestran que podría ralentizar los ordenadores menos potentes. Como jefe técnico, ¿cuál es tu veredicto?",
        "options": [
            {
                "text": "A) Prioricemos la fluidez total del juego por encima del realismo visual.",
                "target": "developer_1_reaction",
                "points": "A"
            },
            {
                "text": "B) Creemos un modo experimental opcional para que los jugadores decidan.",
                "target": "developer_1_reaction",
                "points": "B"
            },
            {
                "text": "C) El éxito comercial dependerá en gran medida del impacto visual, implementemos el sistema de forma completa.",
                "target": "developer_1_reaction",
                "points": "C"
            }
        ]
    },
    "developer_1_reaction": {
        "id": "developer_1_reaction",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": [
            "¡Entendido perfectamente! Es una decisión muy sensata. Al final del día, si el juego no corre fluido por debajo de los 60 FPS, los jugadores se quejarán más que por unas físicas simples. Me pongo con ello ahora mismo.",
            "¡Me encanta ese enfoque de flexibilidad! Es una forma brillante de no excluir a nadie. Configuro las opciones gráficas para que el motor detecte el hardware del usuario. ¡Va a quedar de lujo!",
            "¡Vaya, qué decisión tan valiente! Tienes razón, el impacto visual en los tráilers será brutal. Tendré que optimizar el código al máximo para que no exploten los servidores, ¡pero acepto el reto!",
            "Entendido. Me gusta que tengas las prioridades tan claras. Informaré al departamento de arte para que ajusten sus assets a esta nueva directiva. ¡Buen comienzo, Lead!",
            "Tus instrucciones son como una guía de estilo, claras y precisas. El equipo agradecerá tener un rumbo definido. Me voy directa a implementar los cambios en el repositorio principal."
        ],
        "options": [
            {
                "text": "Buen trabajo, Laura. Avísame cuando el cambio esté en la build.",
                "target": "developer_day_change"
            }
        ]
    },
    "developer_day_change": {
        "id": "developer_day_change",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Han pasado varios días desde tu llegada. Te vas acostumbrando al ritmo de los sprints y a las interminables tazas de café mientras depuras la arquitectura del proyecto...",
        "autoTimer": { "duration": 8000, "target": "developer_2" },
        "advanceDays": 5,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "developer_2": {
        "id": "developer_2",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": "Soy Gustavo, el Arquitecto Senior y guardián de la integridad del sistema. Escucha con atención, '[JEFE/A]cito'. Hemos detectado una inconsistencia recursiva en la asignación de memoria dinámica del servidor. Es un error sutil que solo un ojo entrenado en ASM y C++ profundo notaría. No pienso malgastar mis ciclos de computación mental en depurar algo tan... básico. ¿Cómo piensas gestionar esta fuga de recursos antes de que todo el entorno de producción colapse?",
        "options": [
            {
                "text": "A) Detén la integración de nuevas funcionalidades hasta que la raíz de la fuga esté sellada.",
                "target": "developer_2_reaction",
                "points": "A"
            },
            {
                "text": "B) Monitoriza los logs en paralelo para identificar el patrón exacto sin frenar el desarrollo.",
                "target": "developer_2_reaction",
                "points": "B"
            },
            {
                "text": "C) Ignora el aviso por ahora; la capacidad de nuestros servidores actuales absorberá el impacto hasta el parche final.",
                "target": "developer_2_reaction",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "developer_2_reaction": {
        "id": "developer_2_reaction",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": [
            "Mmm... una respuesta conservadora. Típica de alguien que teme romper el balanceo de carga de su propia carrera. Pero bueno, al menos demuestra que valoras la estabilidad inicial.",
            "Esa decisión es... aceptable, supongo. Es un juego de riesgos calculado. Espero que tus analistas sean tan rápidos con los logs como tú lo eres delegando la solución técnica.",
            "Patético. Esa actitud de 'patear el problema hacia adelante' es precisamente lo que destruye los grandes lanzamientos. Espero que disfrutes viendo cómo los hilos de ejecución se devoran entre sí mientras tú duermes.",
            "¿Eso es todo lo que tienes para ofrecer ante un fallo de segmentación potencial? Interesante... Parece que tu lógica flaquea bajo la presión real del estudio. Veré si mis ingenieros de sistemas pueden mitigar tu... falta de rigor.",
            "Habrá que ver si el servidor principal sobrevive a esa 'estrategia' de gestión. Yo que tú, empezaría a preparar un buen informe de justificación para la junta directiva."
        ],
        "options": [
            {
                "text": "Vuelve a tu terminal, Gustavo. Yo me encargo de las decisiones.",
                "target": "developer_transition_2"
            }
        ]
    },
    "developer_transition_2": {
        "id": "developer_transition_2",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "La presión aumenta. Cada línea de código escrita es un paso más hacia el lanzamiento mundial, pero también una oportunidad para que surjan nuevos desafíos técnicos...",
        "autoTimer": { "duration": 8000, "target": "developer_3" },
        "advanceDays": 10,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "developer_3": {
        "id": "developer_3",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky.png",
        "speaker": "Narrador",
        "text": "Ruky, el gato del estudio, salta con elegancia sobre tu teclado, interrumpiendo tu flujo de trabajo. Al pisar el 'Enter' con sus patas almohadilladas, abre un correo urgente del equipo de diseño: 'Lead, el departamento creativo quiere implementar un sistema de clima dinámico que altere la economía y la recolección de recursos en tiempo real. Dicen que es vital para la inmersión.' Ruky te mira con ojos felinos, esperando que apruebes el cambio con un clic salvador antes de tirar tu café.",
        "options": [
            {
                "text": "A) Modulariza el sistema para que podamos añadirlo tras el lanzamiento sin riesgos.",
                "target": "developer_3_reaction",
                "points": "A"
            },
            {
                "text": "B) implementa una versión puramente visual que no afecte a las variables económicas del juego.",
                "target": "developer_3_reaction",
                "points": "B"
            },
            {
                "text": "C) Integra el sistema completo inmediatamente; las mecánicas innovadoras son lo que nos diferenciará del mercado.",
                "target": "developer_3_reaction",
                "points": "C"
            }
        ]
    },
    "developer_3_reaction": {
        "id": "developer_3_reaction",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky.png",
        "speaker": "Ruky",
        "text": [
            "¡Miauu! (Ruky parece satisfecho con tu cautela técnica y se acomoda sobre tus planos de arquitectura para echarse una siesta estratégica).",
            "¡Miau! (El gato te da un toquecito con la pata en la nariz, como si aprobara que priorices un juego estable antes que uno innecesariamente complejo).",
            "¡Miaaa...uu! (Empieza a ronronear con fuerza mientras se frota contra tu pantalla. Parece que le emociona el riesgo técnico de tu ambiciosa decisión).",
            "¡Purrr! (El ronroneo rítmico de Ruky te calma. Parece que sabe que has tomado una decisión que salvará muchas noches de crunch).",
            "¡Miau! (Te mira fijamente con sus ojos brillantes, salta al suelo con elegancia y se marcha sabiendo que el proyecto está en buenas manos)."
        ],
        "options": [
            {
                "text": "Acariciar la cabeza de Ruky y volver al trabajo.",
                "target": "developer_transition_3"
            }
        ]
    },
    "developer_transition_3": {
        "id": "developer_transition_3",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "El proyecto evoluciona. Lo que antes eran bloques de código aislados ahora empiezan a formar un mundo coherente y vivo...",
        "autoTimer": { "duration": 7000, "target": "developer_4" },
        "advanceDays": 15,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "developer_4": {
        "id": "developer_4",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/lua.png",
        "speaker": "Lua",
        "text": "¡H-hola, Lead! S-soy Lua, del equipo de testing. Perdona que te moleste, pero he encontrado algo... un exploit crítico. Los jugadores pueden clonar objetos manipulando los paquetes de red. Quería explicárselo a Laura para que ella lo arreglara, pero... me pongo un poco de los nervios hablando con ella. ¿Q-qué crees que deberíamos decirle o hacer?",
        "options": [
            {
                "text": "A) Lua, mantén la calma. Identificaremos la falla en la raíz del servidor y reescribiremos la validación.",
                "target": "developer_4_reaction",
                "points": "A"
            },
            {
                "text": "B) Aplica una restricción temporal que limite las transacciones por segundo mientras investigamos.",
                "target": "developer_4_reaction",
                "points": "B"
            },
            {
                "text": "C) Descuida, Lua. Aplicaremos un parche rápido en el cliente; no queremos frenar el ritmo ahora.",
                "target": "developer_4_reaction",
                "points": "C"
            }
        ]
    },
    "developer_4_reaction": {
        "id": "developer_4_reaction",
        "background": "/assets/fondo_escena_1.png",
        "showAI": true,
        "aiPortrait": "/assets/lua.png",
        "speaker": "Lua",
        "text": [
            "¡O-oh! Una solución estructural profunda... ¡Qué profesional! Me encanta cómo abordas los problemas de raíz. Iré a preparar los logs detallados para el equipo de backend.",
            "¡Vale! Un escudo temporal. Me parece muy inteligente para no parar el desarrollo. ¡E-eres eficiente con la gestión, Lead!",
            "¡Ah, entiendo! Un parche rápido para seguir adelante. Confío en tu criterio ciegamente. ¡Sigo con el testeo de otros módulos entonces!",
            "¡G-gracias por escucharme! Me daba mucho miedo que este bug rompiera la economía. ¡Qué suerte tener a alguien tan capaz al mando!",
            "¡Entiendo! Me pongo manos a la obra con el nuevo protocolo. ¡Laura va a tener una sorpresa increíble cuando vea que el bug ya está bajo control!"
        ],
        "options": [
            {
                "text": "Gracias por el aviso, Lua. Sigue así con el trabajo.",
                "target": "developer_transition_4"
            }
        ]
    },
    "developer_transition_4": {
        "id": "developer_transition_4",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Se acerca una fecha de entrega crítica. Los ánimos en el estudio están caldeados y el cansancio empieza a pasar factura al equipo...",
        "autoTimer": { "duration": 7000, "target": "developer_minigame_intro" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    "developer_minigame_intro": {
        "id": "developer_minigame_intro",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "¡Lead! ¡Perdón por entrar así, pero es urgente! Una corrupción de datos masiva se está extendiendo por la base de datos de los perfiles de usuario. ¡Si no detenemos el proceso de escritura ahora mismo, la build del lanzamiento se perderá por completo y los datos de los testers se borrarán! ¡Toda nuestra reputación técnica depende de tus reflejos ahora mismo!",
        "options": [
            {
                "text": "¡Inicia la depuración de emergencia y sálvanos del desastre!",
                "target": "developer_minigame"
            }
        ]
    },
    "developer_minigame": {
        "id": "developer_minigame",
        "background": "/assets/fondo_entrevista.png",
        "minigame": "snake",
        "nextScene": "developer_minigame_success",
        "failScene": "snake_fail_scene",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
    },
    "snake_fail_scene": {
        "id": "snake_fail_scene",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "No... no puede ser... el servidor central ha colapsado. La corrupción ha llegado al corazón del sistema corporativo. Confiaba ciegamente en tu destreza técnica... pero parece que el problema nos ha superado. No sé cómo le explicaremos esto a los inversores. Qué decepción tan absoluta...",
        "options": [
            {
                "text": "Reiniciar la depuración de emergencia",
                "target": "developer_minigame"
            },
            {
                "text": "Dimite y empieza de cero en otra empresa (Reiniciar juego)",
                "target": "intro_1"
            }
        ]
    },
    "developer_minigame_success": {
        "id": "developer_minigame_success",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "¡BRUTAL! No sé cómo lo has hecho, pero has detenido la corrupción a milisegundos de que fuera irreversible. El equipo de sistemas está aplaudiendo en el pasillo. Has demostrado una sangre fría y una capacidad técnica de otro planeta. ¡Eres oficialmente la leyenda de este estudio!",
        "options": [
            {
                "text": "Gracias por el aviso, Laura. Asegúrate de que los logs estén limpios.",
                "target": "developer_transition_5"
            }
        ]
    },
    "developer_transition_5": {
        "id": "developer_transition_5",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Tras salvar el proyecto en el último segundo, el respeto por tu liderazgo técnico se ha disparado. Sin embargo, el desafío final se asoma en el horizonte...",
        "autoTimer": { "duration": 8000, "target": "developer_5" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "developer_5": {
        "id": "developer_5",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "El Publisher acaba de enviar las nuevas previsiones para el primer día de lanzamiento, ¡50.000 usuarios concurrentes! Supera con creces nuestras pruebas de estrés de 1.000. Que dilema, ¿Reestructuramos todo el backend ahora para que soporte esa carga masiva o confiamos en que nuestra optimización actual aguante el tirón?",
        "options": [
            {
                "text": "A) Reestructurar el backend ahora para garantizar una escalabilidad masiva desde el inicio.",
                "target": "developer_5_reaction",
                "points": "A"
            },
            {
                "text": "B) Realizar optimizaciones específicas y escalonadas en los módulos más críticos.",
                "target": "developer_5_reaction",
                "points": "B"
            },
            {
                "text": "C) Confiar en la infraestructura actual; el estudio tiene recursos de sobra para el ajuste post-lanzamiento.",
                "target": "developer_5_reaction",
                "points": "C"
            }
        ]
    },
    "developer_5_reaction": {
        "id": "developer_5_reaction",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": [
            "¡Es una decisión brillante y llena de visión a largo plazo! Me pongo a coordinar con el equipo de infraestructura ahora mismo. ¡Va a ser el lanzamiento más estable de la historia!",
            "¡Exacto! Ese enfoque equilibrado nos permitirá no perder el ritmo y estar preparados para lo peor. Me pongo con el reporte de optimización técnica de inmediato.",
            "¡Me encanta esa seguridad que transmites! Si tú confías en lo que hemos construido, el resto del equipo también lo hará. ¡Vamos a por todas en el lanzamiento!",
            "¡Buenísimo! Entiendo tu punto perfectamente. Me encanta ver cómo priorizas la arquitectura antes que las prisas de marketing. ¡Tus órdenes son mi guía técnica!",
            "¡Súper! Me parece que esa es la clave para que el proyecto no muera de éxito en la primera hora. ¡Vamos a implementar esos cambios ya mismo!"
        ],
        "options": [
            {
                "text": "Atiende tus responsabilidades, Laura. El éxito será de todo el equipo.",
                "target": "developer_transition_6"
            }
        ]
    },
    "developer_transition_6": {
        "id": "developer_transition_6",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "El día del lanzamiento está a la vuelta de la esquina. La tensión es palpable en cada reunión, y los detalles finales se sienten como una montaña rusa emocional...",
        "autoTimer": { "duration": 8000, "target": "developer_6" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    "developer_6": {
        "id": "developer_6",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": "Escucha, 'Dirección'. El equipo de game design quiere implementar un sistema de toma de decisiones persistente que afecte a la narrativa global del servidor. Como si nuestras bases de datos no tuvieran ya suficiente carga. ¿Vas a darles el capricho creativo o vas a actuar como alguien que realmente entiende el coste computacional de un puntero persistente?",
        "options": [
            {
                "text": "A) Desarrollemos un prototipo en entorno cerrado y analicemos el impacto antes de decidir.",
                "target": "developer_6_reaction",
                "points": "A"
            },
            {
                "text": "B) lancemos una beta pública limitada en un solo servidor para ver la reacción de la base de datos.",
                "target": "developer_6_reaction",
                "points": "B"
            },
            {
                "text": "C) Integremos la funcionalidad de inmediato en el mundo principal; es el momento de priorizar la innovación.",
                "target": "developer_6_reaction",
                "points": "C"
            }
        ]
    },
    "developer_6_reaction": {
        "id": "developer_6_reaction",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": [
            "Mmm... una decisión que denota una falta de audacia técnica alarmante. Típico de una dirección que lee más foros de autoayuda que documentación oficial. Documentaré esto para los logs de errores futuros.",
            "Habrá que ver si tus servidores aguantan ese peso extra. Yo lo dudo profundamente, pero supongo que es tu cabeza la que rodará si falla la sincronización de las tablas SQL.",
            "Patético. Estás metiendo funciones con calzador a días del despliegue. Tu falta de rigor técnico es inspiradora... para cualquiera que quiera aprender cómo NO gestionar un lanzamiento estatal.",
            "Supongo que el concepto de 'deuda técnica' no entra en tus prioridades actuales ante las prisas del marketing. Pero adelante, cárgate el proyecto con tus ideas 'innovadoras'.",
            "No me mires a mí cuando el código empiece a echar humo por culpa de tu... 'visión creativa'. Vuelvo a mi terminal, allí el código sí tiene decencia profesional."
        ],
        "options": [
            {
                "text": "Ya he tomado una decisión, Gustavo. Vuelve a supervisar los despliegues.",
                "target": "developer_transition_7"
            }
        ]
    },
    "developer_transition_7": {
        "id": "developer_transition_7",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Los últimos retoques. La build final está casi lista. Solo quedan los detalles que diferencian un buen juego de una obra maestra técnica...",
        "autoTimer": { "duration": 7000, "target": "developer_7" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    "developer_7": {
        "id": "developer_7",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky.png",
        "speaker": "Narrador",
        "text": "Ruky está a punto de tirar tu café sobre el teclado. Sus ojos amarillos te desafían, como si supiera que ese café es lo único que te mantiene despierto tras 14 horas de depuración. ¿Salvarás tu equipo de un cortocircuito seguro?",
        "options": [
            {
                "text": "Coger el café antes del desastre y acariciar a Ruky para que se calme.",
                "target": "developer_7_laura"
            }
        ]
    },
    "developer_7_laura": {
        "id": "developer_7_laura",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/laura_con_ruky.png",
        "speaker": "Laura",
        "text": "¡Ay, perdón! Ruky siempre busca el momento menos oportuno para pedir atención. Lead, aprovechando que te he salvado de un café en el teclado, los testers reportan que la curva de aprendizaje es quizá demasiado técnica. ¿Deberíamos simplificar la interfaz o mantener la profundidad original para que los jugadores se sientan como verdaderos ingenieros?",
        "options": [
            {
                "text": "A) Mejora las ayudas visuales y los tutoriales interactivos sin cambiar la esencia del sistema.",
                "target": "developer_7_reaction",
                "points": "A"
            },
            {
                "text": "B) Simplifica los términos más complejos para que el juego sea accesible a un público más amplio.",
                "target": "developer_7_reaction",
                "points": "B"
            },
            {
                "text": "C) Mantengamos la complejidad intacta; los jugadores valorarán el desafío intelectual genuino.",
                "target": "developer_7_reaction",
                "points": "C"
            }
        ]
    },
    "developer_7_reaction": {
        "id": "developer_7_reaction",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/laura_con_ruky.png",
        "speaker": "Laura",
        "text": [
            "¡Buena decisión! Es el punto medio perfecto para que el juego no pierda su identidad. ¡Me pongo a diseñar los nuevos elementos de la interfaz ahora mismo!",
            "¡Súper! Me encanta esa idea de accesibilidad. Así mucha más gente podrá disfrutar de lo que hemos creado. ¡A trabajar en los menús simplificados!",
            "¡Qué seguridad transmites! Tienes razón, si el juego es bueno, la comunidad aprenderá. Me gusta mucho que defiendas la visión técnica inicial del equipo.",
            "¡Me encanta tu ojo clínico para estas cosas! Tu decisión nos ahorra muchas vueltas innecesarias. ¡Vamos con todo al lanzamiento!",
            "¡Genial! Me siento muy tranquila sabiendo que eres tú quien toma estas decisiones estratégicas finales. ¡A rematar el proyecto!"
        ],
        "options": [
            {
                "text": "Buen trabajo, Laura. El juego está listo. Vamos a descansar antes del gran día.",
                "target": "developer_transition_8"
            }
        ]
    },
    "developer_transition_8": {
        "id": "developer_transition_8",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "¡LLEGÓ EL GRAN DÍA! Los servidores están encendidos, el equipo de marketing ha hecho su magia y el mundo está esperando a que tú des la orden de lanzamiento...",
        "autoTimer": { "duration": 8000, "target": "developer_8" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    "developer_8": {
        "id": "developer_8",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": "Escúchame bien, Lead. El marketing está que arde y los directores no van a esperar. Necesitamos un impacto mundial inmediato, quiero que lances un evento masivo irreversible que cambie el mapa del juego en la primera hora. Es lo que venderá copias. No me vengas con excusas técnicas sobre 'estabilidad', simplemente haz que suceda.",
        "options": [
            {
                "text": "A) Jesica, ejecutaremos un evento controlado y progresivo para garantizar que los servidores no exploten.",
                "target": "developer_8_reaction",
                "points": "A"
            },
            {
                "text": "B) Dividiremos el evento por regiones horarias para repartir el tráfico mundial de forma inteligente.",
                "target": "developer_8_reaction",
                "points": "B"
            },
            {
                "text": "C) ¡Entendido, Jesica! El evento global será inmediato; la potencia de nuestro código brillará hoy ante todos.",
                "target": "developer_8_reaction",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "developer_8_reaction": {
        "id": "developer_8_reaction",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/jesica.png",
        "speaker": "Jesica",
        "text": [
            "Prudencia... bueno, mientras el resultado sea visible, aceptaré tu cautela. Pero si perdemos el impulso del lanzamiento, será tu responsabilidad.",
            "Estrategia escalonada. Una decisión profesional, supongo. Asegúrate de que los servidores aguanten el tirón en cada región o no habrá donde esconderse.",
            "¡Esa es la actitud activa que buscamos! Si tú confías en tu arquitectura, yo confío en el éxito comercial. ¡Hazlo realidad ahora mismo!",
            "Bien. Informaré a la junta de que tienes un plan de acción. Espero que tus líneas de código sean tan sólidas como tus promesas hoy.",
            "Más te vale que funcione. El mundo está mirando y no acepto el fracaso como opción. ¡Vuelve a tu puesto y lánzalo ya!"
        ],
        "options": [
            {
                "text": "Confío en mi código y en mi equipo. ¡Vamos a lanzar!",
                "target": "developer_launch_day"
            }
        ]
    },
    "developer_launch_day": {
        "id": "developer_launch_day",
        "background": "/assets/fondo_compania.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "playerSkin": "entrevista",
        "text": "Lead Developer, ha llegado el momento. El mundo está conectándose ahora mismo. Has demostrado capacidad técnica, pero solo el tiempo dirá si tu arquitectura sobrevive a la realidad. ¡Toda la suerte del mundo, estamos en tus manos!",
        "options": [
            {
                "text": "¡Iniciar el gran despliegue masivo y que comience la diversión!",
                "target": "developer_final_minigame"
            }
        ]
    },
    "developer_final_minigame": {
        "id": "developer_final_minigame",
        "minigame": "space_invaders",
        "nextScene": "developer_post_launch",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    },
    "developer_post_launch": {
        "id": "developer_post_launch",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Horas después del despliegue masivo. El estudio está en silencio, solo se escucha el murmullo de los ventiladores de los servidores y el cliqueo suave de los monitores de métricas...",
        "autoTimer": { "duration": 9000, "target": "developer_final_verdict" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "developer_final_verdict": {
        "id": "developer_final_verdict",
        "background": "/assets/fondo_escena_2.png",
        "speaker": "Narrador",
        "text": "El humo de la batalla técnica se disipa. Es hora de enfrentar la realidad de tus decisiones. Las métricas de rendimiento y las reseñas de la comunidad darán el veredicto final sobre tu carrera como Lead Developer.",
        "options": [
            {
                "text": "Ver informe final del rendimiento del servidor",
                "target": "FINALIZE_DEVELOPER_V2"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    "final_developer_success": {
        "id": "final_developer_success",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "¡LO HEMOS LOGRADO! ¡Lead! ¡Mira estos gráficos! La estabilidad es del 99,9%, la latencia es mínima y los jugadores están alucinando con el sistema que diseñaste. ¡Sabía que eras la persona indicada para este estudio! ¡Qué orgullo trabajar a tu lado!",
        "options": [
            {
                "text": "¡Buen trabajo a todo el equipo, Laura! Vamos a ver qué dice Gustavo.",
                "target": "final_developer_success_gustavo"
            }
        ]
    },
    "final_developer_success_gustavo": {
        "id": "final_developer_success_gustavo",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": "Mmmpff. Debo admitir... con cierta reticencia profesional... que tus métodos, aunque poco ortodoxos según mi manual de estilo personal, han mantenido la integridad del servidor. No ha habido ni un solo desbordamiento de pila. Buen trabajo, supongo. No te acostumbre a mis cumplidos.",
        "options": [
            {
                "text": "Un reconocimiento tuyo vale por mil, Gustavo. Vamos a informar al CEO.",
                "target": "final_developer_success_interviewer"
            }
        ]
    },
    "final_developer_success_interviewer": {
        "id": "final_developer_success_interviewer",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "text": "¡Increíble! Has gestionado la complejidad técnica con una maestría que pocos han demostrado en esta empresa. Tu perfil técnico es justo lo que el sector demanda. ¡Bienvenid[O/A] a la élite del desarrollo de software mundial!",
        "options": [
            {
                "text": "Muchas gracias por la oportunidad. Es hora de ver las métricas de éxito.",
                "target": "final_developer_success_ruky"
            }
        ]
    },
    "final_developer_success_ruky": {
        "id": "final_developer_success_ruky",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky_exito.png",
        "speaker": "Narrador",
        "text": "Ruky entra en la sala de juntas pavoneándose con la cola en alto. Se sienta sobre los informes de rendimiento y te mira con una profundidad inquietante, como si tuviera acceso root a tu conciencia. Te lanza un ronroneo de aprobación tan rítmico que parece código optimizado; Ruky sabe que este éxito no es solo suerte, y te valida como el Lead que el estudio necesitaba.",
        "options": [
            {
                "text": "Aceptar la aprobación de Ruky y ver quién más celebra.",
                "target": "final_developer_success_lua"
            }
        ]
    },
    "final_developer_success_lua": {
        "id": "final_developer_success_lua",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/lua.png",
        "speaker": "Lua",
        "text": "¡L-lead! ¡Lo hemos logrado! No hay ni un solo bug de duplicación en los logs de producción. ¡Todo funciona a la perfección! Laura está tan feliz que casi me da un abrazo... y-yo casi me desmayo, jeje. ¡Gracias por confiar en mis reportes, eres el mejor apoyo que el equipo de testing podría tener!",
        "options": [
            {
                "text": "¡Excelente trabajo, Lua! Vamos a ver el informe final.",
                "target": "final_report_success"
            }
        ]
    },
    "final_developer_fail": {
        "id": "final_developer_fail",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "Oh... Lead... los servidores finalmente han cedido. La base de datos ha colapsado y los jugadores están pidiendo reembolsos masivos. Con lo que yo confiaba en tu destreza técnica... No sé qué decir, me duele ver cómo termina todo esto.",
        "options": [
            {
                "text": "Lo siento, Laura. Vamos a ver qué dice Gustavo del desastre.",
                "target": "final_developer_fail_gustavo"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    "final_developer_fail_gustavo": {
        "id": "final_developer_fail_gustavo",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_arquitecto.png",
        "speaker": "Gustavo",
        "text": "Te lo advertí minuciosamente. Tu falta de rigor técnico y tus decisiones basadas en el hype creativo han destruido años de mi arquitectura pura. Espero que disfrutes de tu finiquito, porque tu nombre ahora es sinónimo de desastre absoluto en esta industria.",
        "options": [
            {
                "text": "Asumo toda la responsabilidad. Vamos a ver cuál es el veredicto del CEO.",
                "target": "final_developer_fail_interviewer"
            }
        ]
    },
    "final_developer_fail_interviewer": {
        "id": "final_developer_fail_interviewer",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "text": "Un desastre técnico de proporciones épicas. Has ignorado los principios más básicos de la ingeniería de software por prisas injustificadas. Me temo que aquí termina tu viaje con nosotros. Espero que aprendas la lección para tu futuro...",
        "options": [
            {
                "text": "Entendido. Vamos a ver las métricas finales del colapso.",
                "target": "final_developer_fail_ruky"
            }
        ]
    },
    "final_developer_fail_ruky": {
        "id": "final_developer_fail_ruky",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/ruky_fracaso.png",
        "speaker": "Narrador",
        "text": "Desde una esquina de la oficina en ruinas, Ruky te observa con una mirada gélida y una expresión que recordaría a cualquier veterano del internet al meme 'Pathetic'. No hay miau ni ronroneo; solo una absoluta decepción felina. Parece que el gato sabía perfectamente que tu arquitectura colapsaría y se sentó a observar el desastre como si fuera un espectáculo privado. Sientes que, en el fondo, Ruky se divirtió viéndote caer.",
        "options": [
            {
                "text": "Soportar la mirada de Ruky y escuchar el último reporte.",
                "target": "final_developer_fail_lua"
            }
        ]
    },
    "final_developer_fail_lua": {
        "id": "final_developer_fail_lua",
        "background": "/assets/fondo_escena_2.png",
        "showAI": true,
        "aiPortrait": "/assets/lua.png",
        "speaker": "Lua",
        "text": "Jo... Lead... he pasado toda la noche buscando una solución en el entorno de pruebas, pero el desastre era demasiado grande. Los exploits han destrozado todo el sistema. Me da mucha pena, sobre todo por Laura... ella confiaba tanto en que lo arreglaríamos. Supongo que incluso los mejores perfiles pueden fallar cuando la presión es tanta.",
        "options": [
            {
                "text": "Lo siento, Lua. Es hora de enfrentar el informe final.",
                "target": "final_report_fail"
            }
        ]
    },
    "final_report_success": {
        "id": "final_report_success",
        "background": "/assets/fondo_escena_2.png",
        "isFinalReport": true,
        "result": "success",
        "options": [
            {
                "text": "¡Celebrar y reiniciar aventura con otro perfil!",
                "target": "intro_1"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    "final_report_fail": {
        "id": "final_report_fail",
        "background": "/assets/fondo_escena_2.png",
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
