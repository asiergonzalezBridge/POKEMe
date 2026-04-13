---DIAGRAMA GENERAL DEL SISTEMA---

[Inicio]
   ↓
[Cargar aplicación]
   ↓
[¿Existe loggedUser en localStorage?]
   ↓                 ↓
  [NO]              [SÍ]
   ↓                 ↓
[Pantalla Login]   [Ir a perfil]
   ↓                 ↓
[¿Tiene cuenta?]     ↓
 ↓          ↓        ↓
[NO]       [SÍ]   [Cargar datos usuario]
 ↓          ↓        ↓
[Registro]  ↓     [¿Tiene avatar?]
 ↓          ↓      ↓         ↓
[Validar datos]   [NO]      [SÍ]
 ↓                ↓          ↓
[Guardar usuario] [Generar avatar desde API]
 ↓                ↓
[Volver a login]  ↓
        ↓         ↓
     [Login correcto]
             ↓
      [Guardar loggedUser]
             ↓
          [Perfil]


---DIAGRAMA DETALLADO DE LOGIN---

[Formulario login]
   ↓
[Introducir usuario + contraseña]
   ↓
[Buscar en localStorage]
   ↓
[¿Usuario existe?]
   ↓           ↓
  [NO]        [SÍ]
   ↓           ↓
[Error]   [¿Contraseña correcta?]
               ↓        ↓
             [NO]      [SÍ]
              ↓         ↓
        [Error login] [Guardar sesión]
                         ↓
                    [Ir a perfil]

---DIAGRAMA DE PERFIL Y EQUIPO---

[Perfil]
   ↓
[Mostrar avatar]
   ↓
[Mostrar equipo]
   ↓
[¿Acción del usuario?]
   ↓        ↓          ↓
[Avatar] [Equipo]   [Nada]
   ↓        ↓          ↓
[Cambiar] [Cambiar]   ↓
   ↓        ↓          ↓
[Llamada API]  [Llamada API]
   ↓        ↓
[Nuevo Pokémon] [Nuevo equipo]
   ↓        ↓
[Guardar en localStorage]
   ↓
[Re-renderizar DOM]
   ↓
[Perfil actualizado]

---DIAGRAMA DE PERSISTENCIA---

[Usuario realiza acción]
   ↓
[Actualizar objeto user]
   ↓
[Convertir a JSON]
   ↓
[Guardar en localStorage]
   ↓
[Recargar datos]
   ↓
[Mostrar cambios en UI]

---DIAGRAMA COMPLETO---

[Inicio]
   ↓
[Cargar app]
   ↓
[¿Usuario logueado?]
   ↓              ↓
 [NO]            [SÍ]
   ↓              ↓
[Login]       [Perfil]
   ↓              ↓
[Validar]     [Cargar datos]
   ↓              ↓
[Guardar sesión]  ↓
   ↓              ↓
      →→→→→→→→→→→→
             ↓
        [Dashboard / Perfil]
             ↓
   [Mostrar avatar + equipo]
             ↓
   [¿Acción usuario?]
   ↓        ↓         ↓
[Buscar] [Cambiar] [Logout]
   ↓        ↓         ↓
[API]   [API]     [Borrar sesión]
   ↓        ↓         ↓
[Resultados] [Actualizar datos]
   ↓        ↓
[Render UI] [Guardar localStorage]
             ↓
        [Actualizar UI]
             ↓
            [Fin]
