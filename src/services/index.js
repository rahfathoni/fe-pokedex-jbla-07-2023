import axios from "axios";

export default {
  GetListPokemon: async (payload) => {
    try {
      console.log('REQ GetListPokemon ', payload);
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${payload.offset}&limit=${payload.limit}}`);
      console.log("RES GetListPokemon", res.data);
      return res.data;
    } catch (err) {
      console.error("ERR GetListPokemon", err);
      throw err;
    }
  },
  GetDetailPokemon: async (payload) => {
    try {
      if (payload.mode === 'detail') console.log('REQ GetDetailPokemon', payload);
      const res = await axios.get(`${payload.url}`);
      if (payload.mode === 'detail') console.log("RES GetDetailPokemon", res);
      return res.data;
    } catch (err) {
      console.error("ERR GetListPokemon", payload, err);
      throw err;
    }
  }
};
  