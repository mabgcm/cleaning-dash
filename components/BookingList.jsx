import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getBookings = async () => {
    try {
        const res = await fetch("https://cleaning-dash.vercel.app/api/booking", {
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

export default async function BookingList() {
    const { bookings } = await getBookings();

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