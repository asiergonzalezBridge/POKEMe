import { getPokemonByType, getPokemonByName } from "./services/api.js";
import { createCard } from "../components/cards/card.js";

async function loadUserPokemon() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) return;

  const type = user.pokeType;

  const names = await getPokemonByType(type);

  // 🎲 elegir uno aleatorio
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomName = names[randomIndex];

  console.log("Pokemon elegido:", randomName);

  // 🔥 solo uno
  const pokemon = await getPokemonByName(randomName);

  renderPokemon(pokemon);
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
async function loadUserPokemons() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) return;

  const type = user.pokeType;

  console.log("Tipo usuario:", type);

  const names = await getPokemonByType(type);

  const pokemons = await Promise.all(
    names.map(name => getPokemonByName(name))
  );

  renderPokemons(pokemons);
}

function renderPokemons(pokemons) {
  const container = document.getElementById("pokemon-container");
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
loadUserPokemon();
loadUserPokemons();


let avatar = localStorage.getItem("avatarPokemon");

if (!avatar) {
  const randomIndex = Math.floor(Math.random() * names.length);
  avatar = names[randomIndex];
  localStorage.setItem("avatarPokemon", avatar);
}

const pokemon = await getPokemonByName(avatar);




