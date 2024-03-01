import React from "react";
import { Link } from "react-router-dom";
import Card from "../../shared & ui/Card/Card.jsx";
import classes from "./card-list.module.css";

const CardList = ({ pokemons }) => {
  return (
    <div className={classes.cards}>
      {pokemons?.map((pokemon) => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
          <Card id={pokemon.id} name={pokemon.name} types={pokemon.types} />
        </Link>
      ))}
    </div>
  );
};

export default CardList;
