import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiURL = process.env.REACT_APP_SERVER_URL;

function ApartmentDetailsPage() {
const [apartment, setApartment] = useState(null)
const [isLoading, setIsLoading] = useState(true)

const {apartmentId} = useParams();
const navigate = useNavigate();

useEffect(() => {

    const fetchData = async () => {
        const response = await axios.get(`${apiURL}/api/apartments/${apartmentId}`); // https://ironbnb-m3.herokuapp.com/apartments/123abc
        const oneApartmentData = response.data;
  
        setApartment(oneApartmentData);
        setIsLoading(false);
      };
  
      fetchData();
    }, [])
  

if (isLoading) return <img src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" alt="spinner" />
    
return (
    <div>
    <h2>Apartment Details</h2>

    <img src={apartment.image} alt="apartment" />
    <h3>{ apartment.name}</h3>
    <p>Price: {apartment.price} </p>
    
    <button onClick={() => navigate(-1) }>Back</button>
  </div>
);
}


export default ApartmentDetailsPage;