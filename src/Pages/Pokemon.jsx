import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PokemonContent, PokemonHeader } from "../components/Pokemon";
import { ApiGetPokemonUnique } from "../services/pokemon.service";

function Pokemon() {
  const { name } = useParams();
  const index = 0;

  const SinglePokemon = async () => {
    try {
      const res = await ApiGetPokemonUnique(name);
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(["SinglePokemon", name], SinglePokemon, {
    refetchOnWindowFocus: false,
  });

  console.log(pokemonData);
  return (
    <div>
      <PokemonHeader name={name} />
      <PokemonContent index={index} data={pokemonData} name={name} />
    </div>
  );
}

export default Pokemon;
