export const analystScenes = {
    // RUTA 3 - ANALISTA DE DATOS (C Dominant)
    "analyst_1": {
        "id": "analyst_1",
        "background": "/assets/fondo_escena_3.png",
        "speaker": "Narrador",
        "playerSkin": "analista",
        "text": "Llegas a la división de Estrategia y Analítica del estudio con el pulso acelerado. El silencio sepulcral de la oficina solo se ve interrumpido por el suave zumbido de los servidores y el cliqueo rítmico de los analistas de datos. Pantallas gigantes proyectan flujos de información en tiempo real. Mapas de calor, proyecciones de crecimiento y gráficos de retención que parecen latir con vida propia. Este no es solo un departamento; es el cerebro estratégico que decide el futuro del estudio.",
        "options": [
            {
                "text": "Entrar a saludar al Jefe de Análisis de Datos",
                "target": "analyst_intro_lee"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "analyst_intro_lee": {
        "id": "analyst_intro_lee",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "playerSkin": "analista",
        "text": [
            "¡Ey! ¡Al fin llegas! Bienvenid[O/A] a la trinchera de los números. Soy Lee, el Analista de Datos en Jefe. He seguido tu rendimiento en la UNIR y el rigor de tus modelos es justo lo que necesitamos. Aquí no nos limitamos a mirar hojas de cálculo; desciframos el comportamiento de los jugadores para que el estudio no dé pasos en falso. ¡Vamos a bucear en este océano de datos!",
            "¡Ey, camarada! Qué ganas de tenerte por aquí. Soy Lee. Qué bueno es tener a alguien de la UNIR para poner un poco de ciencia narrativa en este caos. El departamento creativo suele volar demasiado alto sin paracaídas, pero para eso estamos nosotros, para ponerles los pies en la tierra con datos y realidad objetiva. ¿Listo para el Big Data?",
            "¡Bienvenid[O/A] al núcleo estratégico! Soy Lee. Espero que estés list[O/A] porque los servidores están que arden con los datos de la beta. Tu formación en la UNIR dice que eres un lince detectando patrones imposibles, y créeme, aquí vas a necesitar cada bit de ese instinto. ¡A por ello!",
            "¡Hola, camarada! Soy Lee. Me alegra que seas tú quien refuerce nuestra división. Aquí los datos cuentan historias que otros prefieren ignorar. En la UNIR te enseñaron a leer entre líneas... espero que sea cierto, ¡porque la beta global empieza ya! ¿Preparad[O/A]?",
            "¡Qué alegría verte! Me presento, soy Lee, Jefe de Análisis. Me encantan tus informes preliminares, equilibras la teoría con la acción magistralmente. Aquí el ritmo es frenético, pero el café es excelente. ¡Hagamos que estos gráficos de éxito se disparen hoy!"
        ],
        "options": [
            {
                "text": "Un honor conocerte, Lee. Estoy list[O/A] para empezar el análisis profundo.",
                "target": "analyst_q1"
            }
        ]
    },
    "analyst_q1": {
        "id": "analyst_q1",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "Empecemos con un caso real de crisis. Los datos muestran que muchos usuarios abandonan el juego justo al llegar al nivel 15. El departamento creativo quiere lanzar parches visuales inmediatos para calmar los ánimos, pero necesito tu criterio, ¿Cómo debemos abordar este patrón de abandono?",
        "options": [
            {
                "text": "A) Estudiemos a fondo si el problema es que el juego se vuelve muy difícil o si falta contenido interesante en ese punto.",
                "target": "analyst_q1_reaction",
                "points": "A"
            },
            {
                "text": "B) Ajustemos la progresión de experiencia para que subir de nivel sea más fluido y natural en ese tramo.",
                "target": "analyst_q1_reaction",
                "points": "B"
            },
            {
                "text": "C) Lancemos un evento de recompensas exclusivas justo en el nivel 14 para asegurar que los jugadores quieran seguir adelante.",
                "target": "analyst_q1_reaction",
                "points": "C"
            }
        ]
    },
    "analyst_q1_reaction": {
        "id": "analyst_q1_reaction",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": [
            "¡Entendido! Me gusta ese enfoque de 'medir dos veces y cortar una'. Es la forma más profesional de no crear un desequilibrio peor por las prisas. Me pongo con el informe detallado.",
            "¡Esa es la actitud activa que buscamos! Ajustar la progresión es un cambio directo que nos dará resultados en 24 horas. Informaré al equipo de diseño para que sincronicen sus planes.",
            "¡Interesante! Ese enfoque de incentivos puede darnos cifras de retención espectaculares para la reunión de mañana. Tienes un instinto muy afilado para lo que el mercado quiere ver ahora mismo.",
            "Entendido. Me gusta que no te tomen por sorpresa estos picos de abandono. Tomaré nota de tu estrategia para incluirla en el reporte global de esta tarde.",
            "Tus calculos son claros y directos. Me encanta el rigor con el que abordas los problemas de comportamiento masivo. ¡Va a ser un placer trabajar contigo!"
        ],
        "options": [
            {
                "text": "Continuar monitorizando los flujos de datos entrantes.",
                "target": "analyst_q2"
            }
        ]
    },
    "analyst_q2": {
        "id": "analyst_q2",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": "¡Holi, holi! ¡Vaya! ¿Tú eres la nueva mente brillante? ¡Qué ilusión! Soy Ana, de Marketing. Oye, necesito un favorcito súper rápido, no te quitará nada de tiempo... ¡Nuestro evento con influencers es un bombazo total! Es como magia. Pero Lee dice que es 'pasajero'... ¿A que es una tontería? Deberíamos dejarlo para siempre y que sea el alma del juego, ¿verdad que sí?",
        "options": [
            {
                "text": "A) Ana, los datos sugieren prudencia; hay que ver si el interés se mantiene sin publicidad.",
                "target": "analyst_q2_reaction",
                "points": "A"
            },
            {
                "text": "B) Podríamos dejar solo lo más popular, para no saturar a los jugadores veteranos.",
                "target": "analyst_q2_reaction",
                "points": "B"
            },
            {
                "text": "C) ¡Claro! Si la gente está feliz ahora, ¡hay que darles todo lo que piden sin dudarlo!",
                "target": "analyst_q2_reaction",
                "points": "C"
            }
        ]
    },
    "analyst_q2_reaction": {
        "id": "analyst_q2_reaction",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": [
            "Jo... qué aguafiestas con tus gráficas grises. Me vas a hacer quedar fatal con los influencers, ¡y yo que les prometí que seríamos mejores amigos! Pero bueno, si tú lo dices...",
            "¡Ay, qué bien! Sabía que me entenderías un poquito. No es todo lo que quería, pero menos da una piedra. ¡Eres un sol a medias!",
            "¡SÍEEEE! ¡Lo sabía! ¡Eres genial! El mercado no espera y nosotros tampoco. ¡Vamos a llenar todo de confeti virtual ahora mismo! ¡Gracias, gracias, gracias!",
            "Qué serio te pones con los numeritos, ¡me recuerdas a mi profesor de mates! Pero bueno, te haré caso porque me caes súper bien. ¡A por ello!",
            "¡Eres lo más! Me encanta que no seas tan cuadriculado como Lee. ¡Vamos a hacer que internet explote con este éxito!"
        ],
        "options": [
            {
                "text": "Ana, tengo que volver con Lee... hay informes que no se validan solos.",
                "target": "analyst_transition_1"
            }
        ]
    },
    "analyst_transition_1": {
        "id": "analyst_transition_1",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Han pasado varias semanas. El flujo de información no descansa y ahora te enfrentas a un desafío económico que afecta a todos los jugadores...",
        "autoTimer": { "duration": 6000, "target": "analyst_q3" },
        "advanceDays": 15,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "analyst_q3": {
        "id": "analyst_q3",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "Camarada, la economía interna del juego está sufriendo una inflación preocupante. Los objetos raros están fuera del alcance de los jugadores nuevos. Si esto sigue así, nadie querrá empezar a jugar. Como analista, ¿qué ajuste sugieres para equilibrar la moneda del juego?",
        "options": [
            {
                "text": "A) Ajustemos cómo aparecen los recursos para que dependan del esfuerzo real de los jugadores activos.",
                "target": "analyst_q3_reaction",
                "points": "A"
            },
            {
                "text": "B) Revisemos el precio de los objetos básicos para que la moneda recupere su valor poco a poco.",
                "target": "analyst_q3_reaction",
                "points": "B"
            },
            {
                "text": "C) Creemos un evento especial donde los jugadores con más ahorros puedan gastarlos masivamente en objetos exclusivos.",
                "target": "analyst_q3_reaction",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "analyst_q3_reaction": {
        "id": "analyst_q3_reaction",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": [
            "¡Una decisión valiente y llena de lógica! Estabilizar un mundo virtual es como una operación delicada... ¡y tú manejas la situación con precisión!",
            "¡Esa es la visión práctica que necesitamos! Al final, los pequeños ajustes constantes son los que salvan un proyecto. Me pongo con los cambios ahora mismo.",
            "¡Interesante propuesta! Ese tipo de 'sumideros de ahorros' son muy efectivos para limpiar la economía en tiempo récord. Me encanta cómo buscas soluciones creativas.",
            "Entendido. Me gusta que no le temas a los cambios profundos. Informaré al equipo de economía para que actualicen sus tablas según tu recomendación.",
            "Tus instrucciones son claras y directas. Me fascina la seguridad con la que abordas problemas tan complejos de gestión. ¡Seguimos adelante!"
        ],
        "options": [
            {
                "text": "Continuar con el procesamiento de los datos críticos.",
                "target": "analyst_q4"
            }
        ]
    },
    "analyst_q4": {
        "id": "analyst_q4",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/personaje_junior.png",
        "speaker": "Laura",
        "text": "¡Hola! Perdón por la interrupción, pero en Desarrollo estamos un poco confundidos. Las encuestas dicen que a los jugadores les encanta el nuevo mapa, pero nuestras métricas dicen que salen de él a los pocos minutos. ¡Es una contradicción total! ¿A qué deberíamos hacer caso?",
        "options": [
            {
                "text": "A) Los datos de comportamiento no mienten: si se van rápido, es que hay algo en el diseño que les cansa o frustra.",
                "target": "analyst_q4_reaction",
                "points": "A"
            },
            {
                "text": "B) Puede que les guste el aspecto visual, pero que caminar por el mapa sea aburrido. Debemos analizar ambos puntos.",
                "target": "analyst_q4_reaction",
                "points": "B"
            },
            {
                "text": "C) Hagamos caso a lo que dicen los usuarios; si están contentos en redes sociales, el proyecto va por muy buen camino.",
                "target": "analyst_q4_reaction",
                "points": "C"
            }
        ]
    },
    "analyst_q4_reaction": {
        "id": "analyst_q4_reaction",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": [
            "¡Ay, Laura! Ni le hagas caso a estos analistas y sus aburridos dibujos de barritas... Qué manía con la realidad. Oye, 'pro', si mi campaña se hunde por decir la verdad, ¡me deberás mil cafés por hacerme quedar mal!",
            "¡BINGO! ¿Ves, Laura? Te lo dije. Si el mapa es bonito, la gente vendrá aunque se pierda un poco. ¡Eres un analista con alma de artista, me encanta!",
            "¡VIVA! ¡Alguien que entiende que el 'hype' es lo más importante! No podemos romper el hechizo solo porque unos datos digan que la gente se va. ¡Eres mi persona favorita hoy!",
            "Qué espesos os ponéis con los 'flujos de uso'... suena a algo de fontanería. Pero bueno, confío en ti porque tienes cara de saber mucho. ¡No me falles!",
            "¡Súper! Al final lo que importa es que hablen de nosotros, ¿no? ¡Qué emoción ver que piensas en mis anuncios!"
        ],
        "options": [
            {
                "text": "Intentar explicar la diferencia entre opinión y métrica de retención.",
                "target": "analyst_lee_ai_intro"
            }
        ]
    },
    "analyst_lee_ai_intro": {
        "id": "analyst_lee_ai_intro",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "¡Camarada, mira esto! He estado entrenando una red neuronal masiva basada en los patrones que procesamos. Necesito tu ayuda para conectar las sinapsis finales en los servidores globales. Si logramos sincronizarlo correctamente, daremos vida al asistente analítico definitivo.",
        "options": [
            {
                "text": "¡Hagámoslo! Entrando al sistema para conectar los nodos neuronales.",
                "target": "analyst_minigame_1"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "analyst_minigame_1": {
        "id": "analyst_minigame_1",
        "background": "/assets/fondo_escena_4.png",
        "minigame": "zip",
        "nextScene": "analyst_yui_reveal",
        "failScene": "analyst_fail_zip",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
    },
    "analyst_yui_reveal": {
        "id": "analyst_yui_reveal",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/yui.png",
        "speaker": "Yui",
        "text": "¡Hola Mundo! ✨ Soy Yui, vuestra nueva unidad de inteligencia analítica vinculada al monitor central. Mis algoritmos acaban de activarse gracias a vuestra ayuda. ¡Lee, Analista, estoy lista para analizar hasta el último bit del estudio! Juntos haremos que estos números cuenten historias increíbles.",
        "options": [
            {
                "text": "Bienvenida al equipo, Yui. Empecemos a trabajar.",
                "target": "analyst_transition_2"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "analyst_transition_2": {
        "id": "analyst_transition_2",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Pasan las semanas. El flujo de información es ahora gestionado por Yui, quien monitoriza cada movimiento de la economía mientras tú y Lee supervisáis sus proyecciones...",
        "autoTimer": { "duration": 6000, "target": "analyst_q5" },
        "advanceDays": 30,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "analyst_q5": {
        "id": "analyst_q5",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/yui.png",
        "speaker": "Yui",
        "text": "¡Camarada! Acabo de terminar de procesar las últimas métricas de crecimiento y... ¡wow! Superamos todas las previsiones. Lee y yo hemos detectado que los servidores están al límite técnico. Según mis cálculos económicos, debemos decidir nuestra estrategia de inversión para el próximo mes. ¿Cuál es vuestra orden?",
        "options": [
            {
                "text": "A) Prioricemos la solidez; inversión centrada en equipos para evitar fallos técnicos.",
                "target": "analyst_q5_reaction",
                "points": "A"
            },
            {
                "text": "B) Apliquemos un presupuesto de crecimiento orgánico y escalonado según necesidad.",
                "target": "analyst_q5_reaction",
                "points": "B"
            },
            {
                "text": "C) Solicitemos una ampliación masiva de recursos para dominar la red, lo mas acertado es una ampliación total.",
                "target": "analyst_q5_reaction",
                "points": "C"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "analyst_q5_reaction": {
        "id": "analyst_q5_reaction",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": [
            "Sensato, muy sensato. No queremos que todo explote por un exceso de ambición sin base. Me pongo con la propuesta para la junta ahora mismo.",
            "¡Exacto! Ese enfoque de crecer según la necesidad es lo más inteligente hoy en día. ¡Me encanta cómo aplicas lo que aprendiste!",
            "¡Esa es la ambición que nos llevará a la cima! No podemos ser tímidos cuando los números nos dan la razón así. ¡Eres un lince!",
            "Entendido. Me gusta que no le temas a los cambios de rumbo masivos. Informaré a los directores para que empiecen a alinear sus planes contigo.",
            "Espera... arréglate un poco, camarada... El CEO acaba de entrar en el edificio y viene directo hacia nuestra área. ¡A por todas!"
        ],
        "options": [
            {
                "text": "Ponerse en guardia para saludar a la presidencia del estudio.",
                "target": "analyst_q6"
            }
        ]
    },
    "analyst_q6": {
        "id": "analyst_q6",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "text": "Saludos. He seguido con interés sus informes sobre el nuevo sistema de compras dentro del juego. Los beneficios son los más altos de nuestra historia. Sin embargo, algunos jugadores se quejan de que es demasiado agresivo. Como analista, ¿debemos expandir este modelo o mantener la prudencia?",
        "options": [
            {
                "text": "A) Deberíamos analizar primero cómo afectará esto a la moral de los jugadores a largo plazo.",
                "target": "analyst_q6_reaction",
                "points": "A"
            },
            {
                "text": "B) Sería mejor mantener el equilibrio actual para no quemar el entusiasmo de la comunidad tan rápido.",
                "target": "analyst_q6_reaction",
                "points": "B"
            },
            {
                "text": "C) Los resultados económicos actuales confirman que los jugadores están dispuestos a pagar, seria eficiente expandir el modelo.",
                "target": "analyst_q6_reaction",
                "points": "C"
            }
        ]
    },
    "analyst_q6_reaction": {
        "id": "analyst_q6_reaction",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/entrevistador.png",
        "speaker": "CEO",
        "text": [
            "Entiendo su perspectiva. Buscar metas sostenibles es algo que valoramos aquí. Sus datos serán clave para la próxima reunión de inversores.",
            "Una postura práctica que demuestra equilibrio entre negocio y comunidad. Me agrada que no pierda el suelo de vista entre tantos beneficios. Buen trabajo.",
            "¡Vaya, qué seguridad! Es refrescante ver que en Análisis no tienen miedo al éxito financiero masivo. Seguiremos esta senda de crecimiento con su guía.",
            "Tomo nota de su recomendación. El futuro del estudio depende de decisiones basadas en pruebas, no en corazonadas. Envíeme el informe antes del viernes.",
            "Sus directrices son claras como el agua. El éxito del proyecto es ahora responsabilidad directa de su análisis. (El CEO se retira con paso firme)."
        ],
        "options": [
            {
                "text": "Continuar con el procesamiento de los informes trimestrales de rentabilidad.",
                "target": "analyst_transition_3"
            }
        ]
    },
    "analyst_transition_3": {
        "id": "analyst_transition_3",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Ha pasado mucho tiempo. El juego es un fenómeno mundial y ahora te enfrentas al desafío final de tu carrera analítica...",
        "autoTimer": { "duration": 6000, "target": "analyst_q7" },
        "advanceDays": 60,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "analyst_q7": {
        "id": "analyst_q7",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "Mira con atención, camarada. Yui ha generado un modelo predictivo a tres años basado en nuestra trayectoria actual. Los datos son claros, pero la decisión final es estratégica.",
        "options": [
            {
                "text": "Escuchar el desglose de datos de Yui.",
                "target": "analyst_q7_yui"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "analyst_q7_yui": {
        "id": "analyst_q7_yui",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/yui.png",
        "speaker": "Yui",
        "text": "Mis proyecciones indican una saturación de mercado inminente si no variamos el rumbo. Podríamos perder a los usuarios más fieles por falta de innovación. ¿Qué estrategia técnica y económica recomendáis aplicar?",
        "options": [
            {
                "text": "A) Mejoremos la calidad técnica y el servicio para fidelizar a los usuarios expertos.",
                "target": "analyst_q7_reaction",
                "points": "A"
            },
            {
                "text": "B) Expandamos el juego moderadamente hacia nuevos mercados internacionales.",
                "target": "analyst_q7_reaction",
                "points": "B"
            },
            {
                "text": "C) Desarrollemos productos nuevos apoyándonos en toda la información que hemos acumulado.",
                "target": "analyst_q7_reaction",
                "points": "C"
            }
        ]
    },
    "analyst_q7_reaction": {
        "id": "analyst_q7_reaction",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": [
            "¡Es una visión a largo plazo magistral! Menos mal que te tenemos aquí para poner cordura entre tanta ambición comercial. Los datos dicen que ese es el camino.",
            "¡Esa es la visión integradora que buscábamos! Expandir nuestro alcance a nivel global es el paso natural hacia el liderazgo absoluto del sector. ¡Me gusta!",
            "¡Interesante riesgo estratégico! No muchos tendrían el coraje de proponer una expansión tan fuerte. Sin duda, si sale bien, habremos hecho historia.",
            "Entendido. Me gusta que no le temas a los cambios de rumbo masivos. Informaré a los directores para que empiecen a alinear sus planes contigo.",
            "Tus instrucciones son como un algoritmo de éxito: precisas y eficientes. ¡Vaya viaje estamos viviendo a tu lado, camarada!"
        ],
        "options": [
            {
                "text": "Avanzar hacia la entrega final del informe anual de resultados globales.",
                "target": "analyst_q8"
            }
        ]
    },
    "analyst_q8": {
        "id": "analyst_q8",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": "¡Porfi, porfi! ¡Necesito de tu genio solo un segundito más! Sé que estás a tope, pero es que la nota de prensa tiene que salir YA. Los datos dicen que la gente se va pronto del juego, ¡pero mi borrador dice que somos el éxito del siglo! Si cuento la verdad, la gente se pondrá triste... ¿Verdad que podemos omitir esos detallitos feos y centrarnos en lo bueno?",
        "options": [
            {
                "text": "A) Ana, la transparencia es ética de datos. Si mentimos, el golpe final será mucho peor.",
                "target": "analyst_q8_reaction",
                "points": "A"
            },
            {
                "text": "B) Busquemos un punto medio: hablemos del éxito pero mencionemos que estamos trabajando en las mejoras.",
                "target": "analyst_q8_reaction",
                "points": "B"
            },
            {
                "text": "C) ¡Adelante con el éxito del siglo! El marketing se trata de vender una ilusión, ya arreglaremos los datos luego.",
                "target": "analyst_q8_reaction",
                "points": "C"
            }
        ]
    },
    "analyst_q8_reaction": {
        "id": "analyst_q8_reaction",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": [
            "Jo... qué aguafiestas eres con tus verdades incómodas. Me has roto toda la magia de la campaña. Ahora tendré que contar cosas aburridas... ¡Espero que Lee esté contento con su analista estrella!",
            "¡Bueno, vale! No es el súper anuncio que quería, pero al menos no mentimos del todo. ¡Eres un analista con conciencia, qué mono!",
            "¡ESO ES! ¡Eres mi alma gemela de marketing! Si el mundo cree que somos los mejores, ¡seremos los mejores! El resto ya se verá. ¡Te debo mil favores!",
            "Entendido. Me obligas a ser honesta... qué sensación más rara. Pero confío en ti porque, aunque seas un poco soso con los datos, ¡tienes buen fondo!",
            "¡Venga, date prisa en validar eso! Que la prensa me está llamando y no sé qué decirles sin tu visto bueno. ¡Eres el jefe, aunque seas un mandón!"
        ],
        "options": [
            {
                "text": "Validar informe y buscar a Lee para el lanzamiento final.",
                "target": "analyst_pre_launch"
            }
        ]
    },
    "analyst_pre_launch": {
        "id": "analyst_pre_launch",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "¡Ha llegado el momento! El juego está a segundos de lanzarse a nivel mundial. Ya hemos hecho todo el trabajo previo con Yui y Ana... ahora solo queda monitorizar el despliegue del centro de datos en tiempo real. ¡Toda la suerte del mundo, estamos en tus manos!",
        "options": [
            {
                "text": "¡Iniciar el despliegue global de datos!",
                "target": "analyst_minigame_2"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    "analyst_minigame_2": {
        "id": "analyst_minigame_2",
        "background": "/assets/fondo_entrevista.png",
        "minigame": "datacenter",
        "noRetry": true,
        "nextScene": "analyst_final_verdict_prep",
        "failScene": "analyst_final_verdict_prep",
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
    },
    "analyst_final_verdict_prep": {
        "id": "analyst_final_verdict_prep",
        "background": "/assets/fondo_tasa_cafe.png",
        "text": "Consolidando métricas de éxito y proyecciones de rentabilidad global para el informe de la junta...",
        "autoTimer": { "duration": 7000, "target": "analyst_final_verdict" },
        "advanceDays": 45,
        "hidePlayer": true,
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    "analyst_final_verdict": {
        "id": "analyst_final_verdict",
        "background": "/assets/fondo_escena_4.png",
        "speaker": "Narrador",
        "text": "Tras meses de análisis incansables, miles de informes generados y decisiones críticas al filo de lo imposible, el proyecto ha alcanzado su madurez definitiva. Es el momento de que los números hablen por ti y den el veredicto real sobre tu gestión estratégica.",
        "options": [
            {
                "text": "Ver informe final de rentabilidad y sostenibilidad económica.",
                "target": "FINALIZE_ANALYST"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    "analyst_final_success": {
        "id": "analyst_final_success",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "¡LO HEMOS LOGRADO, CAMARADA! ¡Métricas impecables! Tu capacidad de análisis y tus proyecciones sensatas basadas en la UNIR han convertido el juego en un pilar indestructible. El CEO está saltando de alegría y nuestra división es ahora el motor financiero del estudio. ¡Eres una leyenda!",
        "options": [
            {
                "text": "¡Buen trabajo en equipo, Lee! Vamos a hablar con Ana del éxito comercial.",
                "target": "analyst_final_success_ana"
            }
        ]
    },
    "analyst_final_success_ana": {
        "id": "analyst_final_success_ana",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": "¡Jo! Tengo que darte la razón... tus numeritos aburridos han funcionado de maravilla. La gente está súper feliz y mi campaña es un éxito total sin haber tenido que inventarme nada. ¡Eres un genio aunque seas tan serio! Oye, por cierto... ya que estamos... ¿no podrías hacerme un mini-click-informe para mi próximo proyecto? ¡No tardarás nada!",
        "options": [
            {
                "text": "Reírse ante la insistencia de Ana y ver la reacción de Yui.",
                "target": "analyst_final_success_yui"
            }
        ]
    },
    "analyst_final_success_yui": {
        "id": "final_analyst_success_yui",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/yui_exito.png",
        "speaker": "Yui",
        "text": "¡Métricas de felicidad detectadas! ✨ Mis algoritmos confirman que somos el equipo más eficiente del estudio. ¡Camarada, tus decisiones han optimizado nuestro futuro! Estoy tan alegre que he iluminado todos los monitores del departamento con vuestras fotos de éxito.",
        "options": [
            {
                "text": "Cerrar el informe de excelencia con Yui.",
                "target": "analyst_final_report_success"
            }
        ]
    },
    "analyst_final_report_success": {
        "id": "final_analyst_report_success",
        "background": "/assets/fondo_escena_4.png",
        "isFinalReport": true,
        "result": "success",
        "options": [
            {
                "text": "¡Celebrar el éxito y reiniciar la aventura profesional!",
                "target": "intro_1"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    "analyst_final_fail": {
        "id": "analyst_final_fail",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "Lo siento muchísimo, camarada... pero los datos no mienten. Tus decisiones arriesgadas y proyecciones demasiado optimistas inflaron una burbuja que ha terminado por estallar. Los servidores están desiertos y la economía del juego ha colapsado por completo. Es un golpe devastador para todos.",
        "options": [
            {
                "text": "Entiendo, Lee. Vamos a escuchar qué opina Ana del impacto en marketing.",
                "target": "analyst_final_fail_ana"
            }
        ]
    },
    "analyst_final_fail_ana": {
        "id": "analyst_final_fail_ana",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/ana.png",
        "speaker": "Ana",
        "text": "¡Ay, no! ¡Esto es horrible! ¡Te lo dije! Bueno, no te lo dije con datos, ¡pero es que mi instinto me daba malas vibras! Ahora mi súper campaña es el hazmerreír de todo internet y la gente me pone comentarios feos. Yo confié en ti porque eras el experto... Jo, qué decepción más grande, de verdad. Me has roto el corazón del marketing.",
        "options": [
            {
                "text": "Escuchar el último reporte de estado de Yui.",
                "target": "analyst_final_fail_yui"
            }
        ]
    },
    "analyst_final_fail_yui": {
        "id": "final_analyst_fail_yui",
        "background": "/assets/fondo_escena_4.png",
        "showAI": true,
        "aiPortrait": "/assets/yui_fracaso.png",
        "speaker": "Yui",
        "text": "Error crítico detectado... 💔 El modelo de negocio ha colapsado. He procesado todos los escenarios posibles y la quiebra es irreversible. Me entristece mucho que nuestra colaboración termine así; mis procesadores están en silencio absoluto tras el desastre.",
        "options": [
            {
                "text": "Soportar la culpa mientras Yui apaga sus monitores.",
                "target": "final_analyst_report_fail"
            }
        ]
    },
    "final_analyst_report_fail": {
        "id": "final_analyst_report_fail",
        "background": "/assets/fondo_escena_4.png",
        "isFinalReport": true,
        "result": "fail",
        "options": [
            {
                "text": "¡Aprender la lección y volver a intentar la ruta estratégica!",
                "target": "START_BRANCH"
            },
            {
                "text": "¡Reiniciar juego completo para buscar otro perfil!",
                "target": "intro_1"
            }
        ],
        "musicTrack": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    "analyst_fail_zip": {
        "id": "analyst_fail_zip",
        "background": "/assets/fondo_escena_3.png",
        "showAI": true,
        "aiPortrait": "/assets/lee.png",
        "speaker": "Lee",
        "text": "La red neuronal ha colapsado antes de nacer. Las conexiones están rotas y no podemos recuperar la estructura de Yui. Si no puedes ver los patrones básicos de la IA, no podemos confiarte el cerebro del estudio.",
        "options": [
            {
                "text": "Reintentar la conexión neuronal",
                "target": "analyst_minigame_1"
            },
            {
                "text": "Dimitir y buscar otro sector (Reiniciar juego)",
                "target": "intro_1"
            }
        ]
    }
};
