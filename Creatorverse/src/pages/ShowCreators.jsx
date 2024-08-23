import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import CreatorCard from '../components/CreatorCard';
import '../Styles/Pages.css';

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
    <div className="main-container">
      <header className="hero">
        <h1 className="typing">Creatorverse</h1>
        <Link to="/add" className="cta button">Add New Creator</Link>
      </header>
      
      <section className="grid">
          {creators.map((creator) => <CreatorCard key={creator.id} creator={creator} />)}
      </section>
    </div>
  );
};

export default ShowCreators;
