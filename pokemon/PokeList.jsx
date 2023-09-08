import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

function PokeList() {
  const [pokemonList, setPokemonList] = useState([]);

  const getAllPokemons = async () => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=600&offset=0"
    );

    const data = await res.json();

    function createPokemonObj(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setPokemonList((currentList) => [...currentList, data]);
        await pokemonList.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObj(data.results);
    console.log(pokemonList);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <React.Fragment>
      <div className="app-container">
        <div className="pokemon-container">
          <div className="all-container">
            {pokemonList.map((pokemonStats) => (
              <PokemonCard
                key={pokemonStats.name}
                id={pokemonStats.id.toString().padStart(3, "0")}
                image={
                  pokemonStats.sprites.other["official-artwork"].front_default
                }
                name={pokemonStats.name.replace(/^./, (str) =>
                  str.toUpperCase()
                )}
                type={pokemonStats.types[0].type.name}
                weight={pokemonStats.weight}
                height={pokemonStats.height}
                stats={pokemonStats.stats
                  .map((stat) => stat.base_stat)
                  .slice(0, 3)}
                  statsName={pokemonStats.stats.map((stat) => 
                    stat.stat.name).slice(0,3)}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PokeList;
