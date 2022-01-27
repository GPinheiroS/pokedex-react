import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PokemanosThumb from "./components/PokemanosThumb";

function App() {
  let scrollWidth = 0;
  const previousSlideHandler = () => {
    const slider = document.querySelector(".all-container");
    if (scrollWidth > 0) scrollWidth = slider.scrollLeft - 500;
    slider.scroll(scrollWidth, 0);
  };
  const nextSlideHandler = () => {
    const slider = document.querySelector(".all-container");
    scrollWidth = slider.scrollLeft + 500;
    slider.scroll(scrollWidth, 0);
  };

  const [pokemanos, setPokemanos] = useState([]);
  const [carregar, setCarregar] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const getAllpokemanos = async () => {
    const res = await fetch(carregar);
    const data = await res.json();

    function pokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setPokemanos((currentList) => [...currentList, data]);
      });
    }
    pokemonObject(data.results);
  };

  useEffect(() => {
    getAllpokemanos();
  }, []);

  return (
    <div className="app-container">
      <h1>Vamo la</h1>
      <div className="pokemon-container">
        <div className="all-container">
          <button className="btn prevSlide" onClick={previousSlideHandler}>
          {"<"}
          </button>
          {pokemanos.map((pokemons, index) => (
            <PokemanosThumb
              id={pokemons.id}
              name={pokemons.name}
              image={pokemons.sprites.front_default}
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
  );
}

export default App;
