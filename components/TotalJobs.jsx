'use client'
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TotalJobs = ({ bookings }) => {
    const [totalJobs, setTotalJobs] = useState(0);
    const [completedJobs, setCompletedJobs] = useState(0);
    const [notCompletedJobs, setNotCompletedJobs] = useState(0);
    const [jobsThisMonth, setJobsThisMonth] = useState({ completed: 0, notCompleted: 0 });

    // Function to calculate total number of jobs, completed/not completed jobs, and jobs for the current month
    const calculateTotalJobs = (bookings) => {
        let total = 0;
        let completed = 0;
        let notCompleted = 0;
        let thisMonth = 0;

        const currentMonth = new Date().getMonth() + 1; // January is 0, so we add 1

        bookings.forEach((booking) => {
            if (booking) {
                total += 1;

                // Check if booking is in the current month
                const bookingMonth = new Date(booking.createdAt).getMonth() + 1;
                if (bookingMonth === currentMonth) {
                    thisMonth += 1;
                }

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
        setJobsThisMonth({ completed: thisMonth, notCompleted: total - thisMonth });

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
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{completedJobs}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Completed</Typography>
                    </Box>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', mx: 2 }}>
                        <Typography sx={{ fontSize: 26, fontWeight: 'bold' }}>{totalJobs}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Total Jobs</Typography>
                        <Typography sx={{ fontSize: 12, mt: 1 }}>{jobsThisMonth.completed} Completed This Month</Typography>
                    </Box>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{notCompletedJobs}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Queued</Typography>
                        <Typography sx={{ fontSize: 12, mt: 1 }}>{jobsThisMonth.notCompleted} Queued This Month</Typography>
                    </Box>
                </Box>
            </div>
        </Card>
    );
};

export default TotalJobs;
