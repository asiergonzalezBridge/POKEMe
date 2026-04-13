export async function getPokemonByName(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error('Pokemon no encontrado');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener pokemon', error);
        return null;
    }
  
}

export async function getPokemonByType(type) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

    if (!response.ok) {
      throw new Error("Tipo no encontrado");
    }

    const data = await response.json();

    // Sacamos solo algunos Pokémon
    const pokemons = data.pokemon.slice(0, 6);

    return pokemons.map(p => p.pokemon.name);

  } catch (error) {
    console.error("Error al obtener tipo:", error);
    return [];
  }
}