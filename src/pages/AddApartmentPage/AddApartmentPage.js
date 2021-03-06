import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const apiURL = process.env.REACT_APP_SERVER_URL;

function AddApartmentPage() {
  const [title, setTitle] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState(1);
  const [img, setImg] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleTitle = (e) => setTitle(e.target.value);
  const handlePrice = (e) => setPricePerMonth(e.target.value);
  const handleImg = (e) => setImg(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newApt = {
        name: title,
        price: pricePerMonth,
        image: img,
      };

      const response = await axios.post(`${apiURL}/api/apartments`, newApt); // ou await axios.post(`${apiURL}/apartments`, newApt);
      setTitle("");
      setPricePerMonth(1);
      setImg("");

      navigate("/allapartments");
    } catch (error) {
      setErrorMessage("Something went wrong. Try again");
    }
  };

  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div className="AddApartmentPage">
      <h3>Add New Apartment</h3>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />

        <label>Price per month</label>
        <input
          type="number"
          name="pricePerMonth"
          value={pricePerMonth}
          onChange={handlePrice}
        />

        <label>Image</label>
        <input type="text" name="img" value={img} onChange={handleImg} />

        <button type="submit"> Create Apartment </button>
      </form>
    </div>
  );
}

export default AddApartmentPage;
