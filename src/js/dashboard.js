import { getPokemonByType, getPokemonByName } from "./services/api.js";
import { createCard } from "../components/cards/createCard.js";
import { getLoggedUser, syncUser, logout as storageLogout } from "../infrastructure/storageManager.js";
import { initButtons } from "../components/buttons/buttons.js";
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
  renderStats(teamPokemons);
}

loadProfile();
async function loadUserPokemon() {
 const user = getLoggedUser();
  if (!user) return;

  const type = user.pokeType;

  const names = await getPokemonByType(type);

  // elegir uno aleatorio
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomName = names[randomIndex];

  console.log("Pokemon elegido:", randomName);

  // solo uno
  const pokemon = await getPokemonByName(randomName);

  renderPokemon(pokemon);
  
  syncUser(user);
}
function renderPokemon(pokemon) {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = "";

  const card = createCard({
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    type: pokemon.types[0].type.name
  });

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

    const card = createCard({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      type: pokemon.types[0].type.name
    });

    container.appendChild(card);
  });
}
function renderStats(team) {
  const container = document.getElementById("stats");
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
loadProfile();

initButtons({
  renderAvatar: renderPokemon,
  renderTeam: renderExtraPokemons,
  renderStats: renderStats,
  generateRandomTeam: () => getRandomPokemonIds(5)
});
