import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpot } from "../../store/spots.js";

function CreateSpotForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!country) newErrors.country = "Country is required";
    if (!address) newErrors.address = "Address is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!description || description.length < 30)
      newErrors.description = "Description needs 30 or more characters";
    if (!name) newErrors.name = "Name is required";
    if (!price) newErrors.price = "Price is required";
    if (!previewImage || !/\.(png|jpg|jpeg)$/i.test(previewImage))
      newErrors.previewImage = "Preview image must end in .png, .jpg, or .jpeg";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

const spotData = {
  address,
  city,
  state,
  country,
  lat: 0,
  lng: 0,
  name,
  description,
  price
};

dispatch(createSpot(spotData))
  .then(async (newSpot) => {
    // Add preview image
    await fetch(`/api/spots/${newSpot.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: previewImage,
        preview: true
      })
    });

    // Add the 4 optional images
    const imageUrls = [image1, image2, image3, image4];
    for (let url of imageUrls) {
      if (url) {
        await fetch(`/api/spots/${newSpot.id}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url,
            preview: false
          })
        });
      }
    }

    navigate(`/spots/${newSpot.id}`);
  })
  .catch((resErrors) => {
    setErrors(resErrors.errors || {});
  });
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Spot</h2>

      <label>
        Country
        <input value={country} onChange={(e) => setCountry(e.target.value)} />
        {errors.country && <p>{errors.country}</p>}
      </label>

      <label>
        Street Address
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
        {errors.address && <p>{errors.address}</p>}
      </label>

      <label>
        City
        <input value={city} onChange={(e) => setCity(e.target.value)} />
        {errors.city && <p>{errors.city}</p>}
      </label>

      <label>
        State
        <input value={state} onChange={(e) => setState(e.target.value)} />
        {errors.state && <p>{errors.state}</p>}
      </label>

      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <p>{errors.description}</p>}
      </label>

      <label>
        Name of your Spot
        <input value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p>{errors.name}</p>}
      </label>

      <label>
        Price per night (USD)
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        {errors.price && <p>{errors.price}</p>}
      </label>

      <label>
        Preview Image URL
        <input value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
        {errors.previewImage && <p>{errors.previewImage}</p>}
      </label>

      <label>
        Image URL 1
        <input value={image1} onChange={(e) => setImage1(e.target.value)} />
      </label>

      <label>
        Image URL 2
        <input value={image2} onChange={(e) => setImage2(e.target.value)} />
      </label>

      <label>
        Image URL 3
        <input value={image3} onChange={(e) => setImage3(e.target.value)} />
      </label>

      <label>
        Image URL 4
        <input value={image4} onChange={(e) => setImage4(e.target.value)} />
      </label>

      <button type="submit">Create Spot</button>
    </form>
  );
}

export default CreateSpotForm;
