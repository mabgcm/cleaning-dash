'use client'
import React, { useEffect, useState } from 'react';

const getBookings = async () => {
    try {
        const res = await fetch("https://cleaning-dash.vercel.app/api/bookings", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        // Ensure that the 'bookings' property is present in the data, otherwise default to an empty array
        const bookings = data && data.bookings ? data.bookings : [];

        return bookings;
    } catch (error) {
        console.log("Error loading bookings: ", error);
        return []; // Return an empty array in case of an error
    }
};

export default function BookingList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const bookingsData = await getBookings();
            setBookings(bookingsData);
        };

        fetchData();
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    return (
        <>
            {bookings.map((b) => (
                <div
                    key={b._id}
                    className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                >
                    <div>
                        <h2 className="font-bold text-2xl">{b.name}</h2>
                        <div>{b.totalAmount}</div>
                    </div>

                    <div className="flex gap-2">{/* Add your content here */}</div>
                </div>
            ))}
        </>
    );
}
