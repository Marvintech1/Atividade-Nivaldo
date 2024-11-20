const pokemonList = document.getElementById('pokemon-list');
const searchInput = document.getElementById('search');

let pokemons = [];

async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
    const data = await response.json();
    pokemons = data.results; 
    displayPokemons(pokemons); 
}

async function fetchPokemonDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return await response.json();
}

async function displayPokemons(pokemonsToDisplay) {
    pokemonList.innerHTML = ''; 
    for (const pokemon of pokemonsToDisplay) {
        const pokemonData = await fetchPokemonDetails(pokemon.name); 

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
        const pokemonImage = pokemonData.sprites.front_default;

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');
        const height = pokemonData.height; 
        const weight = pokemonData.weight;

        tooltip.innerHTML = `
            <strong>Type:</strong> ${types}<br>
            <strong>Height:</strong> ${height / 10} m<br> <!-- Convert to meters -->
            <strong>Weight:</strong> ${weight / 10} kg <!-- Convert to kilograms -->
        `;

        pokemonCard.innerHTML = `
            <img src="${pokemonImage}" alt="${pokemonName}" />
            <h3>${pokemonName}</h3>
        `;

        pokemonCard.appendChild(tooltip);

        pokemonCard.addEventListener('click', () => {
            window.open(`pokemon.html?name=${pokemon.name}`, '_blank'); 
        });

        pokemonList.appendChild(pokemonCard);
    }
}

searchInput.addEventListener('input', async () => {
    const searchTerm = searchInput.value.toLowerCase(); 
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm)); 
    await displayPokemons(filteredPokemons); 
});

fetchPokemons(); 