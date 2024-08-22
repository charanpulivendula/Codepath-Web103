import React from 'react';
import { Link } from 'react-router-dom';

const CreatorCard = ({ creator }) => (
  <article className="card">
    <header>
      <img src={creator.image_url} alt={`${creator.name} thumbnail`} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      <h3>{creator.name}</h3>
    </header>
    <p>{creator.description}</p>
    <footer className="grid">
      <a href={creator.URL} target="_blank" rel="noopener noreferrer" className="contrast button">Visit Channel</a>
      <Link to={`/edit/${creator.id}`} className="secondary button">Edit</Link>
    </footer>
  </article>
);

export default CreatorCard;
