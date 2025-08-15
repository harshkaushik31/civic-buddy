import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        connection.on('connected',()=>{
            console.log("MongoDB connected successfully");
        })

        connection.now('error',(error)=>{
            console.log('MonogoDB Connection errror ',error);
            process.exit(1);
        })
    }catch(error){
        console.log("Could Not connect to DB: ",error.message);
        process.exit(1);
    }
}