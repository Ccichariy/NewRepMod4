import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux"; 
import './SpotDetailsPage.css';
import ReviewList from '../Reviews/ReviewList'; 

function SpotDetailsPage() {
  const { spotId } = useParams(); 
  const [spot, setSpot] = useState(null);
  const [error, setError] = useState(null);

  // const user = useSelector((state) => state.session.user); 

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

  const {
    name,
    city,
    state,
    country,
    price,
    description,
    SpotImages = [],
    Owner,
    avgRating,
    numReviews,
  } = spot;

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

      <div className="spot-details">
        <div>     
          <h2>Hosted by {Owner?.firstName} {Owner?.lastName}</h2>
          <p>{description}</p>
        </div>

        <div className="callout-box">
          <div>
            ${price} <span className="per-night">/night</span>
            <div className="review-summary-inline">
              {Number.isFinite(avgRating) && numReviews > 0
                ? `★ ${avgRating.toFixed(1)} · ${numReviews} review${numReviews > 1 ? 's' : ''}`
                : '★ New'}
            </div>
            <button onClick={() => alert("Feature coming soon")}>Reserve</button>
          </div>
        </div>
      </div>

      <div className="review-summary-heading">
        {Number.isFinite(avgRating) && numReviews > 0
          ? `★ ${avgRating.toFixed(1)} · ${numReviews} review${numReviews > 1 ? 's' : ''}`
          : '★ New'}
      </div>

      <ReviewList />
      
    </div>
  );
}

export default SpotDetailsPage;
