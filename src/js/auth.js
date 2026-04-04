import { User } from "./models/user.js";
import { getPokemonByType } from "./services/api.js";

document.addEventListener("DOMContentLoaded", () => {

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    const message = document.getElementById("message");
    if (loggedUser && message) {
        message.textContent =
            "Bienvenido " + loggedUser.username + " (" + loggedUser.pokeType + ")";
    }

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
    // TO REGISTER
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

});

function logout() {
    localStorage.removeItem("loggedUser");
    document.getElementById("message").textContent = "Sesión cerrada";
}

function login() {
    const username = document.getElementById("username").value;
    const password= document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar usuario
    const foundUser = users.find(user => user.username === username);

    if (foundUser && foundUser.password === password) {
        localStorage.setItem("loggedUser", JSON.stringify(foundUser));
        window.location.href = "./pages/profile/profile.html";
    } else {
        document.getElementById("message").textContent = "Invalid username or password.";
    }
}


async function register() {
    const newUser = document.getElementById("newUser").value;
    const email = document.getElementById("email").value;
    const newPass = document.getElementById("newPass").value;
    const repeatPass = document.getElementById("repeatPass").value;
    const pokeType = document.getElementById("pokeType").value;

    const message = document.getElementById("message");

    // VALIDACIONES

    if (!newUser || !email || !newPass || !repeatPass || !pokeType) {
        message.textContent = "Rellena todos los campos";
        return;
    }

    // Email válido (simple)
    if (!email.includes("@") || !email.includes(".")) {
        message.textContent = "Email no válido";
        return;
    }

    // Contraseñas iguales
    if (newPass !== repeatPass) {
        message.textContent = "Las contraseñas no coinciden";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Usuario ya existe
    const userExists = users.some(u => u.username === newUser);
    if (userExists) {
        message.textContent = "El usuario ya existe";
        return;
    }

    // Crear usuario
    const user = new User(
    newUser,
    newPass,
    email,
    pokeType,
    null,
    []
    );

    // Avatar
    const names = await getPokemonByType(pokeType);
    const randomIndex = Math.floor(Math.random() * names.length);
    user.avatar = names[randomIndex];

    // 🔥 Equipo
    user.pokeTeam = getRandomPokemonIds(5);

    // Guardar
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedUser", JSON.stringify(user));

    window.location.href = "../profile/profile.html";
}

function getRandomPokemonIds(count) {
    const ids = new Set();

    while (ids.size < count) {
        const randomId = Math.floor(Math.random() * 151) + 1;
        ids.add(randomId);
    }

    return Array.from(ids);
}