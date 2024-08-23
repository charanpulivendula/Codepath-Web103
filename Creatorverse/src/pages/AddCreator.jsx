import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import '../Styles/AddCreator.css';

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('creators')
      .insert([{ name, URL: url, description, image_url: image }]);

    if (error) {
      console.error('Error adding creator:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="add-creator-container">
      <h1 className="title">Add a New Creator</h1>
      <form onSubmit={handleSubmit} className="add-creator-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea-field"
        />
        <textarea
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="textarea-field"
        />
        <button type="submit" className="submit-button">Add Creator</button>
      </form>
    </div>
  );
};

export default AddCreator;
