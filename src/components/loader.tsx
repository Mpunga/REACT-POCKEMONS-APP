import React, { FunctionComponent } from 'react';

const Loader: FunctionComponent = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div style={{ width: '60%' }}>
        {/* Barre de progression de base (indeterminate Materialize) */}
        <div className="progress grey lighten-2">
          <div className="indeterminate blue"></div>
        </div>

        {/* Overlay pour l'effet shimmer personnalisé */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: '4px', // Même que la barre progress
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-200%',
              width: '200%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(0, 151, 167, 0.4), transparent)',
              animation: 'shimmer 2s infinite linear',
            }}
          />
        </div>

        {/* Texte optionnel en dessous pour plus de style */}
        <p className="center-align grey-text text-darken-2" style={{ marginTop: '20px' }}>
          Chargement en cours...
        </p>
      </div>

      {/* Animation keyframes (à ajouter dans ton CSS global ou un fichier .css) */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;