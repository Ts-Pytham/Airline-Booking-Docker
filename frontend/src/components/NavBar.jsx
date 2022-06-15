import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Grid, TextField, Button } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const NavBar = (props) => {

  return (
    <div>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Grid style={{display:"flex", justifyContent:"center", width:'100%', paddingTop:"10px"}}>
                    <Grid item xs={3} md={3} style={{paddingRight:'2%'}}>
                        <TextField                              
                                id="departureAirport"
                                label="From"
                                value={props.departureAirportCode}
                                InputProps={{ style:{
                                    readOnly: true,
                                    color: '#00F890',
                                }}}
                                variant="standard"/>
                    </Grid>
                    
                    <Grid item xs={3} md={3} style={{paddingRight:'2%'}}>
                        <TextField
                            id="arrivalAirport"
                            name="arrivalAirport"
                            value={props.arrivalAirportCode}
                            label="To"
                            InputProps={{ style:{
                                readOnly: true,
                                color: '#00F890',
                            }}}
                            variant="standard"/>
                    </Grid>

                    <Grid item xs={3} md={3} style={{paddingRight:'2%'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                id="departureDate"
                                name="departureDate"
                                value={props.departureDate}
                                label="Date"
                                inputFormat="EEEE, MMM d, yyyy"
                                renderInput={(params) => 
                                            <TextField {...params} 
                                            variant="standard" 
                                            InputProps={{   
                                                            style:{
                                                            color: '#00F890',
                                                        }}}/> }/>
                            </LocalizationProvider> 
                    </Grid>

                    <Grid item xs={3} md={3} sx={{margin:'10px'}}>
                        <Button component="a" href="/">
                            Atrás
                        </Button>
                    </Grid>

                </Grid>
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default NavBar;