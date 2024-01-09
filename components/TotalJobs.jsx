'use client';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, isSameDay } from 'date-fns';

const TotalJobs = ({ bookings }) => {
    const [totalJobsDone, setTotalJobsDone] = useState({ today: 0, week: 0, month: 0 });
    const [totalJobsLeft, setTotalJobsLeft] = useState({ today: 0, week: 0, month: 0 });

    useEffect(() => {
        const calculateTotalJobs = () => {
            const currentDate = new Date();

            // Filter bookings for today
            const todayBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && isSameDay(bookingDate, currentDate);
            });

            // Filter bookings for this week
            const startOfWeekDate = getStartOfWeek(currentDate);
            const endOfWeekDate = getEndOfWeek(currentDate);
            const weekBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && isWithinInterval(bookingDate, { start: startOfWeekDate, end: endOfWeekDate });
            });

            // Filter bookings for this month
            const startOfMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const monthBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && isWithinInterval(bookingDate, { start: startOfMonthDate, end: endOfMonthDate });
            });

            setTotalJobsDone({
                today: todayBookings.length,
                week: weekBookings.length,
                month: monthBookings.length,
            });

            // Calculate total jobs left for today, this week, and this month
            const remainingToday = bookings.filter((booking) => !booking.completed && isSameDay(new Date(booking.date), currentDate)).length;
            const remainingWeek = bookings.filter((booking) => !booking.completed && isWithinInterval(new Date(booking.date), { start: startOfWeekDate, end: endOfWeekDate })).length;
            const remainingMonth = bookings.filter((booking) => !booking.completed && isWithinInterval(new Date(booking.date), { start: startOfMonthDate, end: endOfMonthDate })).length;

            setTotalJobsLeft({
                today: remainingToday,
                week: remainingWeek,
                month: remainingMonth,
            });
        };

        calculateTotalJobs();
    }, [bookings]);

    // Helper function to check if a date is within a range (inclusive)
    const isWithinInterval = (date, start, end) => {
        return date >= start && date <= end;
    };

    // Helper function to get the start of the week (Monday)
    const getStartOfWeek = (date) => {
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(date.setDate(diff));
    };

    // Helper function to get the end of the week (Sunday)
    const getEndOfWeek = (date) => {
        const dayOfWeek = date.getDay();
        const diff = date.getDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek); // Adjust when day is not Sunday
        return new Date(date.setDate(diff));
    };

    return (
        <Card sx={{ height: 200 }} className="p-4 border border-slate-300">
            <div>
                <strong>{totalJobsDone.today}</strong>
                <p>jobs done today</p>
            </div>
            <div>
                <strong>{totalJobsLeft.today}</strong>
                <p>jobs left today</p>
            </div>
            <div>
                <strong>{totalJobsDone.week}</strong>
                <p>jobs done this week</p>
            </div>
            <div>
                <strong>{totalJobsLeft.week}</strong>
                <p>jobs left this week</p>
            </div>
            <div>
                <strong>{totalJobsDone.month}</strong>
                <p>jobs done this month</p>
            </div>
            <div>
                <strong>{totalJobsLeft.month}</strong>
                <p>jobs left this month</p>
            </div>
        </Card>
    );
};

export default TotalJobs;
