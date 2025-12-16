import Pokemon from "../model/pokemon";


export default class PokemonService {

    static getPokemons(): Promise<Pokemon[]> {
        return fetch("http://localhost:3002/pokemons")
            .then(response => response.json())
        .catch(error => this.handleError(error));
    
    }
    static getPokemon(id: number): Promise<Pokemon> {
        return fetch(`http://localhost:3002/pokemons/${id}`)
            .then(response => response.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(error => this.handleError(error));
    }

    static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
        return fetch(`http://localhost:3002/pokemons/${pokemon.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static deletePokemon(pokemon: Pokemon): Promise<{}> {
        return fetch(`http://localhost:3002/pokemons/${pokemon.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
    }

    static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
        
        return fetch(`http://localhost:3002/pokemons/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon)
        })
            .then(response => response.json())
            .catch(error => this.handleError(error));
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