import { getPokemonByType, getPokemonByName } from "./services/api.js";
import { createCard } from "../components/cards/card.js";
const user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
  window.location.href = "../../index.html";
}
async function loadProfile() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) return;

  // Avatar
  if (!user.avatar) {
    const names = await getPokemonByType(user.pokeType);
    const randomIndex = Math.floor(Math.random() * names.length);
    user.avatar = names[randomIndex];
  }

  // Equipo
  if (!user.pokeTeam || user.pokeTeam.length === 0) {
    user.pokeTeam = getRandomPokemonIds(5);
  }

  // Guardar loggedUser
localStorage.setItem("loggedUser", JSON.stringify(user));

//  ACTUALIZAR USERS
let users = JSON.parse(localStorage.getItem("users")) || [];

users = users.map(u => 
  u.username === user.username ? user : u
);

localStorage.setItem("users", JSON.stringify(users));
  //  Render avatar
  const avatarPokemon = await getPokemonByName(user.avatar);
  renderPokemon(avatarPokemon);

  // Render equipo
  const teamPokemons = await Promise.all(
    user.pokeTeam.map(id => getPokemonByName(id))
  );

  renderExtraPokemons(teamPokemons);
  console.log("USER FINAL:", user);
}

loadProfile();
async function loadUserPokemon() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
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
  // Guardar loggedUser
localStorage.setItem("loggedUser", JSON.stringify(user));

//  ACTUALIZAR USERS
let users = JSON.parse(localStorage.getItem("users")) || [];

users = users.map(u => 
  u.username === user.username ? user : u
);

localStorage.setItem("users", JSON.stringify(users));
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
const changeTeamBtn = document.getElementById("change-team");

if (changeTeamBtn) {
  changeTeamBtn.addEventListener("click", async () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) return;

    // nuevo equipo
    user.pokeTeam = getRandomPokemonIds(5);

    // guardar loggedUser
    localStorage.setItem("loggedUser", JSON.stringify(user));

    // 🔥 ACTUALIZAR USERS (FALTABA ESTO)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u =>
      u.username === user.username ? user : u
    );

    localStorage.setItem("users", JSON.stringify(users));

    // renderizar
    const teamPokemons = await Promise.all(
      user.pokeTeam.map(id => getPokemonByName(id))
    );

    renderExtraPokemons(teamPokemons);
  });
}
document.getElementById("change-avatar").addEventListener("click", async () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) return;

  const names = await getPokemonByType(user.pokeType);

  const randomIndex = Math.floor(Math.random() * names.length);
  user.avatar = names[randomIndex];

  // guardar
  localStorage.setItem("loggedUser", JSON.stringify(user));

  // renderizar
  const avatarPokemon = await getPokemonByName(user.avatar);
  renderPokemon(avatarPokemon);

  // después de cambiar user.avatar

localStorage.setItem("loggedUser", JSON.stringify(user));

let users = JSON.parse(localStorage.getItem("users")) || [];

users = users.map(u => 
  u.username === user.username ? user : u
);

localStorage.setItem("users", JSON.stringify(users));
});

//logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "../../index.html";
});

loadProfile();



