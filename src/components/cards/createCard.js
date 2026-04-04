import { PokemonCard } from "./PokemonCard.js";

export function createCard({ name, image, type }) {
  try {
    const card = new PokemonCard(name, image, type);
    return card.render();
  } catch (error) {
    console.error("Error creando card:", error);

    // fallback (como antes)
    const div = document.createElement("div");
    div.classList.add("pokemon-card");

    div.innerHTML = `
      <img src="${image}" />
      <h3>${name}</h3>
      <p>Tipo: ${type}</p>
    `;

    return div;
  }
}