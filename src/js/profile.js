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

// ======================
// UTILIDADES
// ======================

function getUserOrRedirect() {
  const user = getLoggedUser();

  if (!user) {
    window.location.href = "../../../index.html";
    return null;
  }

  return user;
}

// ======================
// RENDER
// ======================

function renderUsername(user) {
  document.getElementById("username-display").textContent = user.username;
}

async function renderAvatar(user) {
  const container = document.getElementById("initial-avatar");
  if (!container) return;
  if (!user.avatar) return;

  const pokemon = await getPokemonByName(user.avatar);
  if (!pokemon) return;

  container.innerHTML = `
    <div class="avatar-pokemon">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    </div>
  `;
}

function renderTypeStats(team) {
  const container = document.getElementById("type-stats");
  if (!container) return;

  container.innerHTML = "";

  const counts = {};

  team.forEach(p => {
    const type = p.types[0].type.name;
    counts[type] = (counts[type] || 0) + 1;
  });

  const max = Math.max(...Object.values(counts));

  for (let type in counts) {
    const value = counts[type];
    const percentage = (value / max) * 100;

    const row = document.createElement("div");
    row.classList.add("stat-row");

    row.innerHTML = `
      <div class="stat-label">
        <span>${type}</span>
        <span>${value}</span>
      </div>
      <div class="bar">
        <div class="bar-fill ${type}" style="width: ${percentage}%"></div>
      </div>
    `;

    container.appendChild(row);
  }
}

function renderTeamStats(team) {
  const container = document.getElementById("team-stats");
  if (!container) return;

  container.innerHTML = "";

  const totals = {
    hp: 0,
    attack: 0,
    defense: 0
  };

  team.forEach(p => {
    totals.hp += p.stats.find(s => s.stat.name === "hp").base_stat;
    totals.attack += p.stats.find(s => s.stat.name === "attack").base_stat;
    totals.defense += p.stats.find(s => s.stat.name === "defense").base_stat;
  });

  const avg = {
    hp: Math.round(totals.hp / team.length),
    attack: Math.round(totals.attack / team.length),
    defense: Math.round(totals.defense / team.length)
  };

  for (let stat in avg) {
    const value = avg[stat];
    const percentage = (value / 150) * 100;

    const row = document.createElement("div");
    row.classList.add("stat-row");

    row.innerHTML = `
      <div class="stat-label">
        <span>${stat.toUpperCase()}</span>
        <span>${value}</span>
      </div>
      <div class="bar">
        <div class="bar-fill stat" style="width: ${percentage}%"></div>
      </div>
    `;

    container.appendChild(row);
  }
}

async function renderUser(user) {
  renderUsername(user);
  await renderAvatar(user);

  const teamPokemons = await Promise.all(
    user.pokeTeam.map(id => getPokemonByName(id))
  );

  renderTypeStats(teamPokemons);
  renderTeamStats(teamPokemons);
}

// ======================
// EDIT USERNAME
// ======================

function initEditUsername() {
  const editBtn = document.getElementById("edit-username");
  const saveBtn = document.getElementById("save-username");
  const editBox = document.getElementById("edit-box");
  const message = document.getElementById("message");

  if (!editBtn || !saveBtn) return;

  editBtn.addEventListener("click", () => {
    editBox.classList.toggle("hidden");
  });

  saveBtn.addEventListener("click", () => {
    const user = getUserOrRedirect();
    if (!user) return;

    const input = document.getElementById("new-username");
    const newUsername = input.value.trim();

    message.textContent = "";

    if (!newUsername) {
      message.textContent = "Nombre vacío";
      return;
    }

    const users = getUsers();

    const exists = users.some(
      u =>
        u.username.toLowerCase() === newUsername.toLowerCase() &&
        u.id !== user.id
    );

    if (exists) {
      message.textContent = "Nombre en uso";
      return;
    }

    user.username = newUsername;
    syncUser(user);

    renderUsername(user);

    message.textContent = "✔ actualizado";
    editBox.classList.add("hidden");
    input.value = "";
  });
}

// ======================
// INIT
// ======================

async function initProfile() {
  const user = getUserOrRedirect();
  if (!user) return;

  initEditUsername();
  await renderUser(user);

  // DEBUG (esto sobra en producción)
  const teamPokemons = await Promise.all(
    user.pokeTeam.map(id => getPokemonByName(id))
  );

  console.log("TEAM:", teamPokemons);


}
