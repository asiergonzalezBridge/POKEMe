export class Card {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }

  render() {
    const div = document.createElement("div");
    div.classList.add("pokemon-card");

    div.innerHTML = `
      <img src="${this.image}" />
      <h3>${this.name}</h3>
    `;

    return div;
  }
}