export function createCard({ name, image, type }) {
  // Contenedor principal
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  // Imagen
  const img = document.createElement("img");
  img.src = image;
  img.alt = name;

  // Nombre
  const title = document.createElement("h3");
  title.textContent = name;

  // Tipo
  const typeText = document.createElement("p");
  typeText.textContent = `Tipo: ${type}`;

  // Añadir todo a la card
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(typeText);

  return card;
}