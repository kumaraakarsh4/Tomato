import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://aryanguptax01:aryangupta01@cluster0.tcl3crf.mongodb.net/tomato')
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("Error in connecting to mongoDB ", err);
    })
}