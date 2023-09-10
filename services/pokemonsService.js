import axios from "axios";
import * as helper from "./serviceHelper"

const pokemonsService = {
    endpoint: "https://pokeapi.co/api/v2", //base url for PokeAPI
};

pokemonsService.getPokemons = (limit, offset) => {
    const config = {
        method: "GET",
        url: `${pokemonsService.endpoint}/pokemon?limit=${limit}&offset=${offset}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };

      return axios(config).then(helper.onGlobalSuccess);
}

export default pokemonsService;