'use client'
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const TotalJobs = ({ bookings }) => {
    const [totalJobs, setTotalJobs] = useState(0);
    const [completedJobs, setCompletedJobs] = useState(0);
    const [notCompletedJobs, setNotCompletedJobs] = useState(0);

    // Function to calculate total number of jobs and completed/not completed jobs
    const calculateTotalJobs = (bookings) => {
        let total = 0;
        let completed = 0;
        let notCompleted = 0;

        bookings.forEach((booking) => {
            if (booking) {
                total += 1;
                if (booking.completed) {
                    completed += 1;
                } else {
                    notCompleted += 1;
                }
            }
        });

        setTotalJobs(total);
        setCompletedJobs(completed);
        setNotCompletedJobs(notCompleted);

        return { total, completed, notCompleted };
    };

    useEffect(() => {
        console.log('TotalAmount - Bookings:', bookings);
        const { total, completed, notCompleted } = calculateTotalJobs(bookings);
        setTotalJobs(total);
        setCompletedJobs(completed);
        setNotCompletedJobs(notCompleted);
    }, [bookings]);

    return (
        <Card
            sx={{ height: 200, bgcolor: 'primary.main' }}
            className="p-4 border border-slate-300">
            <div>
                {/* <h4>Total Jobs:</h4> */}
            </div>
            <div>
                <Box sx={{ color: '#fff', textAlign: 'center', display: 'flex', flexDirection: 'row', }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{totalJobs}</Typography>
                    <Typography sx={{ fontSize: 12 }}>Total Jobs</Typography>

                </Box>

                <Box>
                    <p>{completedJobs}</p>
                    <p sx={{ fontSize: 8 }}>Completed Jobs</p>
                    <p>{notCompletedJobs}</p>
                    <p sx={{ fontSize: 8 }}>Not Completed Jobs</p>
                </Box>

            </div>
        </Card>
    );
};

export default TotalJobs;
