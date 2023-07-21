export default function () {
  return {
    pokemonList: [],
    offset: 0,
    loading: false,
    endData: false,
    favPokemonList: [],
    optionType: [
      'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
      'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
      'dragon', 'dark', 'steel', 'fairy'
    ]
  };
}