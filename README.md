# 🧩 POKEMe

## 📌 Descripción

POKEMe es una aplicación web interactiva desarrollada en JavaScript que permite a los usuarios registrarse, iniciar sesión y gestionar su perfil Pokémon,ademas de incluir diferentes minijuegos.
Cada usuario puede tener un Pokémon inicial basado en su tipo favorito y crear su propio equipo utilizando datos obtenidos desde una API externa.

---

## 🚀 Funcionalidades principales

* 🔐 Registro e inicio de sesión (simulado con localStorage)
* 👤 Perfil de usuario con:

  * Pokémon inicial
  * Equipo personalizado
* 🔄 Cambio de avatar y equipo dinámicamente
* 🌐 Consumo de API (PokeAPI)
* 🎨 Interfaz dinámica y responsive
* 💾 Persistencia de datos en localStorage
* ⚠️ Validación de formularios (email, contraseña, errores)

---

## 🛠️ Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (ES Modules)
* API externa: PokeAPI
* LocalStorage
* Git / GitHub

---

## 📦 Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/asiergonzalezBridge/POKEMe.git
```

2. Entrar en la carpeta del proyecto:

```bash
cd POKEMe
```

3. Abrir con Live Server o similar:

* VSCode → botón derecho → "Open with Live Server"

---

## 📱 Uso de la aplicación

1. Registrarse con:

   * Usuario
   * Email válido
   * Contraseña
   * Tipo Pokémon

2. Iniciar sesión

3. Acceder al perfil:

   * Ver tu Pokémon inicial
   * Cambiar avatar
   * Crear equipo

---

## 📂 Estructura del proyecto

```
POKEMe/
│
├── index.html
├── src/
│   ├── js/
│   │   ├── services/ (API)
│   │   ├── models/ (User)
│   │   ├── pages/ (auth, profile)
│   │   ├── components/
│   │
│   ├── styles/
│
├── assets/
└── README.md
```

---

## ⚙️ Mejoras futuras

* Autenticación real con backend
* Guardado en base de datos
* Modo oscuro
* Combates Pokémon
* Ranking de usuarios

---

## 👨‍💻 Autor

* Asier González

---
