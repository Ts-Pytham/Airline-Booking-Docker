import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import { Grid, Card, CardContent, Divider } from "@mui/material";
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const CardAirline = (props) =>{
    return(
        <div style={{marginTop: `${props.marginTop}px`, marginBottom: `${props.marginBottom}px`, marginLeft: `20%`, marginRight: `20%`}}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            
                            <Typography sx={{ fontSize: 16 }} gutterBottom>
                                DEPARTURE
                            </Typography>

                            <Typography sx={{ fontSize: 20 }} color="primary" gutterBottom>
                                10:00
                            </Typography>
                            
                        </Grid>

                        <Grid item xs={6}>

                            <Typography sx={{ fontSize: 16 }} gutterBottom>
                                ARRIVAL
                            </Typography>

                            <Typography sx={{ fontSize: 20 }} color="primary" gutterBottom>
                                12:15
                            </Typography>

                        </Grid>  

                    </Grid>


                    <Divider />

                    <Grid container spacing={2}  justifyContent="space-evenly" marginTop={1} marginBottom={2}>

                        <Grid item marginLeft={4}>
                            <FlightTakeoffOutlinedIcon sx={{fontSize: 30 }} color="primary" />
                            <Typography sx={{ fontSize: 16 }} color="primary" gutterBottom>
                                {props.departureAirportCode}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <AccessTimeIcon sx={{fontSize: 30 }} color="primary" />
                            <Typography sx={{ fontSize: 16 }} color="primary" gutterBottom>
                                2h15m
                            </Typography>
                        </Grid>

                        <Grid item marginRight={4}>
                            <FlightLandOutlinedIcon sx={{fontSize: 30 }} color="primary" />
                            <Typography sx={{ fontSize: 16 }} color="primary" gutterBottom>
                                {props.arrivalAirportCode}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>

                        <Grid item xs={6}>
                            <Typography sx={{ fontSize: 16 }} gutterBottom>
                                $ {props.ticketPrice}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography sx={{ fontSize: 16 }} gutterBottom>
                                Flight {props.flightNumber}
                            </Typography>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </div>
    )

}

export default CardAirline;