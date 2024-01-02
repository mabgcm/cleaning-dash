'use client'
import React, { useEffect, useState } from 'react';

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
        <div className="p-4 border border-slate-300">
            <h4>Total Jobs Done:</h4>
            <div>
                <strong>{totalJobsDone}</strong>
            </div>
            <h4>Total Jobs Left:</h4>
            <div>
                <strong>{totalJobsLeft}</strong>
            </div>
        </div>
    );
};

export default TotalJobs;
