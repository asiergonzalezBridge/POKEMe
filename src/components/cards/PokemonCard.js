import { Card } from "./card.js";

export class PokemonCard extends Card {
  constructor(name, image, type) {
    super(name, image);
    this.type = type;
  }

  render() {
  const card = super.render();

  // añadir clase por tipo
  card.classList.add(`type-${this.type}`);

  const typeEl = document.createElement("p");
  typeEl.textContent = `Type: ${this.type}`;

  card.appendChild(typeEl);

  return card;
}
}