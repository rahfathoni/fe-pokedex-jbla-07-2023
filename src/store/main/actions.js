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
    if (res && res.results.length >= 0) {
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
    commit("setPokemonList", allData);
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
// export const inquiryDetailPokemon = async (payload) => {
//   const req = {
//     url: payload.url,
//     mode: payload.mode
//   }
//   try {
//     const res = await services.GetDetailPokemon(req);
//     return res;
//   } catch (err) {
//     console.log('ERR inquiryDetailPokemon', err)
//   }