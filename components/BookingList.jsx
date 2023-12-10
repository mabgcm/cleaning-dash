'use client'
import React, { useEffect, useState } from 'react';
import BookingDetails from './BookingDetails';
import Modal from 'react-modal';


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

const BookingList = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            setIsModalOpen(true);  // Open the modal

        } catch (error) {
            console.log("Error loading booking details: ", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
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

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Booking Details"
            >
                {selectedBooking && (
                    <div className="p-4 border border-slate-300">
                        <BookingDetails booking={selectedBooking} />
                        <button onClick={closeModal}>Close Modal</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BookingList;