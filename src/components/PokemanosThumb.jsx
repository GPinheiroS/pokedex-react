import React from "react";

const PokemanosThumb = ({ name, hp, att, def, spd, image, type }) => {
  const CorTipo = `thumb-container ${type}`;

  return (
    <>
      <div>
        <div className={CorTipo}>
          <p className="hp">
            <span>HP {hp}</span>
          </p>
          <div className="poke-img">
            <img src={image} alt={name} />
          </div>
          <h2 className="poke-name">{name}</h2>
          <div className="poke-type">
            <p>{type}</p>
          </div>
          <div className="poke-stats">
            <div className="stats">
              <h3>{att}</h3>
              <p>Attack</p>
            </div>
            <div className="stats">
              <h3>{def}</h3>
              <p>Defense</p>
            </div>
            <div className="stats">
              <h3>{spd}</h3>
              <p>Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemanosThumb;
