import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Grid } from "@mui/material";
import CardAirline from "./CardAirline";



const AirlineSearchResult = (props) =>{
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                <TextField
                        disabled
                        id="departure-airport"
                        label="From"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"/>
                </Grid>
                
                <Grid item xs={3} md={3}>
                    <TextField
                        disabled
                        id="arrival-airport"
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
                            id="departure-date"
                            label="Pick a date"
                            inputFormat="MM/dd/yyyy"
                            renderInput={(params) => <TextField {...params} variant="standard"/> }/>
                        </LocalizationProvider> 
                </Grid>

                <Grid item xs={3} md={3}>
                    <TextField
                        id="departure-airport"
                        label="To"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"/>
                </Grid>

            </Grid>

            <Typography variant="h4" gutterBottom color="primary" marginTop={10}>
                Select your flight
            </Typography>

            <CardAirline marginTop="30" marginBottom="10" flightNumber="123" ticketPrice="200" departureAirportCode="LGW" arrivalAirportCode="MAD" />
            
            <CardAirline/>


        </>
    )

}

export default AirlineSearchResult;