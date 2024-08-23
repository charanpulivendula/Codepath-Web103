import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/InfoPage.css';

const InfoPage = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      let { data: creator } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      setCreator(creator);
    };
    fetchCreator();
  }, [id]);

  if (!creator) {
    return <p>Loading...</p>;
  }

  return (
    <div className="info-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1 className="info-title">{creator.name}</h1>
      <img src={creator.image_url} alt={`${creator.name}`} className="info-image" />
      <p className="info-description"><strong>Description:</strong> {creator.description}</p>
      <p className="info-url"><strong>Channel URL:</strong> <a href={creator.URL} target="_blank" rel="noopener noreferrer">{creator.URL}</a></p>
    </div>
  );
};

export default InfoPage;
