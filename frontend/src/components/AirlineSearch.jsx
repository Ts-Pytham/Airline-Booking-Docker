import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Grid } from "@mui/material";

const AirlineSearch = (props) =>{

    return(
        <>
            <Typography variant="h6" gutterBottom color="#00F890">
                Where next?
            </Typography>

            
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField required id="departure-airport" label="Departure Airport" variant="standard" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required id="arrival-airport" label="Arrival airport" variant="standard" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
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