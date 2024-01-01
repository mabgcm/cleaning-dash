'use client'
import React, { useEffect, useState } from 'react';

const TotalAmount = ({ bookings }) => {
    const [monthlyTotals, setMonthlyTotals] = useState({});

    // Function to calculate monthly totals
    const calculateMonthlyTotals = (bookings) => {
        const totals = {};

        bookings.forEach((booking) => {
            const { month, totalAmount } = booking;

            if (!totals[month]) {
                totals[month] = 0;
            }

            totals[month] += totalAmount;
        });

        return totals;
    };

    // Update monthly totals when bookings change
    useEffect(() => {
        const totals = calculateMonthlyTotals(bookings);
        setMonthlyTotals(totals);
    }, [bookings]);

    return (
        <div className="p-4 border border-slate-300">
            <div>
                <h4>Total Amount Month by Month:</h4>
            </div>
            <div>
                {Object.keys(monthlyTotals).map((month) => (
                    <div key={month}>
                        <strong>{`Month ${month}: `}</strong>
                        {monthlyTotals[month]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TotalAmount;
