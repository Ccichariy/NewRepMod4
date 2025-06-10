// import React from 'react';
// import { Link } from 'react-router-dom';
// import './SpotCard.css';

// export default function SpotCard({ spot }) {
//   return (
//     <Link
//       to={`/spots/${spot.id}`}
//       className="spot-card"
//       title={spot.name}
//     >
//       {/* Name above the image */}
//       <div className="spot-name">{spot.name}</div>

//       {/* Image */}
//       <img
//         src={spot.previewImage}
//         alt={spot.name}
//         className="spot-preview-image"
//       />

//       {/* City, State */}
//       <div className="spot-location">
//         {spot.city}, {spot.state}
//       </div>

//       {/* Price per night */}
//       <div className="spot-price">
//         ${spot.price} night
//       </div>

//       {/* Star rating bottom‐right */}
//       <div className="spot-rating">
//         ★ {spot.avgRating?.toFixed(1) || 'New'}
//       </div>
//     </Link>
//   );
// }
