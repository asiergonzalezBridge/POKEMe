// ======================
// IMPORTS
// ======================

import { User } from "./models/user.js";
import { getPokemonByType, getPokemonByName } from "./services/api.js";
import {
    getUsers,
    saveUsers,
    setLoggedUser,
    logout as storageLogout,
    getLoggedUser
} from "../infrastructure/storageManager.js";


// ======================
// INIT (al cargar la página)
// ======================

document.addEventListener("DOMContentLoaded", () => {

    const loggedUser = getLoggedUser();

    // Mostrar mensaje de bienvenida si hay usuario logueado
    const message = document.getElementById("message");
    if (loggedUser && message) {
        message.textContent =
            "Bienvenido " + loggedUser.username + " (" + loggedUser.pokeType + ")";
    }

    // ======================
    // EVENTOS
    // ======================

    // LOGOUT
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // LOGIN
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

    // IR A REGISTRO
    const toRegisterBtn = document.getElementById("toRegisterBtn");
    if (toRegisterBtn) {
        toRegisterBtn.addEventListener("click", () => {
            window.location.href = "./pages/auth/auth.html";
        });
    }

    // REGISTER
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", register);
    }

    // VOLVER AL LOGIN
    const backBtn = document.getElementById("back-login");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "../../index.html";
        });
    }

    // Cargar Pokémon aleatorio decorativo
    loadRandomPokemon();
});


// ======================
// LOGOUT
// ======================

function logout() {
    // Elimina usuario de sesión
    storageLogout();

    // Mostrar mensaje
    document.getElementById("message").textContent = "Sesión cerrada";
}


// ======================
// LOGIN
// ======================

function login() {
    // Obtener valores del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Obtener usuarios guardados
    let users = getUsers();

    // Buscar usuario por nombre
    const foundUser = users.find(user => user.username === username);

    // Validar credenciales
    if (foundUser && foundUser.password === password) {

        // Guardar sesión
        setLoggedUser(foundUser);

        // Redirigir al dashboard
        window.location.href = "./pages/dashboard/dashboard.html";

    } else {
        // Mostrar error
        document.getElementById("message").textContent =
            "usuario o contraseña incorrectos";
    }
}


// ======================
// REGISTER
// ======================

async function register() {

    // Obtener valores del formulario
    const newUser = document.getElementById("newUser").value;
    const email = document.getElementById("email").value;
    const newPass = document.getElementById("newPass").value;
    const repeatPass = document.getElementById("repeatPass").value;
    const pokeType = document.getElementById("pokeType").value;

    const message = document.getElementById("message");

    // ======================
    // VALIDACIONES
    // ======================

    // Campos obligatorios
    if (!newUser || !email || !newPass || !repeatPass || !pokeType) {
        message.textContent = "Rellena todos los campos";
        return;
    }

    // Email válido (validación básica)
    if (!email.includes("@") || !email.includes(".")) {
        message.textContent = "Email no válido";
        return;
    }

    // Contraseñas coinciden
    if (newPass !== repeatPass) {
        message.textContent = "Las contraseñas no coinciden";
        return;
    }

    // Obtener usuarios existentes
    let users = getUsers();

    // Comprobar si el usuario ya existe
    const userExists = users.some(u => u.username === newUser.trim());
    if (userExists) {
        message.textContent = "El usuario ya existe";
        return;
    }

    // ======================
    // CREACIÓN DE USUARIO
    // ======================

    const user = new User(
        newUser,
        newPass,
        email,
        pokeType,
        null,
        []
    );

    // ======================
    // AVATAR (desde API)
    // ======================

    const names = await getPokemonByType(pokeType);
    const randomIndex = Math.floor(Math.random() * names.length);

    user.avatar = names[randomIndex];

    // ======================
    // EQUIPO
    // ======================

    user.pokeTeam = getRandomPokemonIds(5);

    // ======================
    // GUARDAR DATOS
    // ======================

    users.push(user);
    saveUsers(users);
    setLoggedUser(user);

    // Redirigir al dashboard
    window.location.href = "../dashboard/dashboard.html";
}


// ======================
// UTILS
// ======================

// Genera IDs únicos de Pokémon aleatorios
function getRandomPokemonIds(count) {
    const ids = new Set();

    while (ids.size < count) {
        const randomId = Math.floor(Math.random() * 151) + 1;
        ids.add(randomId);
    }

    return Array.from(ids);
}


// ======================
// UI DECORATIVA
// ======================

// Muestra un Pokémon aleatorio en pantalla
async function loadRandomPokemon() {
    const img = document.getElementById("pokemon-image");
    if (!img) return;

    const randomId = Math.floor(Math.random() * 151) + 1;

    const pokemon = await getPokemonByName(randomId);
    if (!pokemon) return;

    img.src = pokemon.sprites.front_default;
}