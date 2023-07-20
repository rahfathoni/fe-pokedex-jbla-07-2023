const services = require("@/services/index").default;

export const inquiryListPokemon = async (store, payload) => {
  store.commit("setLoading", true)
  const reqList = {
    offset: payload.offset,
    limit: 50
  }
  try {
    let allData;
    const res = await services.GetListPokemon(reqList);
    if (!res.next) {
      store.commit("setEndData", true)
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
      console.log('RES inquiryListPokemon', allData)
    }
    store.commit("setPokemonList", allData);
    store.commit("setOffset", reqList.limit)
    store.commit("setLoading", false)
  } catch (err) {
    console.log('ERR inquiryListPokemon', err)
    store.commit("setLoading", false)
  }
};

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