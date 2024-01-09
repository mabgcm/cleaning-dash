'use client'
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const TotalJobs = ({ bookings }) => {
    const [totalJobs, setTotalJobs] = useState(0);
    const [completedJobs, setCompletedJobs] = useState(0);
    const [notCompletedJobs, setNotCompletedJobs] = useState(0);
    const [completedThisMonth, setCompletedThisMonth] = useState(0);
    const [notCompletedThisMonth, setNotCompletedThisMonth] = useState(0);

    // Function to calculate total number of jobs and completed/not completed jobs
    const calculateTotalJobs = (bookings) => {
        let total = 0;
        let completed = 0;
        let notCompleted = 0;
        let completedThisMonthCount = 0;
        let notCompletedThisMonthCount = 0;

        const firstDayOfMonth = startOfMonth(new Date());
        const lastDayOfMonth = endOfMonth(new Date());

        bookings.forEach((booking) => {
            if (booking) {
                total += 1;
                const bookingDate = new Date(booking.date); // Convert the date string to a Date object
                if (booking.completed) {
                    completed += 1;
                    if (isWithinInterval(bookingDate, { start: firstDayOfMonth, end: lastDayOfMonth })) {
                        completedThisMonthCount += 1;
                    }
                } else {
                    notCompleted += 1;
                    if (isWithinInterval(bookingDate, { start: firstDayOfMonth, end: lastDayOfMonth })) {
                        notCompletedThisMonthCount += 1;
                    }
                }
            }
        });

        setTotalJobs(total);
        setCompletedJobs(completed);
        setNotCompletedJobs(notCompleted);
        setCompletedThisMonth(completedThisMonthCount);
        setNotCompletedThisMonth(notCompletedThisMonthCount);

        return { total, completed, notCompleted, completedThisMonthCount, notCompletedThisMonthCount };
    };

    useEffect(() => {
        console.log('TotalAmount - Bookings:', bookings);
        const {
            total,
            completed,
            notCompleted,
            completedThisMonthCount,
            notCompletedThisMonthCount,
        } = calculateTotalJobs(bookings);
        setTotalJobs(total);
        setCompletedJobs(completed);
        setNotCompletedJobs(notCompleted);
        setCompletedThisMonth(completedThisMonthCount);
        setNotCompletedThisMonth(notCompletedThisMonthCount);
    }, [bookings]);

    return (
        <Card
            sx={{ height: 250, bgcolor: 'primary.main' }}
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
                    </Box>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{notCompletedJobs}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Queued</Typography>
                    </Box>
                </Box>
                <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{completedThisMonth}</Typography>
                    <Typography sx={{ fontSize: 12 }}>Completed This Month</Typography>
                </Box>
                <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{notCompletedThisMonth}</Typography>
                    <Typography sx={{ fontSize: 12 }}>Queued This Month</Typography>
                </Box>
            </div>
        </Card>
    );
};

export default TotalJobs;
