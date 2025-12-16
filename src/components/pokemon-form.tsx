import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../model/pokemon';
import { useHistory } from 'react-router-dom';
import formatType from '../helpers/format-type';
import PokemonService from '../services/pokemon-service';

type Props = {
  pokemon: Pokemon;
  isEditForm: boolean;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
  const history = useHistory();

  // State du formulaire : on garde seulement les valeurs + erreurs
 const [formData, setFormData] = useState({
  picture: pokemon.picture || '',
  name: pokemon.name || '',
  hp: pokemon.hp.toString(),         // ← plus de ?.
  cp: pokemon.cp.toString(),         // ← plus de ?.
  types: pokemon.types || [],
});

  const [errors, setErrors] = useState<Record<string, string>>({});

  const typesList: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal',
    'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

  // Réinitialiser le formulaire si le pokemon change (ex. navigation directe)
useEffect(() => {
  setFormData({
    picture: pokemon.picture || '',
    name: pokemon.name || '',
    hp: pokemon.hp.toString(),
    cp: pokemon.cp.toString(),
    types: pokemon.types || [],
  });
  setErrors({});
}, [pokemon]);
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Gestion des types (checkbox)
      setFormData(prev => {
        const newTypes = checked
          ? [...prev.types, name]
          : prev.types.filter(t => t !== name);

        return { ...prev, types: newTypes };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Nettoyer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation de l'image uniquement en mode ajout
    if (!isEditForm) {
      const start = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
      const end = '.png';
      if (!formData.picture.startsWith(start) || !formData.picture.endsWith(end)) {
        newErrors.picture = `L'URL doit commencer par ${start} et se terminer par ${end}.`;
      }
    }

    // Validation du nom
    if (!/^[a-zA-Zàéè ]{3,25}$/.test(formData.name)) {
      newErrors.name = 'Le nom doit contenir entre 3 et 25 lettres (pas de chiffres ni caractères spéciaux).';
    }

    // Validation des PV
    const hp = parseInt(formData.hp);
    if (isNaN(hp) || hp < 0 || hp > 999) {
      newErrors.hp = 'Les points de vie doivent être un nombre entre 0 et 999.';
    }

    // Validation des dégâts
    const cp = parseInt(formData.cp);
    if (isNaN(cp) || cp < 0 || cp > 99) {
      newErrors.cp = 'Les dégâts doivent être un nombre entre 0 et 99.';
    }

    // Validation des types : entre 1 et 3
    if (formData.types.length === 0) {
      newErrors.types = 'Veuillez sélectionner au moins un type.';
    } else if (formData.types.length > 3) {
      newErrors.types = 'Un Pokémon ne peut pas avoir plus de 3 types.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Mettre à jour l'objet pokemon
 const updatedPokemon: Pokemon = {
  ...pokemon,
  picture: formData.picture || pokemon.picture,
  name: formData.name.trim(),
  hp: parseInt(formData.hp) || 0,        // ← sécurité
  cp: parseInt(formData.cp) || 0,        // ← sécurité
  types: formData.types,
      };
      

    const request = isEditForm
      ? PokemonService.updatePokemon(updatedPokemon)
      : PokemonService.addPokemon(updatedPokemon);

    request
      .then(() => {
        history.push(isEditForm ? `/pokemons/${pokemon.id}` : '/pokemons');
      })
      .catch(err => console.error('Erreur lors de la sauvegarde', err));
  };

  const deletePokemon = () => {
    if (window.confirm('Voulez-vous vraiment supprimer ce Pokémon ?')) {
      PokemonService.deletePokemon(pokemon)
        .then(() => history.push('/pokemons'))
        .catch(err => console.error('Erreur suppression', err));
    }
  };

  const isTypeValid = (type: string): boolean => {
    if (formData.types.length >= 3 && !formData.types.includes(type)) return false;
    return true;
  };

  const hasType = (type: string): boolean => formData.types.includes(type);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {/* Aperçu de l'image + bouton supprimer (uniquement en mode édition) */}
            {isEditForm && (
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: '250px', margin: '0 auto' }}
                />
                <span
                  className="btn-floating halfway-fab waves-effect waves-light red"
                  onClick={deletePokemon}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="material-icons">delete</i>
                </span>
              </div>
            )}

            <div className="card-stacked">
              <div className="card-content">
                {/* Image (uniquement en ajout) */}
                {!isEditForm && (
                  <div className="form-group">
                    <label htmlFor="picture">Image</label>
                    <input
                      id="picture"
                      name="picture"
                      type="text"
                      className="form-control"
                      value={formData.picture}
                      onChange={handleChange}
                    />
                    {errors.picture && (
                      <div className="card-panel red accent-1">{errors.picture}</div>
                    )}
                  </div>
                )}

                {/* Nom */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="card-panel red accent-1">{errors.name}</div>}
                </div>

                {/* PV */}
                <div className="form-group">
                  <label htmlFor="hp">Points de vie</label>
                  <input
                    id="hp"
                    name="hp"
                    type="number"
                    min="0"
                    max="999"
                    className="form-control"
                    value={formData.hp}
                    onChange={handleChange}
                  />
                  {errors.hp && <div className="card-panel red accent-1">{errors.hp}</div>}
                </div>

                {/* Dégâts */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    name="cp"
                    type="number"
                    min="0"
                    max="99"
                    className="form-control"
                    value={formData.cp}
                    onChange={handleChange}
                  />
                  {errors.cp && <div className="card-panel red accent-1">{errors.cp}</div>}
                </div>

                {/* Types */}
                <div className="form-group">
                  <label>Types</label>
                  {errors.types && <div className="card-panel red accent-1">{errors.types}</div>}
                  {typesList.map(type => (
                    <div key={type} style={{ marginBottom: '10px' }}>
                      <label>
                        <input
                          type="checkbox"
                          className="filled-in"
                          name={type}
                          checked={hasType(type)}
                          disabled={!isTypeValid(type)}
                          onChange={handleChange}
                        />
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-action center">
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;