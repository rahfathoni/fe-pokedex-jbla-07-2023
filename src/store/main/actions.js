const services = require("@/services/index").default;

export const inquiryListPokemon = async (store, payload) => {
  const reqList = {
    offset: payload.offset,
    limit: payload.offset + 50
  }
  try {
    let allData;
    const res = await services.GetListPokemon(reqList);
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
  } catch (err) {
    console.log('ERR inquiryListPokemon', err)
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