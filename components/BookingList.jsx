import React from 'react'

const getBookings = async () => {
    try {
        const res = await fetch("https://cleaning-dash.vercel.app/api/bookings", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        // Ensure that the 'booking' property is present in the data, otherwise default to an empty array
        const bookings = data && data.booking ? data.booking : [];

        return bookings;
    } catch (error) {
        console.log("Error loading bookings: ", error);
        return []; // Return an empty array in case of an error
    }
};

export default async function BookingList() {
    const bookings = await getBookings();

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