import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./header.module.css";
const Header = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={classes.header}>
        <button className={classes.btn} onClick={goBack}>
          <i
            className="fa fa-arrow-left"
            style={{ fontSize: "12px", color: "#EFB259" }}
          ></i>
          Go back
        </button>
        <h1 className={classes.title}>{name}</h1>
      </div>
      <div className={classes.hr}></div>
    </>
  );
};

export default Header;
