import React from "react";
import "./Loader.css";
function Loaders() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 384"
      className="loader"
    >
      <circle
        r="176"
        cy="192"
        cx="192"
        strokeWidth="32"
        fill="transparent"
        pathLength="360"
        className="active"
      ></circle>
      <circle
        r="176"
        cy="192"
        cx="192"
        strokeWidth="32"
        fill="transparent"
        pathLength="360"
        className="track"
      ></circle>
    </svg>
  );
}

export default Loaders;
