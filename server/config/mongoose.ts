import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const Mconnect = process.env.MONGOOSE || "mongodb://127.0.0.1:27017/olx"
const mongo = () => {
    mongoose.connect(Mconnect)
        .then(() => {
            console.log("mongodb connected success");

        }
        )
        .catch((err) => {
            console.log(err);

        }
    )
}
export default mongo