Documento de investigaciones realizadas para aplicación Piedra Papel Tijera (juego web)

Empecé con bosquejo de wireframes en papel para ver las diferentes pantallas que podría haber (Landing, Login, Registro, Listado de usuarios, juego, resumen de partida).

No quise hacer los prototipos hasta no estar segura de poder hacer todo como previsto. Lo cual lamentablemente no pude. Me surgieron muchas dudas, siento que lo que había que desarollar era mucho más complejo que la app que hicimos en clase y que hubo cosas que nunca las dimos en clase de esa manera. Estuve por día 1 a 2 horas mínimo, muchas veces todo ese tiempo sin poder escribir ni una línea por no saber por dónde empezar. Pedí clase de apoyo cuando me di cuenta que en muchos casos aún investigando en internet no se me ocurría cómo solucionarlo. En la clase de apoyo dimos muchos conceptos que me ayudaron a entender mejor cómo encarar el proyecto a modo grueso, pero no cómo encarar a nivel de código (que la verdad tuve mil dudas cómo hacer casi todo). Pregunté realmente mucho en la clase de consulta y si bien a modo de concepto me quedó bastante claro cómo deberían hacerse algunas cosas, me surgieron mil dudas después cómo hacerlo a nivel código.
Sumado a esto, perdí mucho tiempo esperando que el profe me responda a dudas (la mayor demora siendo de 2 semanas). Estuve tratando de avanzar con otras cosas mientras tanto, pero me topé con más dudas y estar estancada. Por eso lamento no poder haber terminado. El tiempo dado estuvo bien, el apoyo brindado por el profesor no.

Utilicé como base la aplicación desarrollada en clase (app de Todos). La primera idea fue hacer algo de a cero, pero lo descarté por falta de tiempo y muchas dudas que me surgieron y que no pude resolver a tiempo.

Saqué todo lo que tenía que ver con el MFA ya que no lo iba a usar. No se pedía en la letra y ya el proyecto de clase no me funcionaba 100% el MFA, entonces decidí no usarlo, teniendo en cuenta que es un juego gratuito y no se estaría exponiendo información muy sensible como datos bancarios o similar.

Cambié la página landing para que quede más simple, cambié tema de Bootstrap a Litera en vez de Minty, agregué estilos personalizados, agregué logo e ícono (la app de clase tenía el de React app). Los íconos que usé dentro de la app son de React Icons.

Adapté el esqueleto de nombres y carpetas acorde a lo que iba a utilizar para el juego.

Estuve dando muchas vueltas con el Login que me tiraba error de validación al registrarse, pensé que era el formulario del Frontend pero en la clase de consulta me di cuenta (con ayuda del profe) que era por la validación de Joi del Backend y le saqué el requisisto de alfanumérico a Joi.

Definí los modelos (game, user y dentro del game las choices que serían las jugadas de cada partida). Conecté la base de datos a MongoCloud en vez de usarla local (el Readme de clase no estaba del todo bien y tuve problemas por eso, luego de consultar al profe lo pude conectar).

Entendí que lo que se quiere lograr de flujo se estaría emulando con el seeder básicamente, por eso lo armé primero. Luego de consultar dudas con el profesor, el seeder me funciona pero no me anida los games dentro del mismo modelo (tenía el modelo de los games primero solo como schema (como tenía la app de la clase) y luego lo cambié para que sea un modelo por separado y y así se pueda insertar con el seeder después, pero me dejó de anidar los games adentro del modelo del user). Después de consultarlo varias veces con el profe (supongo que no fui clara en la consulta la primera vez), entendí que deben estar por separados y la idea no es anidar nada a los usuarios.

No me quedó claro cómo referenciar entre un modelo y el otro (cómo sabe Mongoose que me estoy refiriendo al game relacionado a usuario X si no le digo que está relacionado de alguna forma), investigué por la documentación de Mongoose y me topé con el populate, pero después de consultarlo con el profe (y después de 2 semanas sin respuesta y poder avanzar mucho), lo descarté.

Hice un componente de barra de navegación sin los links de "salir" y "Home" para poner en la Landing, Login y Registro. El toggle de la barra de Bootstrap que estaba en el proyecto de clase no funcionaba en modo de pantalla chica (de celular), investigando no le encontré solución haciéndolo con Bootstrap "común", por lo cual cambié las barras de navegación a unas de React Boostrap.
Cambié el formulario de Bootstrap del Login y Registro que teníamos por uno de React Bootstrap.






