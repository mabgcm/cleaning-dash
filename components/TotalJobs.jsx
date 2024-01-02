'use client'
import React, { useEffect, useState } from 'react';

const TotalJobsDone = ({ bookings }) => {
    const [totalJobsDone, setTotalJobsDone] = useState(0);

    useEffect(() => {
        const calculateTotalJobsDone = () => {
            const doneBookings = bookings.filter((booking) => booking.completed);
            setTotalJobsDone(doneBookings.length);
        };

        calculateTotalJobsDone();
    }, [bookings]);

    return (
        <div className="p-4 border border-slate-300">
            <h4>Total Jobs Done:</h4>
            <div>
                <strong>{totalJobsDone}</strong>
            </div>
        </div>
    );
};

export default TotalJobsDone;
