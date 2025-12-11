import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from './model/pokemon';
import { POKEMONS } from './model/mock_pokemon';
import './App.css';

const App: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    
    useEffect(() => {
        setPokemons(POKEMONS);
    }, []);
    
    return (
        <div className="app-container">
            <h1>Liste de Pokémon</h1>
            <ul className="pokemon-list">    
                {pokemons.map(pokemon => (
                    <li key={pokemon.id} className="pokemon-card">
                        <img src={pokemon.picture} alt={pokemon.name} />
                        <h2>{pokemon.name}</h2>
                        <div className="pokemon-info">
                            <p><strong>HP:</strong> <span>{pokemon.hp}</span></p>
                            <p><strong>CP:</strong> <span>{pokemon.cp}</span></p>
                            <div className="pokemon-types">
                                {pokemon.types.map((type, idx) => (
                                    <span key={idx} className="type-badge">{type}</span>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>  
    );
}
  
export default App; 