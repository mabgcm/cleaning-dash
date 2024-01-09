'use client';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';

const TotalJobs = ({ bookings }) => {
    const [totalJobsDone, setTotalJobsDone] = useState({ today: 0, week: 0, month: 0 });
    const [totalJobsLeft, setTotalJobsLeft] = useState({ today: 0, week: 0, month: 0 });

    useEffect(() => {
        const calculateTotalJobs = () => {
            const currentDate = new Date();
            const startOfWeek = new Date(currentDate);
            const endOfWeek = new Date(currentDate);
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
            endOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7);

            const todayBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && isSameDay(bookingDate, currentDate);
            });
            console.log('Today B', todayBookings)

            const weekBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && bookingDate >= startOfWeek && bookingDate <= endOfWeek;
            });
            console.log('Week B', weekBookings)

            const monthBookings = bookings.filter((booking) => {
                const bookingDate = new Date(booking.date);
                return booking.completed && bookingDate >= startOfMonth && bookingDate <= endOfMonth;
            });
            console.log('Month B', monthBookings)

            setTotalJobsDone({
                today: todayBookings.length,
                week: weekBookings.length,
                month: monthBookings.length,
            });

            const remainingToday = bookings.filter((booking) => !booking.completed && isSameDay(new Date(booking.date), currentDate)).length;
            const remainingWeek = bookings.filter((booking) => !booking.completed && isWithinRange(new Date(booking.date), startOfWeek, endOfWeek)).length;
            const remainingMonth = bookings.filter((booking) => !booking.completed && isWithinRange(new Date(booking.date), startOfMonth, endOfMonth)).length;

            setTotalJobsLeft({
                today: remainingToday,
                week: remainingWeek,
                month: remainingMonth,
            });
        };

        calculateTotalJobs();
    }, [bookings]);

    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    };

    const isWithinRange = (date, start, end) => {
        return date >= start && date <= end;
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