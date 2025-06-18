//Home Page

import './SpotsList.css';


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotCard from './SpotCard.jsx';
import { fetchAllSpots } from '../../store/spots.js';

export default function SpotsList() {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots.allSpots || {}));

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="spots-grid">
      {spots.map(spot => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
}


