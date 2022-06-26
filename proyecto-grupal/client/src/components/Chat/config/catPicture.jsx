// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';

const CatPicture = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search')
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data[0].url);
      });
  }, []);

  return (
    <div>
      <img src={imageUrl} alt='a cat' />
    </div>
  );
};

export default CatPicture;