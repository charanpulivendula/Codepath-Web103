import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../Client';

const ViewCreator = () => {
  const { Id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      let { data: creator } = await supabase
        .from('creators')
        .select('*')
        .eq('Id', Id)
        .single();
      setCreator(creator);
    };
    fetchCreator();
  }, [Id]);

  return (
    <div>
      {creator ? (
        <>
          <h1>{creator.name}</h1>
          <p>{creator.description}</p>
          <a href={creator.URL} target="_blank" rel="noopener noreferrer">Visit Channel</a>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewCreator;
