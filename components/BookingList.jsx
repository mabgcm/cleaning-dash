import React from 'react'

const getBookings = async () => {
    try {
        const res = await fetch("https://cleaning-dash.vercel.app/api/bookings", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch bookings");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading bookings: ", error);
    }
};

export default async function TopicsList() {
    const { booking } = await getBookings();

    return (
        <>
            {booking.map((b) => (
                <div
                    key={b._id}
                    className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                >
                    <div>
                        <h2 className="font-bold text-2xl">{t.name}</h2>
                        <div>{b.totalAmount}</div>
                    </div>

                    <div className="flex gap-2">


                    </div>
                </div>
            ))}
        </>
    );
}