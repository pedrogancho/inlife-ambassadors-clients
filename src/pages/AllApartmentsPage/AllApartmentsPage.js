import { useState, useEffect } from "react";
import axios from "axios";
import AddApartmentPage from "../AddApartmentPage/AddApartmentPage";
import { Link, useNavigate } from "react-router-dom";

const apiURL = process.env.REACT_APP_SERVER_URL;

function ApartmentsPage() {
  const [apartments, setApartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiURL}/api/apartments`);
      const apartmentsData = response.data;
      console.log(response.data);

      setApartments(apartmentsData);
    };

    fetchData();
  }, []);

  const handleClick = () => {
    console.log("clicado");
    navigate("/addapartment");
  };

  return (
    <div>
      <h3>List of apartments</h3>
      <button onClick={handleClick}>Add a new apartment</button>

      {apartments &&
        apartments.map((oneApartment) => {
          return (
            <Link
              to={"/apartment/details/" + oneApartment._id}
              key={oneApartment._id}
            >
              <div className="card">
                <img src={oneApartment.image} alt="" />
                <h3> {oneApartment.name} </h3>
                <p>Price: {oneApartment.price} €</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default ApartmentsPage;
