import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SpotDetailsPage() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const res = await fetch(`/api/spots/${spotId}`);
        if (!res.ok) throw new Error("Spot not found");
        const data = await res.json();
        setSpot(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSpot();
  }, [spotId]);

  if (error) return <p>{error}</p>;
  if (!spot) return <p>Loading spot details...</p>;

  const { name, city, state, country, price, description, SpotImages, Owner } = spot;

  const previewImage = SpotImages?.find(img => img.preview) || SpotImages[0];
  const otherImages = SpotImages?.filter(img => !img.preview);

  return (
    <div className="spot-details-page">
      <h1>{name}</h1>
      <p>{city}, {state}, {country}</p>

      <div className="spot-images">
        {previewImage && (
          <img src={previewImage.url} alt="Preview" className="preview-image" />
        )}
        <div className="additional-images">
          {otherImages?.map(img => (
            <img key={img.id} src={img.url} alt="Spot" />
          ))}
        </div>
      </div>

      <h2>Hosted by {Owner?.firstName} {Owner?.lastName}</h2>
      <p>{description}</p>

      <div className="callout-box">
        <div>${price} <span className="per-night">night</span></div>
        <button onClick={() => alert("Feature coming soon")}>Reserve</button>
      </div>
    </div>
  );
}

export default SpotDetailsPage;
