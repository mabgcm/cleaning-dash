'use client'
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { parse, format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

const TotalJobs = ({ bookings }) => {
    const [totalJobs, setTotalJobs] = useState(0);
    const [completedJobs, setCompletedJobs] = useState(0);
    const [notCompletedJobs, setNotCompletedJobs] = useState(0);
    const [completedThisMonth, setCompletedThisMonth] = useState(0);
    const [notCompletedThisMonth, setNotCompletedThisMonth] = useState(0);
    const [totalThisMonth, setTotalThisMonth] = useState(0);
    const [completedThisWeek, setCompletedThisWeek] = useState(0);
    const [notCompletedThisWeek, setNotCompletedThisWeek] = useState(0);
    const [totalThisWeek, setTotalThisWeek] = useState(0);

    // Function to calculate total number of jobs and completed/not completed jobs
    const calculateTotalJobs = (bookings) => {
        let total = 0;
        let completed = 0;
        let notCompleted = 0;
        let completedThisMonthCount = 0;
        let notCompletedThisMonthCount = 0;
        let totalThisMonthCount = 0;
        let completedThisWeekCount = 0;
        let notCompletedThisWeekCount = 0;
        let totalThisWeekCount = 0;

        const firstDayOfMonth = startOfWeek(new Date(), { weekStartsOn: 1 });
        const lastDayOfMonth = endOfWeek(new Date(), { weekStartsOn: 1 });

        const firstDayOfWeek = startOfWeek(new Date());
        const lastDayOfWeek = endOfWeek(new Date());

        bookings.forEach((booking) => {
            if (booking) {
                total += 1;
                const date = parse(booking.date, "EEEE, MMMM dd, yyyy 'at' hh:mm a", new Date());
                const month = format(date, 'MMMyy');

                if (booking.completed) {
                    completed += 1;
                    if (month === format(new Date(), 'MMMyy')) {
                        completedThisMonthCount += 1;
                        totalThisMonthCount += 1;
                    }
                    if (isWithinInterval(date, { start: firstDayOfWeek, end: lastDayOfWeek })) {
                        completedThisWeekCount += 1;
                        totalThisWeekCount += 1;
                    }
                } else {
                    notCompleted += 1;
                    if (month === format(new Date(), 'MMMyy')) {
                        notCompletedThisMonthCount += 1;
                        totalThisMonthCount += 1;
                    }
                    if (isWithinInterval(date, { start: firstDayOfWeek, end: lastDayOfWeek })) {
                        notCompletedThisWeekCount += 1;
                        totalThisWeekCount += 1;
                    }
                }
            }
        });

        setTotalJobs(total);
        setCompletedJobs(completed);
        setNotCompletedJobs(notCompleted);
        setCompletedThisMonth(completedThisMonthCount);
        setNotCompletedThisMonth(notCompletedThisMonthCount);
        setTotalThisMonth(totalThisMonthCount);
        setCompletedThisWeek(completedThisWeekCount);
        setNotCompletedThisWeek(notCompletedThisWeekCount);
        setTotalThisWeek(totalThisWeekCount);

        return {
            total,
            completed,
            notCompleted,
            completedThisMonthCount,
            notCompletedThisMonthCount,
            totalThisMonthCount,
            completedThisWeekCount,
            notCompletedThisWeekCount,
            totalThisWeekCount,
        };
    };

    useEffect(() => {
        console.log('TotalJobs - Bookings:', bookings);
        const {
            total,
            completed,
            notCompleted,
            completedThisMonthCount,
            notCompletedThisMonthCount,
            totalThisMonthCount,
            completedThisWeekCount,
            notCompletedThisWeekCount,
            totalThisWeekCount,
        } = calculateTotalJobs(bookings);

        setTotalJobs(total);
        setCompletedJobs(completed);
        setNotCompletedJobs(notCompleted);
        setCompletedThisMonth(completedThisMonthCount);
        setNotCompletedThisMonth(notCompletedThisMonthCount);
        setTotalThisMonth(totalThisMonthCount);
        setCompletedThisWeek(completedThisWeekCount);
        setNotCompletedThisWeek(notCompletedThisWeekCount);
        setTotalThisWeek(totalThisWeekCount);
    }, [bookings]);

    return (
        <Card
            sx={{ height: 300, bgcolor: 'primary.main' }}
            className="p-4 border border-slate-300">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ color: 'yellow', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
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

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{completedThisMonth}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Completed</Typography>
                    </Box>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', mx: 2 }}>
                        <Typography sx={{ fontSize: 26, fontWeight: 'bold' }}>{totalThisMonth}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Total This Month</Typography>
                    </Box>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{notCompletedThisMonth}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Queued</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{completedThisWeek}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Completed</Typography>
                    </Box>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', mx: 2 }}>
                        <Typography sx={{ fontSize: 26, fontWeight: 'bold' }}>{totalThisWeek}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Total This Week</Typography>
                    </Box>
                    <Box sx={{ color: '#fff', alignItems: 'center', display: 'flex', flexDirection: 'column', }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{notCompletedThisWeek}</Typography>
                        <Typography sx={{ fontSize: 12 }}>Queued</Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default TotalJobs;
