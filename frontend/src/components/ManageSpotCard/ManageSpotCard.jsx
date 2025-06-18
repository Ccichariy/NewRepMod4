import SpotCard from '../Spots/SpotCard';

export default function ManageSpotCard({ spot }) {
    if (!spot) {
        return <div className="manage-spot-card">No Spots.</div>;
    }
    return (
        <div className="manage-spot-card">
        <h2>{spot.name}</h2>
        <p>{spot.description}</p>
        <p>Location: {spot.location}</p>
        <p>Price: ${spot.price}</p>

        {/* Reuse SpotCard for a single spot display */}
        <SpotCard spot={spot} />
        </div>
    );
}
