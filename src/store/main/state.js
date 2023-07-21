export default function () {
  return {
    pokemonList: [],
    offset: 0,
    loading: false,
    endData: false,
    favPokemonList: [],
    optionType: [
      'NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING',
      'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST',
      'DRAGON', 'DARK', 'STEEL', 'FAIRY'
    ]
  };
}