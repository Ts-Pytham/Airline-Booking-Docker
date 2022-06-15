import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Grid } from "@mui/material";
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const AirlineSearch = (props) => {

    const initialDefaults = {departureAirport : '', arrivalAirport : ''}; // valores por defecto de los campos de texto
    const [defaults, setDefaults] = useState(initialDefaults); // estado de los campos de texto
    

    const [valueDate, setValueDate] = useState(new Date()); // valor inicial de la fecha
    
    const handleDateChange = (newValueDate) => { // funcion que se ejecuta al cambiar la fecha
        setValueDate(newValueDate);
    };

    
    const handleInputChange = ev => { // funcion que se ejecuta al cambiar el input

        setDefaults(
        {
            ...defaults,
            [ev.target.name] : ev.target.value
        });        

    };


    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <div>
                <Typography variant="h3" gutterBottom color="primary">
                    Where next?
                </Typography>

                <Grid container spacing={3}>
                    
                    <Grid item xs={12} md={12}>
                    <FlightTakeoffOutlinedIcon sx={{fontSize: 60 }} color="primary" />
                        <TextField required id="departureAirport" name="departureAirport" label="Departure Airport" variant="standard" onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <FlightLandOutlinedIcon sx={{fontSize: 60 }} color="primary"/>
                        <TextField required id="arrivalAirport" name="arrivalAirport" label="Arrival airport" variant="standard" onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <InsertInvitationIcon sx={{fontSize: 60 }} color="primary" />
                            <MobileDatePicker
                            id="departureDate"
                            label="Pick a date"
                            value={valueDate}
                            onChange={handleDateChange}
                            inputFormat="EEEE, MMM d, yyyy"
                            renderInput={(params) => <TextField {...params} variant="standard"/> }/>
                        </LocalizationProvider>  
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button style={{color: "white"}} variant="contained" color="secondary" onClick={() => {props.handleEvent(defaults.departureAirport, defaults.arrivalAirport, valueDate.toLocaleDateString('en-CA').replaceAll('/','-'))}}>Search Flights <ArrowForwardIosIcon/></Button>
                    </Grid>
                </Grid>
            </div>       
        </div>
    )
}


export default AirlineSearch;