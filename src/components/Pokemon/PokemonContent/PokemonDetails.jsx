import React from "react";
import { useQuery } from "react-query";
import { ApiGetPokemonUnique } from "../../../services/pokemon.service";
import Card from "../../shared & ui/Card/Card";
import classes from "./PokemonDetails.module.css";

const PokemonDetails = ({ name, data }) => {
  const {
    data: pokemonData,
    isLoading,
    isError,
  } = useQuery(["SinglePokemon", name], () => ApiGetPokemonUnique(name), {
    initialData: data,
    enabled: !data,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const pokemon = pokemonData;
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
  return (
    <div className={classes.detail}>
      <Card
        id={pokemon.id}
        key={pokemon.id}
        name={pokemon.name}
        src={imgUrl}
        type={pokemon.types.map((type) => type.type.name).join(", ")}
      />
      <table className={classes.table}>
        <tbody>
          <tr className={`${classes.row} ${classes.borderBottom}`}>
            <td className={`${classes.column} ${classes.name}`}>Name</td>
            <td className={classes.column}>{pokemon.name}</td>
          </tr>
          <tr className={`${classes.row} ${classes.borderBottom}`}>
            <td className={`${classes.column} ${classes.type}`}>Type</td>
            <td className={classes.column}>
              {pokemon.types.map((type) => type.type.name).join(", ")}
            </td>
          </tr>
          <tr className={`${classes.row} ${classes.borderBottom}`}>
            <td className={`${classes.column} ${classes.name}`}>Abilities</td>
            <td className={classes.column}>
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </td>
          </tr>
          <tr className={`${classes.row} ${classes.borderBottom}`}>
            <td className={`${classes.column} ${classes.type}`}>Height</td>
            <td className={classes.column}>{pokemon.height}</td>
          </tr>
          <tr className={`${classes.row}`}>
            <td className={`${classes.column} ${classes.name}`}>Weight</td>
            <td className={classes.column}>{pokemon.weight}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDetails;
