import mongoose from "mongoose";

export const connectDB = async () => {
    try {
     await mongoose.connect('mongodb+srv://andreslombardo96:contradbroles@cluster0.tihyar2.mongodb.net/');
     console.log(">>> DB is connected");
    } catch (error) {
     console.log(error);
    }
 }