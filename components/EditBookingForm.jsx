"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditBookingForm({
    id,
    name,
    phone,
    email,
    adress,
    city,
    postalCode,
    bedrooms,
    bathrooms,
    squareFeetRange,
    cleaningItems,
    totalAmount }) {
    const [newName, setNewName] = useState(name);
    const [newPhone, setNewPhone] = useState(phone);
    const [newEmail, setNewEmail] = useState(email);
    const [newAdress, setNewAdress] = useState(adress);
    const [newCity, setNewCity] = useState(city);
    const [newPostalCode, setNewPostalCode] = useState(postalCode);
    const [newBedrooms, setNewBedrooms] = useState(bedrooms);
    const [newBathrooms, setNewBathrooms] = useState(bathrooms);
    const [newSquareFeetRange, setNewSquareFeetRange] = useState(squareFeetRange);
    const [newCleaningItems, setNewCleaningItems] = useState(cleaningItems);
    const [newTotalAmount, setNewTotalAmount] = useState(totalAmount);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://cleaning-dash-git-master-bugucam-gmailcom.vercel.app/api/booking${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    newName,
                    newPhone,
                    newEmail,
                    newAdress,
                    newCity,
                    newPostalCode,
                    newBedrooms,
                    newBathrooms,
                    newSquareFeetRange,
                    newCleaningItems,
                    newTotalAmount
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update booking");
            }

            router.refresh();
            router.push("/dasboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Customer Name"
            />

            <input
                onChange={(e) => setNewPhone(e.target.value)}
                value={newPhone}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Customer phone number"
            />
            <input
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Customer email adress"
            />
            <input
                onChange={(e) => setNewAdress(e.target.value)}
                value={newAdress}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Customer adress"
            />
            <input
                onChange={(e) => setNewCity(e.target.value)}
                value={newCity}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Customer location"
            />
            <input
                onChange={(e) => setNewPostalCode(e.target.value)}
                value={newPostalCode}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Customer postalcode"
            />
            <input
                onChange={(e) => setNewBedrooms(e.target.value)}
                value={newBedrooms}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Number of bedrooms"
            />
            <input
                onChange={(e) => setNewBathrooms(e.target.value)}
                value={newBathrooms}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Number of bathrooms"
            />
            <input
                onChange={(e) => setNewSquareFeetRange(e.target.value)}
                value={newSquareFeetRange}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Size of the area in sqmt"
            />
            <input
                onChange={(e) => setNewCleaningItems(e.target.value)}
                value={newCleaningItems}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Extra cleaning requests"
            />
            <input
                onChange={(e) => setNewTotalAmount(e.target.value)}
                value={newTotalAmount}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Total amount"
            />

            <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Update Booking
            </button>
        </form>
    );
}