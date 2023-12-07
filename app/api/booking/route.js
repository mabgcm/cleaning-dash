import connectMongoDB from "app/libs/db";
import Booking from "app/models/booking";
import { NextResponse } from 'next/server'


export async function POST(request) {
    const { name, phone, email, adress, city, postalCode, bedrooms, bathrooms, squareFeetRange, cleaningItems, totalAmount } = await request.json();
    await connectMongoDB();
    await Booking.create({ name, phone, email, adress, city, postalCode, bedrooms, bathrooms, squareFeetRange, cleaningItems, totalAmount });
    return NextResponse.json({ message: "Booking created" }, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const bookings = await Booking.find();
    return NextResponse.json({ bookings });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Booking.findByIdAndDelete(id);
    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
}
