import SpotCard from '../Spots/SpotCard';
import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { deleteSpot } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import ManageSpotDeleteModal from './ManageSpotDeleteModal';

export default function ManageSpotCard({ spot }) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleDelete = async () => {
  //   if (window.confirm("Are you sure you want to delete this spot?")) {
  //     try {
  //       await dispatch(deleteSpot(spot.id));
  //       // Optionally redirect or reload the list depending on your setup
  //     } catch (err) {
  //       console.error("Failed to delete spot", err);
  //     }
  //   }
  // };


  if (!spot) {
    return <div className="manage-spot-card">No Spots.</div>;
  }
  return (
    <div className="manage-spot-card">
      <h2>{spot.name}</h2>
      <p>{spot.description}</p>
      <p>Location: {spot.location}</p>
      <p>Price: ${spot.price}</p>

      <SpotCard spot={spot} />

      <div className="manage-spot-card-actions">
        <button className="update-spot-button" onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
        <OpenModalButton
          buttonText="Delete"
          modalComponent={<ManageSpotDeleteModal spotId={spot.id} />}
        />
      </div>
    </div>
  );
}

// code source and modified from ChatGPT.
