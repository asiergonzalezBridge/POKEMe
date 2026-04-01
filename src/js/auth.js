import { User } from "./models/user.js";


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


function register() {
    const newUser=document.getElementById("newUser").value;
    const newPass=document.getElementById("newPass").value;
    const pokeType = document.getElementById("pokeType").value;

       if (newUser === "" || newPass === "" || pokeType === "") {
    document.getElementById("message").textContent = "Rellena todos los campos";
    return;
    }
     // Obtener usuarios existentes o array vacío
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Crear nuevo usuario
    const user = new User(newUser, newPass, pokeType);

    // Añadir al array
    users.push(user);

    // Guardar array
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("loggedUser", JSON.stringify(user));
    
    window.location.href = "../profile/profile.html";

    }