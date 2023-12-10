'use client'
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import BookingDetails from './BookingDetails';

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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const BookingList = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);

    const handleClick = async (id) => {
        try {
            // Fetch details of the selected booking
            const res = await fetch(`https://cleaning-dash.vercel.app/api/bookings/${id}`, {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch booking details");
            }

            const selectedBookingDetails = await res.json();
            setSelectedBooking(selectedBookingDetails.booking);
        } catch (error) {
            console.log("Error loading booking details: ", error);
        }
    };

    // Fetch bookings when the component mounts
    useEffect(() => {
        const fetchBookings = async () => {
            const fetchedBookings = await getBookings();
            setBookings(fetchedBookings);
        };

        fetchBookings();
    }, []);

    return (
        <div className="lg:flex">
            {/* Medium and Larger Screens */}
            <div className="lg:w-1/2 pr-4">
                {bookings.map((b) => (
                    <div
                        key={b._id}
                        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                        onClick={() => handleClick(b._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div>
                            <h2 className="font-bold text-2xl">{b.name}</h2>
                            <div>{b.totalAmount}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Booking Details Dropdown (Mobile) */}
            {selectedBooking && (
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="lg:hidden w-full">
                        <BookingDetails booking={selectedBooking} />
                    </div>
                </Transition>
            )}
        </div>
    );
};

export default BookingList;