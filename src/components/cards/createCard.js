import { PokemonCard } from "./PokemonCard.js";

export function createCard(pokemon) {
  const attack = pokemon.stats.find(s => s.stat.name === "attack").base_stat;
  const defense = pokemon.stats.find(s => s.stat.name === "defense").base_stat;
  const hp = pokemon.stats.find(s => s.stat.name === "hp").base_stat;
  const type = pokemon.types[0].type.name;
  const card = document.createElement("div");
  card.classList.add("card", type);

  card.innerHTML = `
    <div class="card-header">
      <span>#${pokemon.id}</span>
    </div>

    <div class="card-image">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    </div>

    <h3 class="card-name">${pokemon.name}</h3>
    <p class="card-type">${pokemon.types[0].type.name}</p>

    <div class="stats">
      <div class="stat">
        <span>HP</span>
        <div class="bar"><div style="width: ${hp}px"></div></div>
      </div>

      <div class="stat">
        <span>ATK</span>
        <div class="bar"><div style="width: ${attack}px"></div></div>
      </div>

      <div class="stat">
        <span>DEF</span>
        <div class="bar"><div style="width: ${defense}px"></div></div>
      </div>
    </div>
  `;

  return card;
}
  
