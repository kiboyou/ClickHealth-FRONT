import React from 'react'
import ReactLoading from 'react-loading'; // Importation de l'indicateur de chargement



function Loading() {

  return (
      <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond sombre semi-transparent
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999, // S'assurer que l'élément est au-dessus de tout le reste
            }}
          >
            <ReactLoading type="spin" color="#38a169" height={40} width={40} />
          </div>
  )
}

export default Loading
