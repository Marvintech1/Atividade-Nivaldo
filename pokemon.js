const pokemonNameElement = document.getElementById('pokemon-name');
const pokemonImageElement = document.getElementById('pokemon-image');
const pokemonInfoElement = document.getElementById('pokemon-info');

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');

async function fetchPokemonDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    pokemonNameElement.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemonImageElement.src = data.sprites.front_default;

    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    const height = data.height;
    const weight = data.weight;

    pokemonInfoElement.innerHTML = `
        <p><strong>Tipo:</strong> ${types}</p>
        <p><strong>Altura:</strong> ${height / 10} m</p>
        <p><strong>Peso:</strong> ${weight / 10} kg</p>
    `;
}

function goBack() {
    window.history.back();
}

fetchPokemonDetails(pokemonName);
