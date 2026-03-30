import { User } from "./models/user.js";

document.addEventListener("DOMContentLoaded", () => {

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (loggedUser) {
        document.getElementById("message").textContent =
            "Bienvenido " + loggedUser.username + " (" + loggedUser.pokeType + ")";
    }

    document.getElementById("logoutBtn").addEventListener("click", logout);
});

function logout() {
    localStorage.removeItem("loggedUser");
    document.getElementById("message").textContent = "Sesión cerrada";
}


document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('registerBtn').addEventListener('click', register);

function login() {
    const username = document.getElementById("username").value;
    const password= document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔹 Buscar usuario
    const foundUser = users.find(user => user.username === username);

    if (foundUser && foundUser.password === password) {
        localStorage.setItem("loggedUser", JSON.stringify(foundUser));
        document.getElementById("message").textContent = "Login successful!";
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
     // 🔹 Obtener usuarios existentes o array vacío
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔹 Crear nuevo usuario
    const user = new User(newUser, newPass, pokeType);

    // 🔹 Añadir al array
    users.push(user);

    // 🔹 Guardar array
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("user", JSON.stringify(user));
    
    document.getElementById("message").textContent = "Usuario registrado correctamente";

    }