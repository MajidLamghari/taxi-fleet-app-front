import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment'
import axios from 'axios'

const RideBox = () => {
// Intialize driversList state
const[drivesList, setDrivesList] = useState([{
    "id": 0,
    "distance": 0,
    "startTime": "0000-00-00T00:00:00.000Z",
    "duration": 0
}]);

// PriceCalculator that calculate price of drive using this rule
const PriceCalculator = (distance:number, startTime:string) => {
    let hour = moment(startTime).hours() - 1;
    console.log(hour + " " + distance);
    let price = hour > 20 && hour < 6 ? 1+(distance/(1/5))*0.50 + 1.50 : (hour > 16 && hour < 19 ? 1+(distance/(1/5))*0.50 + 0.50 : 1+(distance/(1/5))*0.50);
    return price; 
}

// DurationCalculator that display ride duration and calculate end of time of the ride
const DurationCalculator = (duration:number, startTime:string, id:string) => {
     let rideDuration = moment.utc(duration*1000).format("HH:mm:ss");
     let endOfTimeOfRide = moment(startTime).add(duration,'seconds').format();
     alert(rideDuration  + "-" + endOfTimeOfRide);

     // Add CLICKED the the box after a click event
     if (document.getElementById(id)!.innerHTML.indexOf("CLICKED") === -1)
     document.getElementById(id)!.innerHTML = "CLICKED &nbsp" + document.getElementById(id)!.innerHTML;
     
}

useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + 'rides').then((res) => {
        setDrivesList(res.data);
    })
},[]);
    return (
        <div>
            {
                drivesList.map((ride, index) => <Box id={index.toString()} key={index} border={2} borderRadius={3} borderColor="gray" height={50} width={450} m={1} display="flex" justifyContent="center" alignItems="center" component="div" bgcolor={ride.distance > 2 ? "#ed5c58" : "#fbe3b9"} color={ride.distance > 2 ? "white" : "black"} onClick={() => DurationCalculator(ride.duration, ride.startTime, index.toString())}>
                    <h5>Ride ID is : {ride.id}, the price is : {PriceCalculator(ride.distance, ride.startTime)} €</h5>
                    </Box> )
                }
        </div>
    );
};

export default RideBox;