Documento de investigaciones realizadas para aplicación Piedra Papel Tijera (juego web)

Empecé con bosquejo de wireframes en papel para ver las diferentes pantallas que podría haber (Landing, Login, Registro, Resumen de usuarios contra quienes uno jugó, listado de usuarios, juego, resumen de partida).

No quise hacer los prototipos hasta no estar segura de poder hacer todo como previsto. 

Saqué todo lo que tenía que ver con el MFA ya que no lo iba a usar. No se pedía en la letra y ya el proyecto de clase no me funcionaba 100% el MFA, entonces decidí no usarlo, teniendo en cuenta que es un juego gratuito y no se estaría exponiendo información muy sensible como datos bancarios o similar.

Al principio sineramente estaba re perdida cómo encarar todo, googleé ejemplos, cómo armar el esqueleto, diferencias de schema y modelo, conceptos de React, conceptos de Mongoose. 
La clase de apoyo me ayudó mucho a entender más como armar todo a grueso modo y las diferencias con la app de clase, pero la verdad tuve mil dudas después cómo hacer casi todo (perdón por preguntar tanto!).

Utilicé como base la aplicación desarrollada en clase (app de Todos). La primera idea fue hacer algo de a cero, pero lo descarté por falta de tiempo y muchas dudas que me surgieron ya al principio.

Estuve dando muchas vueltas con el Login que me tiraba error de validación al registrarse, pensé que era el formulario del Frontend pero en la clase de consulta me di cuenta (con ayuda del profe) que era por la validación de Joi del Backend y le saqué el requisisto de alfanumérico a Joi.

Cambié la página landing para que quede más simple, cambié tema de Bootstrap a Litera en vez de Minty, agregué estilos personalizados, agregué logo e ícono (la app de clase tenía el de React app). Los íconos que usé dentro de la app son de React Icons.

Adapté el esqueleto de nombres y carpetas acorde a lo que iba a utilizar para el juego (dejando.

Estuve dando muchas vueltas con el Login que me tiraba error de validación al registrarse, pensé que era el formulario del Frontend pero en la clase de consulta me di cuenta (con ayuda del profe) que era por la validación de Joi del Backend y le saqué el requisisto de alfanumérico a Joi.

Definí los modelos (game, user y dentro del game las choices que serían las jugadas de cada partida). Conecté la base de datos a MongoCloud en vez de usarla local (el Readme de clase no estaba del todo bien y tuve problemas por eso, luego de consultar al profe lo pude conectar).

Entendí que lo que se quiere lograr de flujo se estaría emulando con el seeder básicamente, por eso lo armé primero. Luego de consultar dudas con el profesor, el seeder me funciona pero no me anida los games dentro del mismo modelo (tenía el modelo de los games primero solo como schema (como tenía la app de la clase) y luego lo cambié para que sea un modelo por separado y y así se pueda insertar con el seeder después, pero me dejó de anidar los games adentro del modelo del user). Después de consultarlo varias veces con el profe (supongo que no fui clara en la consulta la primera vez), entendí que deben estar por separados ambos y no anidadas las partidas a los usuarios y lo cambié.

No me quedó claro al principio cómo referenciar entre un modelo y el otro (cómo sabe Mongoose que me estoy refiriendo al game relacionado a usuario X si no le digo que está relacionado de alguna forma), investigué por la documentación de Mongoose y me topé con el populate, después de consultarlo con el profe (y después de 2 semanas sin respuesta y poder avanzar mucho), lo descarté para enterarme luego que sí era lo correcto que utilizar para el getById y el get-games-by-users.

Hice un componente de barra de navegación sin los links de "salir" y "Home" para poner en la Landing, Login y Registro. El toggle de la barra de Bootstrap que estaba en el proyecto de clase no funcionaba en modo de pantalla chica (de celular), investigando no le encontré solución haciéndolo con Bootstrap "común", por lo cual cambié las barras de navegación a unas de React Boostrap (obviamente mirando la documentación).
Cambié el formulario de Bootstrap del Login y Registro que teníamos por uno de React Bootstrap.

Para la parte del juego reciclé un ejemplo que encontré por internet que me gustó, cambié algunos estilos (me faltó ajustar muchos otros, pero no me dio el tiempo...). Armé el create y update del Game en el Backend, pero me quedó por implementarlo en el frontend (la parte del create está comentado en el "Play"). Por ende no pude resolver el tema de jugar contra otro jugador sin que se me rompa todo, así que lo dejé jugando contra la máquina con jugadas creadas randómicas.

Con ayuda del profe puse resolver mostrar las partidas del usuario logueado (dónde participó) y mostrarlas en el Frontend. Incluyendo la parte que da la opción de ver el resumen de la partida y retomar la partida (que en mi caso no es retomar ESA partida sino una partida cualquiera, me faltó esa parte).

Armé el resumen de la partida que se jugó con una tabla de Boostrap, me topé con que las jugadas son un array de un array con un objeto adentro, estuve dando vueltas para ver cómo poder mostrarlo en la UI (con el reduce(), forEach, iterar por array y el .map, pero no logré que me funcionara. Sé que mi solución no está bien y estoy segura que con más tiempo es algo que podría solucionar sola, pero no lo tengo :-(. Así que en el resumen no aparecen las jugadas. Con el reduce me mostraba un número en vez del contendido, por lo tanto me pareció mejor dejarlo así para al menos no muestre información falsa. 
La info no está condicionada en el Seeder, así que no coincide el "empate", "ganado" o "perdido" con los puntos o los puntos del oponente.

Estuve tratando de mostrar el nombre del usuario en la barra de navegación (la Nav con links), pero lo dejé cuando me di cuenta que me faltaban muchas otras cosas más importantes (a mi criterio). Creo que es algo que podría llegar a solucionar sola también si tuviera más tiempo, lamentablemente me di cuenta tarde de que la letra lo pedía (mal yo) y di preferencia a otras cosas.

Otra cosa que probablemente no está bien es el condicionado que le puse al create del juego en el Backend (tratando de cumplir con los requisitos que debe al menos haber un jugador en el sistema, por ende uno registrado y que no debe haber partida en curso). Como no le estoy pegando con el Frontend, no me está dando problemas ese condicional, pero muy probablemente esté mal.

No subí todo a Firebase y Heroku por falta de tiempo, me quedó bastante claro cómo hacerlo (creo), pero no me dio el tiempo (si no no entrego nada de prototipos).

Finalmente me puse con los prototipos (en proceso, voy a entregar lo que logre hacer hasta ahora). 

En resumen aprendí mucho haciendo la app, de no tener la menor idea pasé a tener un poco más de idea X-) y me quedaron más claras muchas cosas. El tiempo incluyendo el tiempo extra me pareció edecuado, me hubiese gustado no estar 2 semanas sin respuesta del profe que la verdad me trancó bastante (estoy consciente que debería investigar por mi cuenta, juro que lo hice por muchas horas :-().

Me hubiese gustado mucho entregar una aplicación que anduviera del todo, en el caso de no pasar porque no cumple con parte de los requisitos (estoy muy consciente de eso), puedo seguir haciéndola hasta lograr que funcione.










