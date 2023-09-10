import axios from "axios";
import * as helper from "./serviceHelper";

const recipesService = {
    endpoint: "https://my-json-server.typicode.com/selvaicodes/recipes/recipes"
};

recipesService.getRecipes = () => {
    const config = {
        method: "GET",
        url: `${recipesService.endpoint}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
      return axios(config).then(helper.onGlobalSuccess);
} 

export default recipesService;