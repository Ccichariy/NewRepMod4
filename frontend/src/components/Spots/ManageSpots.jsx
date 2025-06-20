import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserSpots } from '../../store/spots';
import ManageSpotCard from '../ManageSpotCard/ManageSpotCard.jsx';
import './ManageSpots.css';

export default function ManageSpots() {
  const dispatch = useDispatch();

  const userSpots = useSelector(state => Object.values(state.spots.userSpots || {}));
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserSpots());
    }
  }, [dispatch, user]);

  if (!userSpots.length) {
    return (
      <div className="manage-spots__empty">
        <h2>You don’t have any spots yet</h2>
        <p>Click “Create a New Spot” to get started!</p>
      </div>
    );
  }

  return (
    <div className="manage-spots__container">
      <h1>Manage Your Spots</h1>
      <div className="manage-spots__grid">
        {userSpots.filter(Boolean).map(spot => {
            console.log("Spot", spot);
          return <ManageSpotCard key={spot.id} spot={spot} />
        })}
      </div>
    </div>
  );
}
