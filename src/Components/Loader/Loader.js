import React from "react";
import "./Loader.css";
import { useSelector } from "react-redux";

function Loader() {
  const themeStatus = useSelector(state => state.theme.darkTheme);
  return (
    <div
      className="Loader"
      style={{ backgroundColor: themeStatus ? "#23201F" : "transparent" }}
    >
      <span
        className="text"
        style={{ color: themeStatus ? "#ffdc02" : "#56ca94" }}
      >
        eezql
      </span>
      <span
        className="loadText"
        style={{ color: themeStatus ? "#ffdc02" : "#56ca94" }}
      >
        Loading...
      </span>
    </div>
  );
}

export default Loader;
