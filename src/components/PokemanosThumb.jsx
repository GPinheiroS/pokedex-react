import React from "react";
import { Fragment } from "react/cjs/react.development";

const PokemanosThumb = ({ id, name, image, type }) => {
  const CorTipo = `thumb-container ${type}`;

  return (
    <>
    <div className={CorTipo}>
      <div className="thumb-container">
        <small>#0{id}</small>
        <img src={image} alt={name} />
      </div>
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <h1>Type: {type}</h1>
      </div>
    </div>
    </>
  );
};

export default PokemanosThumb;
