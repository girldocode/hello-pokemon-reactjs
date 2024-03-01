import { $http } from "../helper";

// `-` private/internal

async function _singlePokemon(pokemon, internal) {
  try {
    const _result = await $http.get("/v2/pokemon/" + pokemon);
    return Promise.resolve(_result.data);
  } catch (error) {
    console.log(
      internal
        ? "[_singlePokemon]"
        : "[ApiGetPokemonUnique]" +
            ": Failed to get Pokemon with slug:" +
            pokemon
    );
    return Promise.reject(error);
  }
}

async function _pokemonWithTypes(pokemonRes) {
  const pokemons = pokemonRes.results ?? pokemonRes.results;
  const pokemonFinalList = []; // {id, name, types]

  for (const pokemon of pokemons) {
    try {
      const { id, name, types } = await _singlePokemon(pokemon.name, true);
      pokemonFinalList.push({
        id,
        name,
        types: types.map((type) => type.type.name),
      });
    } catch (error) {
      console.log(
        "[_pokemonWithTypes]: Error while fetching Pokemon details:",
        error
      );
    }
  }

  if (pokemonFinalList.length > 0) {
    return pokemonFinalList;
  }
}

export const ApiGetPokemon = async ({ offset, limit }) => {
  try {
    const result = await $http.get("/v2/pokemon", {
      params: { offset, limit },
    });

    const computedPokemonList = await _pokemonWithTypes(result.data);
    return Promise.resolve({
      count: result.data?.count,
      pokemons: computedPokemonList,
    });
  } catch (error) {
    console.log("[ApiGetPokemon]: Failed to get Pokemons");
    return Promise.reject(error);
  }
};

export const ApiGetPokemonUnique = async (pokemon) => {
  return await _singlePokemon(pokemon, false);
};

export const ApiGetTypes = async () => {
  try {
    const result = await $http.get("/v2/type/");
    return Promise.resolve(result.data);
  } catch (error) {
    console.log("[ApiGetTypes]: Failed to get Pokemon Types");
    return Promise.reject(error);
  }
};
