import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import './App.css';
import AirlineSearch from './components/AirlineSearch';
import AirlineSearchResult from './components/AirlineSearchResult';
import MyRoutes from './MyRoutes';

function App() {
  return (
    <div className="App">
     <MyRoutes />
    </div>
  );
}

export default App;
