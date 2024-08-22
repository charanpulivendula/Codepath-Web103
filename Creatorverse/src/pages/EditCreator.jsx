import React, { useEffect, useState } from 'react';
import { supabase } from '../Client';
import { useParams, useNavigate } from 'react-router-dom';

const EditCreator = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      let { data: creator } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      setName(creator.name);
      setUrl(creator.URL);
      setDescription(creator.description);
    };
    fetchCreator();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase
      .from('creators')
      .update({ name, URL: url, description })
      .eq('id', id);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update Creator</button>
      <button type="button" onClick={async () => {
        await supabase.from('creators').delete().eq('id', id);
        navigate('/');
      }}>Delete Creator</button>
    </form>
  );
};

export default EditCreator;
