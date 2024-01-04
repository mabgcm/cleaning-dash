'use client'
import React, { useEffect, useState } from 'react';
import { parse, format } from 'date-fns';
import Card from '@mui/material/Card';



const TotalAmount = ({ bookings }) => {
    const [monthlyTotals, setMonthlyTotals] = useState({});
    const [totalAllMonths, setTotalAllMonths] = useState(0);

    // Function to calculate monthly totals
    const calculateMonthlyTotals = (bookings) => {
        const totals = {};
        let totalAmountAllMonths = 0;

        bookings.forEach((booking) => {
            if (booking.paid) {
                const date = parse(booking.date, "EEEE, MMMM dd, yyyy 'at' hh:mm a", new Date());
                const month = format(date, 'MMMyy');

                if (!totals[month]) {
                    totals[month] = 0;
                }

                totals[month] += booking.totalAmount;
                totalAmountAllMonths += booking.totalAmount;
            }
        });

        setTotalAllMonths(totalAmountAllMonths);
        return totals;
    };

    useEffect(() => {
        const totals = calculateMonthlyTotals(bookings);
        setMonthlyTotals(totals);
    }, [bookings]);

    return (
        <Card
            sx={{ height: 200 }}
            className="p-4 border border-slate-300">
            <div>
                <h4>Revenue:</h4>
            </div>
            <div>
                <div>
                    <strong>{totalAllMonths}</strong>

                </div>
                {Object.keys(monthlyTotals).map((month) => (
                    <div key={month}>
                        <strong>{`${month}: `}</strong>
                        {monthlyTotals[month]}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TotalAmount;
