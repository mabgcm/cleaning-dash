'use client';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import {
    startOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isWithinInterval as isWithinIntervalFn, // Rename the custom function
    isSameDay
} from 'date-fns';

const TotalJobs = ({ bookings }) => {
    const [totalJobsDone, setTotalJobsDone] = useState({ today: 0, week: 0, month: 0 });
    const [totalJobsLeft, setTotalJobsLeft] = useState({ today: 0, week: 0, month: 0 });

    useEffect(() => {
        const calculateTotalJobs = () => {
            const currentDate = new Date();
            const startOfToday = startOfDay(currentDate);
            const startOfThisWeek = startOfWeek(currentDate);
            const endOfThisWeek = endOfWeek(currentDate);
            const startOfThisMonth = startOfMonth(currentDate);
            const endOfThisMonth = endOfMonth(currentDate);

            const todayBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && isSameDay(bookingDate, currentDate);
            });

            const weekBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && isWithinIntervalFn(bookingDate, { start: startOfThisWeek, end: endOfThisWeek });
            });

            const monthBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && isWithinIntervalFn(bookingDate, { start: startOfThisMonth, end: endOfThisMonth });
            });

            setTotalJobsDone({
                today: todayBookings.length,
                week: weekBookings.length,
                month: monthBookings.length,
            });

            const remainingToday = bookings.filter((booking) => !booking.completed && isSameDay(new Date(booking.date), currentDate)).length;
            const remainingWeek = bookings.filter((booking) => !booking.completed && isWithinIntervalFn(new Date(booking.date), { start: startOfThisWeek, end: endOfThisWeek })).length;
            const remainingMonth = bookings.filter((booking) => !booking.completed && isWithinIntervalFn(new Date(booking.date), { start: startOfThisMonth, end: endOfThisMonth })).length;

            setTotalJobsLeft({
                today: remainingToday,
                week: remainingWeek,
                month: remainingMonth,
            });
        };

        calculateTotalJobs();
    }, [bookings]);

    return (
        <Card sx={{ height: 200 }} className="p-4 border border-slate-300">
            <div>
                <p><strong>{totalJobsDone.today}</strong> jobs done today</p>
            </div>
            <div>
                <p><strong>{totalJobsLeft.today}</strong> jobs left today</p>
            </div>
            <div>
                <p><strong>{totalJobsDone.week}</strong> jobs done this week</p>
            </div>
            <div>
                <p><strong>{totalJobsLeft.week}</strong> jobs left this week</p>
            </div>
            <div>
                <p><strong>{totalJobsDone.month}</strong> jobs done this month</p>
            </div>
            <div>
                <p><strong>{totalJobsLeft.month}</strong> jobs left this month</p>
            </div>
        </Card>
    );
};

export default TotalJobs;
