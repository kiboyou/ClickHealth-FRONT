import React, { useState } from 'react';

// Composant Pagination
const Pagination = ({ totalResults, resultsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Styles pour les boutons de pagination
  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#003d3bb7',
    color: 'white',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    margin: '0 4px',
  };

  const paginationContainerStyle = {
    textAlign: 'right',  // Aligner à gauche
  };

  return (
    <div className="pagination-container" style={paginationContainerStyle}>
      {/* Bouton Précédent */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={buttonStyle}
        className='focus:outline-none focus:border-none'

      >
        {'<-'}
      </button>

      {/* Affichage des numéros de pages */}
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={{
            ...buttonStyle,
            backgroundColor: page === currentPage ? '#a1e455' : '#003d3bc9',
            color: page === currentPage ? 'black' : 'white',
          }}
          className='focus:outline-none focus:border-none'
        >
          {page}
        </button>
      ))}

      {/* Bouton Suivant */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={buttonStyle}
        className='focus:outline-none focus:border-none'

      >
        {'->'}
      </button>
    </div>
  );
};

export default Pagination;
