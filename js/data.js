export async function getPokemonByName(pokemonName){
    try{
        const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!resPokemon.ok) throw new Error('Error al obtener el Pokémon.');
        
        const pokemon = await resPokemon.json();
        const resSpecies = await fetch(pokemon.species.url);
        const species = await resSpecies.json();
        const resEvolveChain = await fetch(species.evolution_chain.url);
        const evolveChain = await resEvolveChain.json();

        let chain = evolveChain.chain;
        let evolve = [];

        do {
            evolve.push(chain.species.name);
            chain = chain.evolves_to[0];
        } while (chain);
        
        for(let i in evolve ){
            if( evolve[i] == pokemon.name && i > evolve.length-1){
                evolve = evolve[i+1];
            }else if( i == evolve.length-1){
                evolve = evolve[i];
            }
        }

        return{
            id: pokemon.id,
            name: pokemon.name,
            wheight: pokemon.weight,
            height: pokemon.height,
            type: pokemon.types[0].type.name,
            abilities: pokemon.abilities,
            evolve,
            sprite: pokemon.sprites.front_default
            
        };

    }catch(error){
        console.log('Error: ', error)
    }
}


export async function getPokemonLIst(){
    try{
        let res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=50');

        if(!res.ok) throw new Error('Error al obtener la lista de Pokémons.');
        let list = await res.json();
        return list.results;

    }catch(error){
        console.log('Error: ',error)
    }
} 


