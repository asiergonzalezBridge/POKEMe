import { getPokemonByType, getPokemonByName } from "./services/api.js";
import { createCard } from "../components/cards/createCard.js";
import { getLoggedUser, syncUser, logout as storageLogout } from "../infrastructure/storageManager.js";
import { initButtons } from "../components/buttons/buttons.js";
import { renderHeader } from "../components/header/header.js";
import { renderFooter } from "../components/footer/footer.js";

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
  oracle();
    document.getElementById("ask-btn").addEventListener("click", () => {
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answer");

  if (!question) {
    answerBox.textContent = "Haz una pregunta primero";
    return;
  }

  answerBox.textContent = oracle();
});
});
const user = getLoggedUser();

if (!user) {
  window.location.href = "../../index.html";
}
async function loadProfile() {
 const user = getLoggedUser();
  if (!user) return;

  // Avatar
  if (!user.avatar) {
    const names = await getPokemonByType(user.pokeType);
    const randomIndex = Math.floor(Math.random() * names.length);
    if (!names[randomIndex] || !names[randomIndex].pokemon) return;

    user.avatar = names[randomIndex].pokemon.name;
  }

  // Equipo
  if (!user.pokeTeam || user.pokeTeam.length === 0) {
    user.pokeTeam = getRandomPokemonIds(5);
  }
  syncUser(user);
  
  //  Render avatar
  if (!user.avatar || typeof user.avatar !== "string") {
  console.error("Avatar inválido:", user.avatar);
  return;
}

const avatarPokemon = await getPokemonByName(user.avatar);

if (!avatarPokemon) {
  console.error("Pokemon no encontrado:", user.avatar);
  return;
}

renderPokemon(avatarPokemon);

  // Render equipo
  const teamPokemons = await Promise.all(
    user.pokeTeam.map(id => getPokemonByName(id))
  );

  renderExtraPokemons(teamPokemons);
  console.log("USER FINAL:", user);

}
function renderPokemon(pokemon) {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = "";

  const card = createCard(pokemon);
  container.appendChild(card);
}
function getRandomPokemonIds(count) {
  const ids = new Set();

  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * 151) + 1;
    ids.add(randomId);
  }

  return Array.from(ids);
}
async function loadExtraPokemons() {
  const ids = getRandomPokemonIds(5);

  console.log("IDs random:", ids);

  const pokemons = await Promise.all(
    ids.map(id => getPokemonByName(id))
  );

  renderExtraPokemons(pokemons);
}

function renderExtraPokemons(pokemons) {
  const container = document.getElementById("extra-pokemons");
  container.innerHTML = "";

      pokemons.forEach(pokemon => {
      if (!pokemon) return;

      const card = createCard(pokemon); // ✅

      container.appendChild(card);
    });
    }
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
};
function renderButtons() {
  const container = document.getElementById("type-buttons");

  types.forEach(type => {
    const btn = document.createElement("button");
   btn.innerHTML = `
  <img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg" class="type-icon">
  <span>${type}</span>
`;
    btn.classList.add("poke-btn", type);

    btn.addEventListener("click", () => checkAnswer(type));

    container.appendChild(btn);
  });
};
  function fight(type1, type2) {
  if (type1 === type2) {
    return { winner: null, message: "Empate" };
  }
  if (rules[type1]?.includes(type2)) {
    return { winner: 1, message: `${type1} gana a ${type2}` };
  }
  if (rules[type2]?.includes(type1)) {
    return { winner: 2, message: `${type2} gana a ${type1}` };
  }
  return { winner: null, message: "No es muy efectivo" };
  }
function checkAnswer(playerType) {
  const result = document.getElementById("result");
  const streakDisplay = document.getElementById("streak");

  if (rules[playerType]?.includes(enemyType)) {
    streak++; // 🔥 suma racha

    result.textContent = "✔ Correcto!";
    result.style.color = "green";

    streakDisplay.textContent = `Racha: ${streak}`;

    setTimeout(() => {
      generateEnemy();
      result.textContent = "";
    }, 800);

  } else {
    streak = 0; // 💣 reset

    result.textContent = "❌ Incorrecto";
    result.style.color = "red";

    streakDisplay.textContent = `Racha: ${streak}`;
  }
  if (streak >= 5) {
  streakDisplay.style.color = "gold";
} else {
  streakDisplay.style.color = "black";
}
}
generateEnemy();
renderButtons();}

function oracle() {
  const answers = [
  "Las energías están en movimiento... observa con atención.",
  "No todo es lo que parece, espera antes de actuar.",
  "El destino aún no ha decidido su camino.",
  "Hay señales, pero requieren interpretación.",
  "Lo que buscas está más cerca de lo que crees... o no.",
  "El tiempo revelará lo que ahora permanece oculto.",
  "Las respuestas están dentro de ti, no fuera.",
  "Algo cambia en silencio, pronto lo notarás.",
  "Las estrellas se alinean a tu favor ",
  "El camino se cierra en esta ocasión...",
  "No es el momento adecuado para saberlo.",
  "Las fuerzas no son claras... vuelve a preguntar más tarde."
];

  function getAnswer() {
    return answers[Math.floor(Math.random() * answers.length)];
  }

  return getAnswer(); 

}
