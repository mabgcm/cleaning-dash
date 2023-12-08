import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getBookings = async () => {
    try {
        const res = await fetch("https://cleaning-dash-git-master-bugucam-gmailcom.vercel.app/api/booking", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch bookings");
        }
        const data = await res.json();
        return data; // Returning the entire data object

    } catch (error) {
        console.error("Error loading bookings: ", error);
        return null; // Return null in case of an error
    }
};

export default async function BookingList() {
    const { bookings } = getBookings() || { bookings: [] };
    if (!bookings) {
        // Handle the case where bookings are undefined or null
        return <p>No bookings available.</p>;
    }

    return (
        <>
            {bookings.map((b) => (
                <div
                    key={b._id}
                    className="col-4 p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                >
                    <div>
                        <h2 className="font-bold text-2xl">{b.name}</h2>
                        <div>{b.totalAmount}</div>
                    </div>

                    <div className="flex gap-2">
                        <Link href={`/editbooking/${b._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}