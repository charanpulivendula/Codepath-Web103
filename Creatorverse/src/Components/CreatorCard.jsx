import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/CreatorCard.css';

const CreatorCard = ({ creator }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/info/${creator.id}`);
  };

  return (
    <article className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <header>
        <img src={creator.image_url} alt={`${creator.name} thumbnail`} style={{ width: '100%', height: '200px', borderRadius: '8px' }} />
        <h3>{creator.name}</h3>
      </header>
      <footer className="grid">
        <a
          href={creator.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="contrast button"
          onClick={(e) => e.stopPropagation()} // Prevents triggering the card click
        >
          Visit Channel
        </a>
        <Link
          to={`/edit/${creator.id}`}
          className="secondary button"
          onClick={(e) => e.stopPropagation()} // Prevents triggering the card click
        >
          Edit
        </Link>
      </footer>
    </article>
  );
};

export default CreatorCard;
