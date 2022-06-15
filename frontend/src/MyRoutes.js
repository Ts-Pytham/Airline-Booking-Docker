import {React, useState} from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import {Routes, Route} from "react-router-dom";
import AirlineSearch from './components/AirlineSearch';
import AirlineSearchResult from './components/AirlineSearchResult';

const MyRoutes = () =>{

    const [search, setSearch] = useState([]);

    const navigate = useNavigate();
    
    async function handleEvent(departureAirport, arrivalAirport, departureDate){
      if(departureAirport !== '' && arrivalAirport !== ''){
        const response = await fetch(`https://airline-pytham-app.azurewebsites.net/catalog/?departureAirportCode=${departureAirport}&arrivalAirportCode=${arrivalAirport}&departureDate=${departureDate}`);
        if(response.ok){
          
          const flights = await response.json();
          console.log(flights);
          setSearch(flights);
          navigate("/search");
        }
        else{
          alert("No hay ningún vuelo para ese origen y destino en esa fecha");
        }
        
    } else {
      alert('Uno de los campos está vacío, por favor completelo');
    }
  }

    return(
        <>
        <Routes>
            <Route path="/" element={<AirlineSearch handleEvent={handleEvent}/>} />
            <Route path="/search" element={<AirlineSearchResult data={search}/>} />
        </Routes>
        </>
    )
};

export default MyRoutes;