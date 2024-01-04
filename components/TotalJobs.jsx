'use client'
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';


const TotalJobs = ({ bookings }) => {
    const [totalJobsDone, setTotalJobsDone] = useState(0);
    const [totalJobsLeft, setTotalJobsLeft] = useState(0);

    useEffect(() => {
        const calculateTotalJobs = () => {
            const doneBookings = bookings.filter((booking) => booking.completed);
            const remainingBookings = bookings.filter((booking) => !booking.completed);

            setTotalJobsDone(doneBookings.length);
            setTotalJobsLeft(remainingBookings.length);
        };

        calculateTotalJobs();
    }, [bookings]);

    return (
        <Card sx={{ height: 200 }} className="p-4 border border-slate-300">

            <div>
                <strong>{totalJobsDone}</strong>
                <p>jobs done</p>
            </div>
            <div>
                <strong>{totalJobsLeft}</strong>
                <p>jobs left</p>
            </div>
        </Card>
    );
};

export default TotalJobs;
