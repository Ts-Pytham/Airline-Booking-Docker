import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Grid } from "@mui/material";
import CardAirline from "./CardAirline";
import NavBar from "./NavBar";



const AirlineSearchResult = (props) =>{
    
    const getTimeDifference = (date1, date2) => {
        const diff = date1.getTime() - date2.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        return `${hours}h ${minutes}m`;
    };

    const formatDate = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
    const flights = props.data.map(flight => <CardAirline marginTop="30" marginBottom="10" 
                                    ticketPrice={flight.ticketPrice} departureAirportCode={flight.departureAirportCode}
                                    arrivalAirportCode={flight.arrivalAirportCode} flightNumber={flight.flightNumber} 
                                    departureAirportHour={formatDate(new Date(flight.departureDate))}
                                    arrivalAirportHour={formatDate(new Date(flight.arrivalDate))}
                                    EstimatedTime={getTimeDifference(new Date(flight.arrivalDate), new Date(flight.departureDate))}/>);
    return(
        <div style={{padding:"20px 0px"}} >
            
            <Grid container spacing={2} >
                <Grid item xs={3} md={3}>
                <TextField
                        disabled
                        id="departureAirport"
                        label="From"
                        value={props.data[0].departureAirportCode}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"/>
                </Grid>
                
                <Grid item xs={3} md={3}>
                    <TextField
                        disabled
                        id="arrivalAirport"
                        name="arrivalAirport"
                        value={props.data[0].arrivalAirportCode}
                        label="To"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"/>
                </Grid>

                <Grid item xs={3} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                            disabled
                            id="departureDate"
                            name="departureDate"
                            value={props.data[0].departureDate}
                            label="Pick a date"
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} variant="standard"/> }/>
                        </LocalizationProvider> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <Button component="a" href="/">
                        Atrás
                    </Button>
                </Grid>

            </Grid>

            <Typography variant="h4" gutterBottom color="primary" marginTop={10}>
                Select your flight
            </Typography>

            {
                flights.length > 0 && flights
            }

        </div>
    )

}

export default AirlineSearchResult;