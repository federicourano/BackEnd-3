import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.MONGO_URL;

export const MongoDB = async() => {
    try {
        await mongoose.connect(connectionString);
        console.log("Conectado correctamente a la base de datos");
    } catch (error) {
        console.error(`ERROR => ${error}`);
    }
}