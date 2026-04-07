import { getLoggedUser, syncUser, getUsers } from "../infrastructure/storageManager.js";
import { getPokemonByName } from "../js/services/api.js";
import { initButtons } from "../components/buttons/buttons.js";
import { renderHeader } from "../components/header/header.js";
import { renderFooter } from "../components/footer/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("profile");
  renderFooter();

  initProfile();

  const backBtn = document.getElementById("back-dashboard");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "../dashboard/dashboard.html";
    });
  }
});
// Usuario seguro
function getUserOrRedirect() {
  const user = getLoggedUser();
  if (!user) {
    window.location.href = "../index.html";
    return null;
  }
  return user;
}

// Username
function renderUsername(user) {
  document.getElementById("username-display").textContent = user.username;
}

// Avatar inicial
function renderInitial(username) {
  const container = document.getElementById("initial-avatar");

  const initial = username.charAt(0).toUpperCase();

  container.innerHTML = `
    <div class="avatar-circle">${initial}</div>
  `;
}

// Stats equipo
function renderStats(team) {
  const container = document.getElementById("team-stats");
  container.innerHTML = "";

  const stats = {};

  team.forEach(p => {
    const type = p.types[0].type.name;
    stats[type] = (stats[type] || 0) + 1;
  });

  for (let type in stats) {
    const div = document.createElement("div");
    div.textContent = `${type}: ${stats[type]}`;
    container.appendChild(div);
  }
}

// Render completo
async function renderUser(user) {
  renderUsername(user);
  renderInitial(user.username);

  const teamPokemons = await Promise.all(
    user.pokeTeam.map(id => getPokemonByName(id))
  );

  renderStats(teamPokemons);
}

// Cambiar username (CON VALIDACIÓN)
function initChangeUsername() {
  const btn = document.getElementById("change-username");
  const message = document.getElementById("message");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const user = getUserOrRedirect();
    if (!user) return;

    const input = document.getElementById("new-username");
    const newUsername = input.value.trim();

    message.textContent = "";

    if (!newUsername) {
      message.textContent = "El nombre no puede estar vacío";
      return;
    }

    const users = getUsers();

    const exists = users.some(
      u =>
        u.username.toLowerCase() === newUsername.toLowerCase() &&
        u.id !== user.id
    );

    if (exists) {
      message.textContent = "Ese nombre ya está en uso";
      return;
    }

    user.username = newUsername;
    syncUser(user);

    renderUser(user);

    message.textContent = "Nombre actualizado ✔";
    input.value = "";
  });
}

// INIT
async function initProfile() {
  const user = getUserOrRedirect();
  if (!user) return;

  await renderUser(user);
  initChangeUsername();
}

document.getElementById("back-dashboard").addEventListener("click", () => {
  window.location.href = "../dashboard/dashboard.html";
});



