# 🧩 POKEMe

## 📌 Descripción

**POKEMe** es una aplicación web frontend desarrollada en JavaScript que permite a los usuarios crear su propio equipo Pokémon personalizado.

El usuario comienza seleccionando un tipo de Pokémon, lo que genera un avatar aleatorio basado en ese tipo. A partir de ahí, puede buscar Pokémon mediante una API externa, filtrarlos y añadirlos a su equipo personal, el cual se guarda en el navegador usando `localStorage`.

---

## 🎯 Objetivo del proyecto

Aplicar conceptos clave de desarrollo frontend:

* Programación Orientada a Objetos (POO)
* Manipulación dinámica del DOM
* Consumo de APIs externas
* Gestión de datos en el navegador (localStorage)

---

## ⚙️ Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* API externa: [PokéAPI](https://pokeapi.co/)
* LocalStorage

---

## 🚀 Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/pokeme.git
```

2. Accede al proyecto:

```bash
cd pokeme
```

3. Abre el archivo `index.html` en tu navegador:

```bash
start index.html
```

*(o doble clic directamente sobre el archivo)*

---

## 🧠 Funcionamiento de la aplicación

### 🔐 Registro (simulado)

* El usuario selecciona un tipo de Pokémon (fuego, agua, planta…)
* Se genera un avatar aleatorio de ese tipo
* Los datos se guardan en `localStorage`

---

### 🔎 Búsqueda y filtrado

* Búsqueda de Pokémon por nombre
* Filtrado por tipo
* Datos obtenidos desde PokéAPI mediante `fetch`

---

### 🧑‍🤝‍🧑 Gestión del equipo

* Añadir Pokémon al equipo
* Eliminar Pokémon
* Límite de equipo (máx. 6 Pokémon)
* Persistencia mediante `localStorage`

---

### 👤 Perfil

* Visualización del avatar
* Posibilidad de cambiar avatar (mismo tipo)

---

### 🎮 Minijuegos (opcional)

* Piedra, papel o tijera (tipo Pokémon: fuego, agua, planta)
* Juego de adivinación (tipo “bola mágica”)

---

## 🔄 Flujo de usuario

### Caso 1: Nuevo usuario

1. Accede a la aplicación
2. Selecciona tipo de Pokémon
3. Se genera avatar aleatorio
4. Accede al dashboard
5. Busca y añade Pokémon a su equipo

---

### Caso 2: Usuario existente

1. Accede a la aplicación
2. Se carga su equipo desde `localStorage`
3. Puede gestionar su equipo o cambiar avatar

---

## 🧱 Estructura del proyecto

```
src/
│
├── app.js
├── assets/
├── components/
├── infrastructure/
├── models/
├── pages/
├── services/
└── styles/
```

---

## 🧩 Arquitectura

La aplicación sigue una arquitectura modular:

* **models/** → Clases (POO)
* **services/** → Lógica de APIs
* **components/** → Elementos UI reutilizables
* **pages/** → Vistas de la aplicación
* **infrastructure/** → Gestión de almacenamiento (localStorage)
* **app.js** → Controlador principal

---

## 💾 Persistencia de datos

Se utiliza `localStorage` para:

* Guardar usuario
* Guardar equipo Pokémon

---

## 📊 Funcionalidades principales

* Registro de usuario (simulado)
* Generación de avatar aleatorio
* Búsqueda de Pokémon
* Filtros por tipo
* Gestión de equipo
* Persistencia de datos
* Interfaz dinámica sin recarga de página

---

## 🔮 Mejoras futuras

* Combates Pokémon
* Sistema de medallas
* Exportación de equipo
* Modo oscuro 🌙
* Más minijuegos

---

## 👨‍💻 Autor

Proyecto desarrollado como práctica individual del módulo de desarrollo web.

---

## 📄 Licencia

Uso educativo.
