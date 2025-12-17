import Pokemon from "../model/pokemon";
import POKEMONS from "../model/mock_pokemon";


export default class PokemonService {

    static pokemons: Pokemon[] = POKEMONS;

    static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'); 

    static getPokemons(): Promise<Pokemon[]> {
        if (this.isDev) {
            return fetch("http://localhost:3002/pokemons")
                .then(response => response.json())
            .catch(error => this.handleError(error));
          }
        return new Promise((resolve) => {
        resolve(this.pokemons);
      });
    }

    static getPokemon(id: number): Promise<Pokemon|null> {
        if (this.isDev) {
        return fetch(`http://localhost:3002/pokemons/${id}`)
            .then(response => response.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(error => this.handleError(error));
        }
        return new Promise((resolve) => {
            resolve(this.pokemons.find(pokemon => id === pokemon.id) || null);
        });
    }   

    static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
        if (this.isDev) {
        return fetch(`http://localhost:3002/pokemons/${pokemon.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        }   
        return new Promise((resolve) => {
            const { id } = pokemon;
            const index = this.pokemons.findIndex(p => p.id === id);
            this.pokemons[index] = pokemon;
            resolve(pokemon);
        });
    }

    static deletePokemon(pokemon: Pokemon): Promise<{}> {
        if (this.isDev) {
        return fetch(`http://localhost:3002/pokemons/${pokemon.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } 
        return new Promise((resolve) => {
            const { id } = pokemon;
            this.pokemons = this.pokemons.filter(p => p.id !== id);
            resolve({});
        });
    }

    static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
        pokemon.created = new Date(pokemon.created);

        if (this.isDev) {
        
        return fetch(`http://localhost:3002/pokemons/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        }
        return new Promise((resolve) => {
            this.pokemons.push(pokemon);
            resolve(pokemon);
        });     
    }

    static searchPokemons(term: string): Promise<Pokemon[]> {
        return fetch(`http://localhost:3002/pokemons?q=${term}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static isEmpty(obj: any): boolean {
        return Object.keys(obj).length === 0;
    }
    static handleError(error: Error): void {
        console.error(error);
    }

}