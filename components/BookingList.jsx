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
import { FaCircle } from "react-icons/fa";
import TotalJobs from './TotalJobs';


const modalStyle = {
    content: {
        width: '600px',
        height: '375px',
        margin: 'auto',
        border: '1px solid black'
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

        // Sort bookings: not completed first, then by date
        const sortedBookings = bookings.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1; // Not completed bookings come first
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });

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

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className="pr-4" style={{ padding: 30 }}>
            <div className="row flex mb-1">
                <div className="total-amount w-1/2 mr-2">
                    <TotalAmount bookings={bookings} />
                </div>
                <div className="total-amount w-1/2">
                    <TotalJobs bookings={bookings} />
                </div>
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
                            <TableCell>Payment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((b) => (
                            <TableRow
                                key={b._id}
                                onClick={() => handleClick(b._id)}
                                style={{ cursor: 'pointer' }}
                                // sx={{ color: b.completed ? 'success.main' : 'warning.main' }}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: b.completed ? 'success.main' : 'error.main' }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography color={b.completed ? 'success.main' : 'error.main'}>{b.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={b.completed ? 'success.main' : 'error.main'}>{capitalize(b.cleaningType)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={b.completed ? 'success.main' : 'error.main'}>{b.city}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={b.completed ? 'success.main' : 'error.main'}>{b.date}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={b.completed ? 'success.main' : 'error.main'}>C$ {b.totalAmount}</Typography>
                                </TableCell>
                                <TableCell align="center">{b.paid ? <FaCircle color='green' /> : <FaCircle color='red' />}</TableCell>
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
                            <Typography variant="h6" gutterBottom component="div" sx={{ color: 'info.main', p: 1 }}>Contact Details</Typography>
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
                            <Typography variant="h6" gutterBottom component="div" sx={{ color: 'info.main', p: 1 }}>Job Details</Typography>
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
                                        <TableCell>
                                            <ul>
                                                {selectedBooking.cleaningItems.map((item, index) => (
                                                    <li key={index}>{capitalize(item)}</li>
                                                ))}
                                            </ul>
                                        </TableCell>                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableRow>

                    </Card>
                )}

            </Modal>
        </div>
    );
};

export default BookingList;