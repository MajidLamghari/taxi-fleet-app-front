import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment'
import axios from 'axios'

const RideBox = () => {
    const [drivesList, setDrivesList] = useState<any>([]);

    const handleClick = (id: number) => {
        let ride: any = (drivesList || []).find((r: any) => r.id === id);
        const { duration, startTime } = ride;
        let rideDuration = moment.utc(duration * 1000).format("HH:mm:ss");
        let endOfTimeOfRide = moment(startTime).add(duration, 'seconds').format();
        alert(rideDuration + "-" + endOfTimeOfRide);
        const newRides = drivesList.map((ride: any) => {
            if (ride.id === id) ride.isClicked = true;
            return ride;
        })
        setDrivesList(newRides);
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST + 'rides').then((res) => {
            setDrivesList(res.data.rides);
        })
    }, []);

    return (
        <div>
            {
                drivesList.length > 0 &&

                drivesList.map((ride: any, index: number) =>
                    <Box key={index} border={2} borderRadius={3} borderColor="gray" height={50} width={450} m={1} display="flex" justifyContent="center" alignItems="center" component="div" bgcolor={ride.distance > 2 ? "#ed5c58" : "#fbe3b9"} color={ride.distance > 2 ? "white" : "black"} onClick={() => handleClick(ride.id)}>
                        <h5>{ride.isClicked && "CLICKED "} Ride ID is : {ride.id}, the price is : {ride.price} €</h5>
                    </Box>)
            }
        </div>
    );
};

export default RideBox;