'use client'
import React, { useEffect, useState } from 'react';
import { format, isThisWeek, isThisMonth, isThisYear } from 'date-fns';

const TotalJobs = ({ bookings }) => {
    const [jobsThisWeek, setJobsThisWeek] = useState(0);
    const [jobsThisMonth, setJobsThisMonth] = useState(0);
    const [jobsThisYear, setJobsThisYear] = useState(0);

    useEffect(() => {
        const calculateTotalJobs = () => {
            const today = new Date();

            const weeklyJobs = bookings.filter((booking) => isThisWeek(new Date(booking.date), { weekStartsOn: 1 }));
            const monthlyJobs = bookings.filter((booking) => isThisMonth(new Date(booking.date)));
            const yearlyJobs = bookings.filter((booking) => isThisYear(new Date(booking.date)));

            setJobsThisWeek(weeklyJobs.length);
            setJobsThisMonth(monthlyJobs.length);
            setJobsThisYear(yearlyJobs.length);
        };

        calculateTotalJobs();
    }, [bookings]);

    return (
        <div className="p-4 border border-slate-300">
            <h4>Total Jobs:</h4>
            <div>
                <strong>This Week ({format(new Date(), 'MMM dd, yyyy')}):</strong> {jobsThisWeek}
            </div>
            <div>
                <strong>This Month ({format(new Date(), 'MMMM yyyy')}):</strong> {jobsThisMonth}
            </div>
            <div>
                <strong>This Year ({format(new Date(), 'yyyy')}):</strong> {jobsThisYear}
            </div>
        </div>
    );
};

export default TotalJobs;
