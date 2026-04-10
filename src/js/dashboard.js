import { getPokemonByType, getPokemonByName } from "./services/api.js";
import { createCard } from "../components/cards/createCard.js";
import { getLoggedUser, syncUser } from "../infrastructure/storageManager.js";
import { initButtons } from "../components/buttons/buttons.js";
import { renderHeader } from "../components/header/header.js";
import { renderFooter } from "../components/footer/footer.js";

// ======================
// INIT
// ======================

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("dashboard");
  renderFooter();

  loadProfile();

  initButtons({
    renderAvatar: renderPokemon,
    renderTeam: renderExtraPokemons,
    generateRandomTeam: () => getRandomPokemonIds(5)
  });

  playPoketypes();
  initOracle();

  const askBtn = document.getElementById("ask-btn");
  if (askBtn) {
    askBtn.addEventListener("click", handleOracle);
  }
});

// ======================
// AUTH
// ======================

const user = getLoggedUser();
if (!user) {
  window.location.href = "../../index.html";
}

// ======================
// PROFILE
// ======================

async function loadProfile() {
  const user = getLoggedUser();
  if (!user) return;

  // Avatar
  if (!user.avatar) {
    if (!user.pokeType) return;
    const randomIndex = Math.floor(Math.random() * names.length);

    if (!names[randomIndex]?.pokemon) return;

    user.avatar = names[randomIndex].pokemon.name;
  }

  // Equipo
  if (!user.pokeTeam || user.pokeTeam.length === 0) {
    user.pokeTeam = getRandomPokemonIds(5);
  }

  syncUser(user);

  // Render avatar
  if (!user.avatar || typeof user.avatar !== "string") {
    console.error("Avatar inválido:", user.avatar);
    return;
  }

  const avatarPokemon = await getPokemonByName(user.avatar);
  if (!avatarPokemon) return;

  renderPokemon(avatarPokemon);

  // Render equipo
  const teamPokemons = await Promise.all(
    user.pokeTeam.map(id => getPokemonByName(id))
  );

  renderExtraPokemons(teamPokemons);
}

// ======================
// RENDER
// ======================

function renderPokemon(pokemon) {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = "";

  const card = createCard(pokemon);
  container.appendChild(card);
}

function renderExtraPokemons(pokemons) {
  const container = document.getElementById("extra-pokemons");
  container.innerHTML = "";

  pokemons.forEach(pokemon => {
    if (!pokemon) return;

    const card = createCard(pokemon);
    container.appendChild(card);
  });
}

// ======================
// UTILS
// ======================

function getRandomPokemonIds(count) {
  const ids = new Set();

  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * 151) + 1;
    ids.add(randomId);
  }

  return Array.from(ids);
}

// ======================
// GAME
// ======================

function playPoketypes() {
  const types = [
    "normal", "fire", "water", "electric", "grass", "ice",
    "fighting", "poison", "ground", "flying", "psychic",
    "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ];

  const rules = {
  normal: ["ghost"],

  fire: ["grass", "ice", "bug", "steel"],
  water: ["fire", "ground", "rock"],
  electric: ["water", "flying"],
  grass: ["water", "ground", "rock"],
  ice: ["grass", "ground", "flying", "dragon"],

  fighting: ["normal", "rock", "ice", "dark", "steel"],
  poison: ["grass", "fairy"],
  ground: ["fire", "electric", "poison", "rock", "steel"],
  flying: ["grass", "fighting", "bug"],

  psychic: ["fighting", "poison"],
  bug: ["grass", "psychic", "dark"],
  rock: ["fire", "ice", "flying", "bug"],
  ghost: ["psychic", "ghost"],

  dragon: ["dragon"],
  dark: ["psychic", "ghost"],
  steel: ["ice", "rock", "fairy"],
  fairy: ["fighting", "dragon", "dark"]
};
  let enemyType = "";
  let streak = 0;

  function generateEnemy() {
    enemyType = types[Math.floor(Math.random() * types.length)];

    const container = document.getElementById("enemy-display");

    container.innerHTML = `
      <div class="enemy-type ${enemyType}">
        <img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${enemyType}.svg" class="type-icon">
        <span>${enemyType}</span>
      </div>
    `;
  }

  function renderButtons() {
    const container = document.getElementById("type-buttons");
    container.innerHTML = ""; // importante

    types.forEach(type => {
      const btn = document.createElement("button");

      btn.innerHTML = `
        <img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg" class="type-icon">
        <span>${type}</span>
      `;

      btn.classList.add("pokegame-btn", type);
      btn.addEventListener("click", () => checkAnswer(type));

      container.appendChild(btn);
    });
  }

  function checkAnswer(playerType) {
    const result = document.getElementById("result");
    const streakDisplay = document.getElementById("streak");

    if (rules[playerType]?.includes(enemyType)) {
      streak++;
      result.textContent = "✔ Correcto!";
      result.style.color = "green";

      setTimeout(() => {
        generateEnemy();
        result.textContent = "";
      }, 800);
    } else {
      streak = 0;
      result.textContent = "❌ Incorrecto";
      result.style.color = "red";
    }

    streakDisplay.textContent = `Racha: ${streak}`;
    streakDisplay.style.color = streak >= 5 ? "gold" : "black";
  }

  generateEnemy();
  renderButtons();
}

// ======================
// ORACLE
// ======================

function initOracle() {
  // solo inicialización si quieres expandir luego
}

function handleOracle() {
  const input = document.getElementById("question");
  const answerBox = document.getElementById("answer");
  const question = input.value.trim();
  if (!question) {
    answerBox.textContent = "Haz una pregunta primero";
    return;
  }

  answerBox.textContent = getOracleAnswer();
   input.value = "";
}

function getOracleAnswer() {
  const answers = [
    "Las energías están en movimiento...",
    "No todo es lo que parece...",
    "El destino aún no ha decidido...",
    "El tiempo revelará lo oculto...",
    "Las estrellas se alinean...",
    "No es el momento adecuado..."
  ];

  return answers[Math.floor(Math.random() * answers.length)];
}