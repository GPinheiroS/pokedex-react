import { useEffect, useState } from "react";

import PokemanosThumb from "./components/PokemanosThumb";
import Pokeball from "./BackgroundIcon/Pokeball.svg";

function App() {
  const ele = document.querySelector(".all-container");
  let pressed = false;
  let pos = { left: 0, x: 0 };
  let scrollWidth = 0;

  if (ele) {
    ele.addEventListener("mousedown", (e) => {
      pressed = true;
      pos = {
        left: ele.scrollLeft,
        x: e.clientX,
      };
      ele.style.cursor = "grabbing";
    });
    ele.addEventListener("mouseenter", () => {
      ele.style.cursor = "grab";
    });
    ele.addEventListener("mouseup", () => {
      ele.style.cursor = "grab";
    });
    ele.addEventListener("mouseup", () => {
      pressed = false;
    });
    ele.addEventListener("mousemove", (e) => {
      if (!pressed) return;
      const dx = e.clientX - pos.x;
      ele.scroll(pos.left - dx, 0);
    });
  }

  const previousSlideHandler = () => {
    const slider = document.querySelector(".all-container");
    slider.style.scrollBehavior = "smooth";
    if (scrollWidth > 0) scrollWidth = slider.scrollLeft - 500;
    slider.scroll(scrollWidth, 0);
    slider.style.scrollBehavior = "auto";
  };
  const nextSlideHandler = () => {
    const slider = document.querySelector(".all-container");
    slider.style.scrollBehavior = "smooth";
    scrollWidth = slider.scrollLeft + 500;
    slider.scroll(scrollWidth, 0);
    slider.style.scrollBehavior = "auto";
  };
  const [carregou, setCarregou] = useState(true);
  const [pokemanos, setPokemanos] = useState([]);
  const carregar = "https://pokeapi.co/api/v2/pokemon?limit=151";
  let loading = false;

  const getAllpokemanos = async () => {
    const res = await fetch(carregar);
    const data = await res.json();

    function pokemonObject(result) {
      result.forEach(async (pokemon, index) => {
        index = index + 1;
        loading = true;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        console.log(index);
        setPokemanos((currentList) => [...currentList, data]);
        if (index === 151) {
          loading = false;
          setCarregou(loading);
        }
      });
    }
    pokemonObject(data.results);
  };

  useEffect(() => {
    getAllpokemanos();
  }, []);

  return (
    <>{carregou && (
      <div className="background-pokeball">
        <img src={Pokeball} alt="Pokeball"></img>
      </div>
    )}
    <div className="app-container">
      
      <div className="pokemon-container">
        <div className="all-container">
          <button className="btn prevSlide" onClick={previousSlideHandler}>
            {"<"}
          </button>
          {pokemanos.map((pokemons, index) => (
            <PokemanosThumb
              name={pokemons.name}
              hp={pokemons.stats[0].base_stat}
              att={pokemons.stats[1].base_stat}
              def={pokemons.stats[2].base_stat}
              spd={pokemons.stats[5].base_stat}
              image={pokemons.sprites.other.dream_world.front_default}
              type={pokemons.types[0].type.name}
              key={index}
            />
          ))}
          <button className="btn nextSlide" onClick={nextSlideHandler}>
            {">"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
