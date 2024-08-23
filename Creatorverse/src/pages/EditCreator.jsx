import React, { useEffect, useState } from 'react';
import { supabase } from '../Client';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/EditCreator.css';

const EditCreator = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
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
      setImage(creator.image_url);
    };
    fetchCreator();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase
      .from('creators')
      .update({ name, URL: url, description , image_url: image })
      .eq('id', id);
    navigate('/');
  };

  const handleDelete = async () => {
    await supabase.from('creators').delete().eq('id', id);
    navigate('/');
  };

  return (
    <div className="edit-creator-container">
      <h1>Edit Creator</h1>
      <form onSubmit={handleSubmit} className="edit-creator-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea-field"
        />
        <textarea
          placeholder="Image_Url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="textarea-field"
        />
        <div className="button-group">
          <button type="submit" className="submit-button">Update Creator</button>
          <button type="button" onClick={handleDelete} className="delete-button">Delete Creator</button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
