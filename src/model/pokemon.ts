export default class Pokemon {
    id: number;
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: Array<string>;
    created: Date;


    // 2. Définition des valuers par défaut des propiétés d'un Pokémon
    constructor(
        id: number,
        hp: number = 100,
        cp: number = 10,
        name: string = 'name',
        picture: string = './assets/evoli.jpg',
        types: Array<string> = ['Normal'],
        created: Date = new Date()
    ) {
        // 3. Initialisation des propriétés d'un Pokémon
        this.id = id;
        this.hp = hp;
        this.cp = cp;
        this.name = name;
        this.picture = picture;
        this.types = types;
        this.created = created;
    }
}