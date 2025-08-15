import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log("Could Not connect to DB: ",error.message);
        process.exit(1);
    }
}