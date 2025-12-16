import React, { FunctionComponent } from 'react';
import PokemonList from './pages/pokemon-list';
import PokemonsDetail from './pages/pokemon-details';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PageNotFound from './pages/page-not-found';
import PokemonEdit from './pages/pokemon-edit';
import PokemonAdd from './pages/pokemon-add';
import Login from './pages/login';
//import './App.css';

const App: FunctionComponent = () => {
    
    return (
        <Router>
            <div>
                {/*la barre de navigation commun à toutes les pages*/}
                <nav>
                    <div className='nav-wrapper teal'>
                      <Link to="/" className="brand-logo center">Pokémons</Link>  
                    </div>
                </nav>
                {/* Le système de de gestion des routes de notre application */}
                <Switch>
                    <Route exact path='/' component={PokemonList} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/pokemons" component={PokemonList} />
                     <Route exact path="/pokemons/add" component={PokemonAdd} />
                    <Route exact path="/pokemons/edit/:id" component={PokemonEdit} />
                    <Route exact path="/pokemons/:id" component={PokemonsDetail} />
                    <Route component={PageNotFound} />
                </Switch>
           </div>
        </Router>
    )

   
}
  
export default App; 