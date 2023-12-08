import EditBookingForm from '@/components/EditBookingForm'
const getBookingById = async (id) => {
    try {
        const res = await fetch(`https://cleaning-dash.vercel.app/api/booking/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch edit booking");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function EditBooking({ params }) {
    const { id } = params;
    const { booking } = await getBookingById(id);
    const { name, phone, email, adress, city, postalCode, bedrooms, bathrooms, squareFeetRange, cleaningItems, totalAmount } = booking;
    return <EditBookingForm
        id={id}
        name={name}
        phone={phone}
        email={email}
        adress={adress}
        city={city}
        postalCode={postalCode}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        squareFeetRange={squareFeetRange}
        cleaningItems={cleaningItems}
        totalAmount={totalAmount}
    />;
}