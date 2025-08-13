import mongoose from 'mongoose'

let isConnected = false;

export const connectDB = async () => {

    if(isConnected){
        console.log('MongoDB already connected');
        return; 
    }

    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        
        isConnected = conn.connections[0].readyState;
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log("Could Not connect to DB: ",error.message);
        process.exit(1);
    }
}