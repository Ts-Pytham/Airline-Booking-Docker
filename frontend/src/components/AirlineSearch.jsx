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


const AirlineSearch = (props) =>{

    return(
        <>
            <Typography variant="h3" gutterBottom color="primary">
                Where next?
            </Typography>

            
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                <FlightTakeoffOutlinedIcon sx={{fontSize: 60 }} color="primary" />
                    <TextField required id="departure-airport" label="Departure Airport" variant="standard" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <FlightLandOutlinedIcon sx={{fontSize: 60 }} color="primary"/>
                    <TextField required id="arrival-airport" label="Arrival airport" variant="standard" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <InsertInvitationIcon sx={{fontSize: 60 }} color="primary" />
                        <MobileDatePicker
                        id="departure-date"
                        label="Pick a date"
                        inputFormat="MM/dd/yyyy"
                        renderInput={(params) => <TextField {...params} variant="standard"/> }/>
                    </LocalizationProvider>  
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button variant="contained" color="success">Search Flights</Button>
                </Grid>
            </Grid>
        
        </>
    )
}

export default AirlineSearch;