// bookings

import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI2);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;