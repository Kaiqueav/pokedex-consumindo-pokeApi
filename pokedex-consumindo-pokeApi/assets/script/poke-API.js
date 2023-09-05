
const pokeAPI = {}

function convertPokeApidetailToPokemon (PokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = PokeDetail.id
    pokemon.name = PokeDetail.name 

    const types = PokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
 
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = PokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApidetailToPokemon)
}

pokeAPI.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((reponse) => reponse.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequets) => Promise.all(detailRequets))
        .then((pokemonsDetails) => pokemonsDetails)
} 