//AUTHOR : JOSE ALEJANDRO ZAPATA

import {getPokemonByName, getPokemonLIst} from "./data.js";

const pokemonInput = document.getElementById('pokemon-input');
const cardContainer = document.getElementById('cards-container');

async function loadMenu(){

    const pokemonList = await getPokemonLIst();
    let pokemonCard;
    let pokemonSprite;
    let detailCard;
    let pokemonName;
    let pokemonId;
    let pokemonType;

    for( let pokemon of pokemonList ){
        //Se trae al informaicón del Pokémon
        const pokemonDetail = await getPokemonByName(pokemon.name);

        //Se crea la tarjeta
        pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.pokeball

        //Se crea el sprite de la tarjeta
        pokemonSprite = document.createElement('img');
        pokemonSprite.src = pokemonDetail.sprite;
        pokemonSprite.alt = `${pokemonDetail.name}-front-sprite`;

        //Se crea una etiqueta para mostrar el nombne del Pokémon
        pokemonName = document.createElement('h3');
        pokemonName.textContent =  pokemonDetail.name;

        //Se muestra el número de Pokémon en la pokedex
        pokemonId = document.createElement('h5');
        pokemonId.textContent =  `No. ${pokemonDetail.id}`;

        //Se muestra el tipo del Pokémon
        pokemonType = document.createElement('p');
        pokemonType.textContent = `tipo: ${pokemonDetail.type}`;

        //Se agregan los elemtentos de texto a un div para agrupar los detalles
        detailCard = document.createElement('div');
        detailCard.classList.add('detail-card');
        detailCard.appendChild(pokemonName);
        detailCard.appendChild(pokemonId);
        detailCard.appendChild(pokemonType);

        //Se agrega la información a la carta
        pokemonCard.appendChild(pokemonSprite);
        pokemonCard.appendChild(detailCard);


        cardContainer.appendChild(pokemonCard);
    }
}
    

pokemonInput.addEventListener('change', async (event)=>{
    alert("La información es presentada en la consola")
    const pokemon = pokemonInput.value.trim();
    const pokemonDetail = await getPokemonByName(pokemon);

    console.log(`
    Name: ${pokemonDetail.name} \n
    No. Pokedex: ${pokemonDetail.id}\n
    Wheight: ${pokemonDetail.wheight}\n
    Height: ${pokemonDetail.height}\n
    Type: ${pokemonDetail.type}\n,
    Abilities: {`);

    for( let ability of pokemonDetail.abilities){
        console.log(`
        ${ability.ability.name}`)
    }

    console.log(`
    }\n
    evolve_to: ${pokemonDetail.evolve}`);
});
loadMenu();