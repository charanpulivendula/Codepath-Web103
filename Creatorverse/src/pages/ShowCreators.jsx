import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';
import { Link } from 'react-router-dom';
import './Pages.css';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      let { data: creators } = await supabase
        .from('creators')
        .select('*');
      setCreators(creators);
    };
    
    fetchCreators();
  }, []);

  return (
    <div className="container">
      <header className="hero">
        <h1>Creatorverse</h1>
        <p>Your hub for discovering and managing content creators.</p>
        <Link to="/add" className="contrast button">Add New Creator</Link>
      </header>
      
      <section className="grid">
        {creators.length > 0 ? (
          creators.map((creator) => <CreatorCard key={creator.id} creator={creator} />)
        ) : (
          <p>No creators found.</p>
        )}
      </section>
    </div>
  );
};

export default ShowCreators;
