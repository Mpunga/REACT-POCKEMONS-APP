import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from './model/pokemon';
import { POKEMONS } from './model/mock_pokemon';
//import './App.css';

const App: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    
    useEffect(() => {
        setPokemons(POKEMONS);
    }, []);
    
    return (
        <div>
            <h1 className="center">Pokédex</h1>
            <div className="container">
                <div className="row">
                    {pokemons.map(({ id, name, picture, created }) => (
                        <div className="col s6 m4 " key={id}>
                            <div className="card horizontal">
                                <div className="card-image">
                                    <img src={picture} alt={name} />
                                    </div>
                                <div className="card-stacked">
                                    <div className="card-content">
                                        <p>{name}</p>
                                        <p><small>{created.toString()}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )

    /* return (
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
                            <button className="delete-button">Supprimer</button>
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
    );  */
}
  
export default App; 