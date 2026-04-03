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
    const newPass = document.getElementById("newPass").value;
    const pokeType = document.getElementById("pokeType").value;

    if (newUser === "" || newPass === "" || pokeType === "") {
        document.getElementById("message").textContent = "Rellena todos los campos";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Crear usuario
    const user = new User(newUser, newPass, pokeType);

    // 🔥 GENERAR AVATAR
    const names = await getPokemonByType(pokeType);
    const randomIndex = Math.floor(Math.random() * names.length);
    user.avatar = names[randomIndex];

    // 🔥 GENERAR EQUIPO
    user.pokeTeam = getRandomPokemonIds(5);

    // Guardar en users
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Guardar sesión
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