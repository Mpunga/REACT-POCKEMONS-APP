import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthenticationService from '../services/authentication-service';

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  username: Field;
  password: Field;
};

const Login: FunctionComponent = () => {
  const history = useHistory();

  const [form, setForm] = useState<Form>({
    username: { value: '' },
    password: { value: '' },
  });
  const [message, setMessage] = useState<string>('Vous êtes déconnecté. (admin / admin)');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setForm({ ...form, [fieldName]: { value: fieldValue } });
  };

  const validateForm = () => {
    let newForm: Form = { ...form };

    // Username
    if ((form.username.value || '').toString().trim().length < 3) {
      newForm.username = { value: form.username.value, error: 'Au moins 3 caractères requis.', isValid: false };
    } else {
      newForm.username = { ...form.username, error: '', isValid: true };
    }

    // Password
    if ((form.password.value || '').toString().length < 6) {
      newForm.password = { value: form.password.value, error: 'Au moins 6 caractères requis.', isValid: false };
    } else {
      newForm.password = { ...form.password, error: '', isValid: true };
    }

    setForm(newForm);
    return newForm.username.isValid && newForm.password.isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setMessage('⚡ Tentative de connexion...');
      AuthenticationService.login(form.username.value, form.password.value).then((isAuthenticated) => {
        if (!isAuthenticated) {
          setMessage('🔒 Identifiants incorrects');
        } else {
          history.push('/pokemons');
        }
      });
    }
  };

  return (
    <div className="valign-wrapper" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffeb3b, #f50057)' }}>
      {/* Overlay sombre léger pour lisibilité */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }}></div>

      <div className="container z-depth-5" style={{ position: 'relative', maxWidth: '480px' }}>
        <div className="card" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          {/* Header avec couleur Pokémon */}
          <div className="card-image waves-effect waves-block waves-light">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt="Pikachu"
              style={{ width: '200px', margin: '0 auto', display: 'block', paddingTop: '30px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
            />
            <div style={{ background: 'linear-gradient(to bottom, transparent, white)', height: '60px', marginTop: '-60px' }}></div>
          </div>

          <div className="card-content">
            <span className="card-title center grey-text text-darken-3" style={{ fontSize: '28px', fontWeight: 700 }}>
              Bienvenue Trainer !
            </span>
            <p className="center grey-text text-darken-2 mb4">Accède à ton Pokédex</p>

            {/* Message global */}
            {message && (
              <div className={`card-panel center ${message.includes('incorrects') || message.includes('requis') ? 'red lighten-4' : 'light-blue lighten-4'}`}>
                <strong>{message}</strong>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Identifiant */}
              <div className="input-field">
                <i className="material-icons prefix grey-text">person</i>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={form.username.value || ''}
                  onChange={handleInputChange}
                  className="validate"
                />
                <label htmlFor="username">Identifiant</label>
                {form.username.error && <span className="helper-text red-text">{form.username.error}</span>}
              </div>

              {/* Mot de passe */}
              <div className="input-field">
                <i className="material-icons prefix grey-text">lock</i>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password.value || ''}
                  onChange={handleInputChange}
                  className="validate"
                />
                <label htmlFor="password">Mot de passe</label>
                {form.password.error && <span className="helper-text red-text">{form.password.error}</span>}
              </div>

              {/* Bouton */}
              <div className="center mt-6">
                <button
                  type="submit"
                  className="btn-large waves-effect waves-light red accent-4 hoverable"
                  style={{
                    borderRadius: '50px',
                    padding: '0 40px',
                    textTransform: 'none',
                    fontSize: '18px',
                    boxShadow: '0 4px 15px rgba(244, 67, 54, 0.4)',
                  }}
                >
                  Se connecter
                  <i className="material-icons right">send</i>
                </button>
              </div>

              <p className="center grey-text text-darken-1 mt-5" style={{ fontSize: '14px' }}>
                💡 Veuillez vous connectez !
              </p>
            </form>
          </div>
        </div>
          </div>
      </div>
      
  ) ;
};

export default Login;