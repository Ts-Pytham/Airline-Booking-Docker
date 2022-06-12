import {React, useState} from 'react';
import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import {Routes, Route} from "react-router-dom";
import './App.css';
import AirlineSearch from './components/AirlineSearch';
import AirlineSearchResult from './components/AirlineSearchResult';
import { useNavigate } from 'react-router-dom';

function App() {
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

  return (
    <div className="App">
      <Routes>
            <Route path="/" element={<AirlineSearch handleEvent={handleEvent}/>} />
            <Route path="/search" element={<AirlineSearchResult data={search}/>} />
        </Routes>
    </div>
  );
}

export default App;
