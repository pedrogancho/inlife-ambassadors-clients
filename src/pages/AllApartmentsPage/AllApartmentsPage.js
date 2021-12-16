import { useState, useEffect } from "react";
import axios from "axios";
import AddApartmentPage from "../AddApartmentPage/AddApartmentPage";

const apiURL = "http://localhost:5005";

function ApartmentsPage() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiURL}/api/apartments`);
      const apartmentsData = response.data;
      console.log(apartmentsData);
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
            <div key={oneApartment._id} className="card">
              <img src={oneApartment.img} alt="" />
              <h3> {oneApartment.title} </h3>
              <p>Price: {oneApartment.pricePerDay} $</p>
            </div>
          );
        })}
    </div>
  );
}

export default ApartmentsPage;
