import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSpot, fetchSpotDetails } from "../../store/spots"; // Make sure these exist
import "./EditSpotForm.css";

export default function EditSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();

  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    description: "",
    name: "",
    price: "",
    previewImage: "",
    image1: "",
    image2: "",
    image3: "",
    image4: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId))
      .then((spot) => {
        setFormData({
          country: spot.country || "",
          address: spot.address || "",
          city: spot.city || "",
          state: spot.state || "",
          lat: spot.lat || "",
          lng: spot.lng || "",
          description: spot.description || "",
          name: spot.name || "",
          price: spot.price || "",
          previewImage: "", // Optional for edit
          image1: "",
          image2: "",
          image3: "",
          image4: ""
        });
        setIsLoaded(true);
      })
      .catch(() => setErrors({ general: "Failed to load spot data." }));
  }, [dispatch, spotId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.country) validationErrors.country = "Country is required";
    if (!formData.address) validationErrors.address = "Street address is required";
    if (!formData.city) validationErrors.city = "City is required";
    if (!formData.state) validationErrors.state = "State is required";
    if (!formData.description || formData.description.length < 30)
      validationErrors.description = "Description needs 30 or more characters";
    if (!formData.name) validationErrors.name = "Name of your spot is required";
    if (!formData.price) validationErrors.price = "Price per night is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      id: spotId,
      country: formData.country,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      lat: formData.lat ? parseFloat(formData.lat) : null,
      lng: formData.lng ? parseFloat(formData.lng) : null,
      description: formData.description,
      name: formData.name,
      price: parseFloat(formData.price)
      // No images in MVP update
    };

    try {
      const updatedSpot = await dispatch(updateSpot(payload));
        if (!updatedSpot) {
          throw new Error("Failed to update spot");
        }
      console.log("Updated Spot:", updatedSpot); 
      navigate(`/spots/${spotId}`);
    } catch (err) {
      const errData = await err.json();
      setErrors(errData.errors || { general: "Something went wrong." });
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="create-spot-form">
      <h1>Update your Spot</h1>
      <form onSubmit={handleSubmit}>
    
        <h2>Wheres your place located?</h2>
        <p className="caption">Guests will only get your exact address once they booked a reservation.</p>

        <label>Country</label>
        <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        {errors.country && <p className="error">{errors.country}</p>}

        <label>Street Address</label>
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        {errors.address && <p className="error">{errors.address}</p>}

        <div className="city-state-container">
          <div>
            <label>City</label>
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div>
            <label>State</label>
            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
        </div>

        <div className="lat-lng-container">
          <div>
            <label>Latitude <span className="caption">(Optional)</span></label>
            <input name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} />
          </div>
          <div>
            <label>Longitude <span className="caption">(Optional)</span></label>
            <input name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} />
          </div>
        </div>

        <h2>Describe your place to guests</h2>
        <p className="caption">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea name="description" placeholder="Please write at least 30 characters" value={formData.description} onChange={handleChange} />
        {errors.description && <p className="error">{errors.description}</p>}

        <h2>Create a title for your spot</h2>
        <p className="caption">Catch guests attention with a spot title that highlights what makes your place special.</p>
        <input name="name" placeholder="Name of your spot" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <h2>Set a base price for your spot</h2>
        <p className="caption">Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <input type="number" name="price" placeholder="Price per night (USD)" value={formData.price} onChange={handleChange} />
        {errors.price && <p className="error">{errors.price}</p>}

        <h2>Liven up your spot with photos</h2>
        <p className="caption">Submit a link to at least one photo to publish your spot.</p>
        <label>Preview Image URL</label>
        <input name="previewImage" placeholder="Preview Image URL" value={formData.previewImage} onChange={handleChange} />
        {errors.previewImage && <p className="error">{errors.previewImage}</p>}

        {[1, 2, 3, 4].map((n) => (
          <input
            key={n}
            name={`image${n}`}
            placeholder="Image URL"
            value={formData[`image${n}`]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Update your Spot</button>
      </form>
    </div>
  );
}

// code source and modified from ChatGPT.

