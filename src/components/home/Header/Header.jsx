import React from "react";
import logoImg from "../../../assets/pngegg.png";
import classes from "./header.module.css";

const HomeHeader = () => {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src={logoImg} alt="logo-img" />
    </header>
  );
};

export default HomeHeader;
