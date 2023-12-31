import React from 'react';

const BookingDetails = ({ booking }) => {
    if (!booking) {
        return null; // Don't render anything if no booking is selected
    }

    return (
        <div>
            <h2>{booking.name}</h2>
            <p>Total Amount: {booking.totalAmount}</p>
            <p>Cleaning Date: {booking.date}</p>
            {/* Add other details you want to display */}
        </div>
    );
};

export default BookingDetails;
