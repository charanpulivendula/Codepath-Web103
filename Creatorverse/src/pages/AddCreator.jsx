import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (imageFile) => {
    const sanitizedFileName = `${Date.now()}_${imageFile.name.replace(/\s+/g, '-')}`;
    const { data, error } = await supabase.storage
      .from('creators-images/public')
      .upload(`${sanitizedFileName}`, imageFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error.message);
      return null;
    }

    const { publicURL, error: publicURLError } = supabase
      .storage
      .from('creators-images')
      .getPublicUrl(sanitizedFileName);

    if (publicURLError) {
      console.error('Error getting public URL:', publicURLError.message);
      return null;
    }

    return publicURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (image) {
      imageUrl = await handleImageUpload(image);
    }

    const { error } = await supabase
      .from('creators')
      .insert([{ name, URL: url, description, image_url: imageUrl }]);

    if (error) {
      console.error('Error adding creator:', error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Add Creator</button>
    </form>
  );
};

export default AddCreator;
