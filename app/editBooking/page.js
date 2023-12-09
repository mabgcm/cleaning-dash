import EditBookingForm from '../../components/EditBookingForm'

const getBookingById = async (id) => {
    try {
        const res = await fetch(`https://cleaning-dash-git-master-bugucam-gmailcom.vercel.app/api/booking/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch edit booking");
        }

        const data = await res.json();

        // Check if the 'booking' property is present in the response
        if ('booking' in data) {
            return data;
        } else {
            throw new Error("Booking data not found in the response");
        }
    } catch (error) {
        console.error(error);
        return null; // Return null in case of an error
    }
};

export default async function EditBooking({ params }) {
    const { id } = params;
    const { booking } = await getBookingById(id);
    if (!booking) {
        // Handle the case where booking is undefined
        return <p>Booking not found.</p>;
    }
    const { name, phone, email, adress, city, postalCode, bedrooms, bathrooms, squareFeetRange, cleaningItems, totalAmount } = booking;
    // return <EditBookingForm
    //     id={id}
    //     name={name}
    //     phone={phone}
    //     email={email}
    //     adress={adress}
    //     city={city}
    //     postalCode={postalCode}
    //     bedrooms={bedrooms}
    //     bathrooms={bathrooms}
    //     squareFeetRange={squareFeetRange}
    //     cleaningItems={cleaningItems}
    //     totalAmount={totalAmount}
    // />;
}