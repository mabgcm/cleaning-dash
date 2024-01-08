'use client'
import React, { useEffect, useState } from 'react';
import { parse, format } from 'date-fns';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';




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
            sx={{ height: 200, bgcolor: 'secondary.main' }}
            className="p-4 border border-slate-300">
            <div>
                {/* <h4>Revenue:</h4> */}
            </div>
            <div>
                <Box sx={{ color: '#fff', fontSize: 26 }}>
                    <p>C$ {totalAllMonths}</p>

                </Box>
                {Object.keys(monthlyTotals).map((month) => (
                    <Box sx={{ color: '#fff', fontSize: 18 }} key={month}>
                        <strong>{`${month}: `}</strong>
                        {monthlyTotals[month]}
                    </Box>
                ))}
            </div>
        </Card>
    );
};

export default TotalAmount;
