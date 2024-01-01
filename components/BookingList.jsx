'use client'
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TotalAmount from './TotalAmount';

const modalStyle = {
    content: {
        width: '600px',
        height: '375px',
        margin: 'auto',
        border: 'none'
    },
};

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

        // Sort bookings from new to old
        const sortedBookings = bookings.sort((a, b) => new Date(b.date) - new Date(a.date));

        return sortedBookings;
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
        <div className="pr-4">
            <div className="total-amount w-1/4">
                <TotalAmount bookings={bookings} />
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell>Package</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((b) => (
                            <TableRow
                                key={b._id}
                                onClick={() => handleClick(b._id)}
                                style={{ cursor: 'pointer' }}
                                // sx={{ color: b.completed ? 'success.main' : 'warning.main' }}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: b.completed ? 'success.main' : 'warning.main' }}
                            >
                                <TableCell component="th" scope="row">
                                    {b.name}
                                </TableCell>
                                <TableCell>{b.cleaningType}</TableCell>
                                <TableCell>{b.city}</TableCell>
                                <TableCell>{b.date}</TableCell>
                                <TableCell>{b.totalAmount}</TableCell>
                                <TableCell>{b.completed ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Booking Details"
                style={modalStyle}
            >
                {selectedBooking && (
                    <Card sx={{ width: 'auto', height: 'auto' }}>
                        <TableRow>
                            <Typography variant="h6" gutterBottom component="div" sx={{ color: 'secondary.main', p: 1 }}>Contact Details</Typography>
                            <Table sx={{ minWidth: 550 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Adress</TableCell>
                                        <TableCell>Postal Code</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{selectedBooking.phone}</TableCell>
                                        <TableCell>{selectedBooking.email}</TableCell>
                                        <TableCell>{selectedBooking.adress}</TableCell>
                                        <TableCell>{selectedBooking.postalCode}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableRow>

                        <TableRow>
                            <Typography variant="h6" gutterBottom component="div" sx={{ color: 'warning.main', p: 1 }}>Job Details</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Bedrooms:</TableCell>
                                        <TableCell>Bathrooms:</TableCell>
                                        <TableCell>Area (Sq Feet)</TableCell>
                                        <TableCell>Extra Items</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{selectedBooking.bedrooms}</TableCell>
                                        <TableCell>{selectedBooking.bathrooms}</TableCell>
                                        <TableCell>{selectedBooking.squareFeetRange}</TableCell>
                                        <TableCell>{selectedBooking.cleaningItems.join(', ')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableRow>

                    </Card>
                )}

                {/* <div className="p-4 border border-slate-300">
                    <div>
                        <h4>Customer Details:</h4>
                    </div>
                    <div>
                        <strong>Name:</strong> {selectedBooking.name}
                    </div>
                    <div>
                        <strong>Phone:</strong> {selectedBooking.phone}
                    </div>
                    <div>
                        <strong>Email:</strong> {selectedBooking.email}
                    </div>
                    <div>
                        <strong>Address:</strong> {selectedBooking.address}
                    </div>
                    <div>
                        <strong>Postal Code:</strong> {selectedBooking.postalCode}
                    </div>
                    <div>
                        <strong>Booking Date:</strong> {selectedBooking.date}
                    </div>
                    <div>
                        Property details
                    </div>
                    <div>
                        <strong>Bedrooms:</strong> {selectedBooking.bedrooms}
                    </div>
                    <div>
                        <strong>Bathrooms:</strong> {selectedBooking.bathrooms}
                    </div>
                    <div>
                        <strong>Size:</strong> {selectedBooking.squareFeetRange} sqft
                    </div>
                    <div>
                        <strong>Extra Items to be cleaned:</strong> {selectedBooking.cleaningItems.join(', ')}
                    </div>
                    <div>
                        <strong>Total Amount:</strong> {selectedBooking.totalAmount}
                    </div>
                    <div className='flex'>
                        <strong className='flex'>Payment Status:</strong> {selectedBooking.paid ? <FaCircle color='green' className='flex' /> : <FaCircle color='red' className='flex' />}
                    </div>
                    <div>
                        <strong>Cleaning Status:</strong> {selectedBooking.completed ? <FaCircle color='green' /> : <FaCircle color='red' />}
                    </div>

                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={closeModal}>Close Details</button>
                </div> */}

            </Modal>
        </div>
    );
};

export default BookingList;