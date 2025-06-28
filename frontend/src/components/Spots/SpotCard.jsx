import { Link } from 'react-router-dom';
import '../Spots/SpotCard.css';

export default function SpotCard({ spot }) {
  return (
    <Link
      to={`/spots/${spot.id}`}
      className="spot-card"
      title={spot.name}
    >
      <div className="spot-name">{spot.name}</div>
      <img
        src={spot.previewImage}
        alt={spot.name}
        className="spot-preview-image"
      />
      <div className="spot-info">
        <div>
          <div className="spot-location">
            {spot.city}, {spot.state}
          </div>
          <div className="spot-price">
            ${spot.price} night
          </div>
        </div>
        <div className="spot-rating">
          ★ {Number.isFinite(spot.avgRating) ? spot.avgRating.toFixed(1) : "New"}
        </div>
      </div>
    </Link>
  );
}

// code source and modified from ChatGPT.

// import { Link } from 'react-router-dom';
// import '../SpotCard/SpotCard.css';

// export default function SpotCard({ spot }) {
//   const previewImage = spot.previewImage;
//   return (
//     <div className="spot-card">
//       <Link to={`/spots/${spot.id}`}>
//         <img
//           src={previewImage }
//           alt={spot.name}
//           className="spot-preview-image"
//         />
//         <div className="spot-info">
//           <h3>{spot.name}</h3>
//           <p>{spot.city}, {spot.state}</p>
//           <p className="spot-price">${spot.price} / night</p>
//         </div>
//       </Link>
//     </div>
//   );
// }
