import app from "./app.js";
import dotenv from "dotenv";
import connectToDb from "./db/db.js";

dotenv.config()
const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {

        await connectToDb()
            .then(() => {
                console.log("Database is running with server");
            })
            .catch((error) => {
                console.log("Failed to connect with mongodb please debug");
                console.log(error);
            })

        app.listen(PORT, () => {
            console.log(`Server is listening at port: http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("Failed to start the server");
    }
}

startServer()