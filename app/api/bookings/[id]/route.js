import connectMongoDB from "../../../lib/db";
import Booking from "../../../models/booking";
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newPhone: phone, newEmail: email, newAdress: adress, newCity: city, newPostalCode: postalCode, newBedrooms: bedrooms, newBathrooms: bathrooms, newSquareFeetRange: squareFeetRange, newCleaningItems: cleaningItems, newTotalAmount: totalAmount } = await request.json();
    await connectMongoDB();
    await Booking.findByIdAndUpdate(id, { name, phone, email, adress, city, postalCode, bedrooms, bathrooms, squareFeetRange, cleaningItems, totalAmount });
    return NextResponse.json({ message: "Booking updated" }, { status: 200 });
}
export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const booking = await Booking.findOne({ _id: id });
    return NextResponse.json({ booking }, { status: 200 });
}