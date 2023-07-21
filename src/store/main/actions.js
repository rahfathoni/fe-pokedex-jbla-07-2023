const services = require("@/services/index").default;

export const inquiryListPokemon = async ({ commit }, payload) => {
  commit("setLoading", true)
  const reqList = {
    offset: payload.offset,
    limit: 50
  }
  try {
    let allData;
    const res = await services.GetListPokemon(reqList);
    if (!res.next) {
      commit("setEndData", true)
    }
    if (res && res.results.length > 0) {
      const resDetail = res.results.map((item) => {
        const reqDetail = {
          url: item.url,
          mode: 'all'
        };
        return services.GetDetailPokemon(reqDetail);
      });
      allData = await Promise.all(resDetail);
      console.log('RES inquiryListPokemon', allData);
    }
    if (payload.afterType) {
      commit("setPokemonByType", allData);
      commit("setEndData", false)
    } else {
      commit("setPokemonList", allData);
    }
    commit("setOffset", reqList.limit);
    commit("setLoading", false);
  } catch (err) {
    console.log('ERR inquiryListPokemon', err);
    commit("setLoading", false);
  }
};

export const fetchFavoritePokemon = async ({ commit }) => {
  try {
    let dataLocal = localStorage.getItem('fav_pokemon');
    if (dataLocal) {
      dataLocal = JSON.parse(dataLocal);
      commit("setInitFavPokemonList", dataLocal);
      return;
    }
    commit("setInitFavPokemonList", []);
  } catch (err) {
    console.log('ERR fetchFavoritePokemon', err);
  }
} 

export const inquiryPokemonByType = async ({commit}, payload) => {
  commit("setLoading", true);
  const reqList = {
    type: payload.type.toLowerCase() || '',
  }
  try {
    let allData;
    const res = await services.GetPokemonByType(reqList);
    commit("setEndData", true)
    if (res && res.pokemon.length > 0) {
      const resDetail = res.pokemon.map((item) => {
        const reqDetail = {
          url: item.pokemon.url,
          mode: 'all'
        };
        return services.GetDetailPokemon(reqDetail);
      });
      allData = await Promise.all(resDetail);
      console.log('RES inquiryPokemonByType', allData);
    }
    commit("setPokemonByType", allData);
    commit("setOffset", 0);
    commit("setLoading", false);
  } catch (err) {
    console.log('ERR inquiryPokemonByType', err);
    commit("setLoading", false);
  }
}