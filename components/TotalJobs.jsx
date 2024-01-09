'use client'
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const TotalJobs = ({ bookings }) => {
    const [totalJobs, setTotalJobs] = useState(0);

    // Function to calculate total number of jobs
    const calculateTotalJobs = (bookings) => {
        let total = 0;

        bookings.forEach((booking) => {
            if (booking) {
                total += 1;
            }
        });

        setTotalJobs(total);
        return total;
    };

    useEffect(() => {
        console.log('TotalAmount - Bookings:', bookings);
        const total = calculateTotalJobs(bookings);
        setTotalJobs(total);
    }, [bookings]);

    return (
        <Card
            sx={{ height: 200, bgcolor: 'primary.main' }}
            className="p-4 border border-slate-300">
            <div>
                {/* <h4>Total Jobs:</h4> */}
            </div>
            <div>
                <Box sx={{ color: '#fff', fontSize: 26, fontWeight: 'bold', align: 'center' }}>
                    <p>{totalJobs}</p>
                    <p sx={{ fontSize: 8 }}>Total Jobs</p>
                </Box>
            </div>
        </Card>
    );
};

export default TotalJobs;
