import {
  Loading,
  QSpinnerGears
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
    await data.push(item)
  });
  state.pokemonList = data;
}

export const setLoading = (state, value) => {
  state.loading = value;
  if (state.loading) {
    Loading.show({
      spinner: QSpinnerGears,
      message: "Looking for Pokemon data, please wait..."
    })
    return;
  }
  Loading.hide()
}

export const setOffset = (state, value) => {
  state.offset = state.offset + value;
}

export const setEndData = (state, value) => {
  state.endData = value;
}

// export const setAllAreas = (state, value) => {
//   state.allAreas = value;
// };

// export const setTeamList = (state, value) => {
//   if (!value) {
//     state.teamList = {
//       area: "",
//       list: [],
//     };
//     return;
//   }
//   state.teamList = {
//     area: value.competition.country,
//     list: value.teams,
//   };
// };

// export const setTeamDetail = (state, value) => {
//   if (!value) {
//     state.teamDetail = "";
//     state.teamArea = "";
//     return;
//   }
//   state.teamDetail = value;
//   state.teamArea = value.area;
// };

// export const setSquadDetail = (state, value) => {
//   if (!value) {
//     state.squadDetail = "";
//     return;
//   }
//   state.squadDetail = value;
// };
