import axios from "axios";

const baseURL = 'https://pokeapi.co/api/v2';

export default {
  GetListPokemon: async (payload) => {
    try {
      console.log('REQ GetListPokemon ', payload);
      const res = await axios.get(`${baseURL}/pokemon?offset=${payload.offset}&limit=${payload.limit}}`);
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
      if (payload.mode === 'detail') console.log("RES GetDetailPokemon", res.data);
      return res.data;
    } catch (err) {
      console.error("ERR GetListPokemon", payload, err);
      throw err;
    }
  },
  GetPokemonByType: async (payload) => {
    try {
      console.log('REQ GetPokemonByType', payload);
      const res = await axios.get(`${baseURL}/type/${payload.type}`)
      console.log('RES GetPokemonByType', res.data);
      return res.data;
    } catch (err) {
      console.error("ERR GetPokemonByType", payload, err);
      throw err;
    }
  }
};
  