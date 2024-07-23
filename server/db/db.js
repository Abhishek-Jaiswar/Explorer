import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}${'explorerUser'}`)
        console.log("Database is connected: ")

    } catch (error) {
        console.log("Something went wrong while connecting to db");
        console.log(error);
    }
}

export default connectToDb