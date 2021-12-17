import { useState, useEffect } from "react";
import axios from "axios";
import AddApartmentPage from "../AddApartmentPage/AddApartmentPage";
import { Link } from "react-router-dom";

const apiURL = process.env.REACT_APP_SERVER_URL;

function ApartmentsPage() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiURL}/api/apartments`);
      const apartmentsData = response.data;

      setApartments(apartmentsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>List of apartments</h3>
      <button onClick={AddApartmentPage}>Add a new apartment</button>

      {apartments &&
        apartments.map((oneApartment) => {
          return (
            <Link
              to={"/apartment/details/" + oneApartment._id}
              key={oneApartment._id}
            >
              <div className="card">
                <img src={oneApartment.img} alt="" />
                <h3> {oneApartment.title} </h3>
                <p>Price: {oneApartment.pricePerMonth} $</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default ApartmentsPage;
