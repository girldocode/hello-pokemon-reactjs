import React from "react";
import classes from "./card.module.css";

const Card = ({ id, name, src, types }) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <div className={classes.card}>
      <img src={imgUrl} alt={name} />
      <h1>{name}</h1>
      <p>{types?.join(", ")}</p>
    </div>
  );
};

export default Card;
