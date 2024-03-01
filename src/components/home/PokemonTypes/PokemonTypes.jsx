import React from "react";
import { useQuery } from "react-query";
import { ApiGetTypes } from "../../../services/pokemon.service.js"; // Update the path
import classes from "./pokemon-types.module.css";

const PokemonTypes = ({ setType }) => {
  const {
    data: typesData,
    isLoading,
    isError,
  } = useQuery("types", ApiGetTypes);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching Pokemon types</div>;

  const types = typesData.results.map((type) => type.name);

  function onClick(type) {
    setType(type);
  }

  return (
    <div className={classes.container}>
      {types.map((type) => (
        <button
          className={classes.button}
          key={type}
          onClick={() => onClick(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default PokemonTypes;
