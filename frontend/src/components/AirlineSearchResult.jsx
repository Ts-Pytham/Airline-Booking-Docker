import Typography from '@mui/material/Typography';
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
    
    const flights = props.data.map((flight, index) => <CardAirline key={index} marginTop="30" marginBottom="10" 
                                    ticketPrice={flight.ticketPrice} departureAirportCode={flight.departureAirportCode}
                                    arrivalAirportCode={flight.arrivalAirportCode} flightNumber={flight.flightNumber} 
                                    departureAirportHour={formatDate(new Date(flight.departureDate))}
                                    arrivalAirportHour={formatDate(new Date(flight.arrivalDate))}
                                    EstimatedTime={getTimeDifference(new Date(flight.arrivalDate), new Date(flight.departureDate))}/>)
                                .sort((a, b) => {   
                                    if(a.props.flightNumber === b.props.flightNumber) return 0;
                                    else if(a.props.flightNumber < b.props.flightNumber) return -1;
                                    else return 1;
                                });
    return(
        
        <div>
            <NavBar departureAirportCode={props.data[0].departureAirportCode} arrivalAirportCode={props.data[0].arrivalAirportCode}
                    departureDate={props.data[0].departureDate}/>

            <div style={{padding:"20px 0px"}} >
            <Typography variant="h4" gutterBottom color="primary" marginTop={10}>
                Select your flight
            </Typography>

            {
                flights.length > 0 && flights
            }
            </div>

        </div>
    )

}

export default AirlineSearchResult;