import {
  Loading,
  QSpinnerGears,
  Notify
} from 'quasar'

export const resetAll = (state) => {
  state.pokemonList = [];
  state.offset = 0;
  state.endData = false;
};

export const setPokemonList = async (state, value) => {
  const data = state.pokemonList;
  if (!value && value.length === 0) return;
  await value.map(async (item) => {
    await data.push(item);
  });
  state.pokemonList = data;
}

export const setLoading = (state, value) => {
  state.loading = value;
  if (state.loading) {
    Loading.show({
      spinner: QSpinnerGears,
      message: "Looking for Pokemon data, please wait..."
    });
    return;
  }
  Loading.hide();
}

export const setOffset = (state, value) => {
  state.offset = state.offset + value;
}

export const setEndData = (state, value) => {
  state.endData = value;
}

export const setInitFavPokemonList = (state, value) => {
  state.favPokemonList = value;
} 

export const addFavPokemon = async (state, value) => {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Add to Your Favorite..."
  });
  const data = state.favPokemonList;
  await data.push(value);

  // Save store
  state.favPokemonList = data;
  
  // Save localStorage
  localStorage.setItem('fav_pokemon', JSON.stringify(data));
  Loading.hide();
  Notify.create({
    message: 'Add Pokemon to your Favorite Success.',
    color: 'green',
    textColor: 'white',
    icon: 'done',
    iconColor: 'white',
    timeout: 3000,
    position: 'top'
  });
} 

export const deleteFavorite = async (state, value) => {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Delete from Favorite..."
  });
  let data = state.favPokemonList;
  let searchDelete = data.findIndex(item => item.id === value.id);
  if (searchDelete !== -1) {
    data.splice(searchDelete, 1);
  }
  // Save store
  state.favPokemonList = data;
  // Save localStorage
  localStorage.setItem('fav_pokemon', JSON.stringify(data));
  Loading.hide();
  Notify.create({
    message: 'Delete Pokemon from Favorite Success.',
    color: 'red',
    textColor: 'black',
    icon: 'done',
    iconColor: 'black',
    timeout: 3000,
    position: 'top'
  });
}

