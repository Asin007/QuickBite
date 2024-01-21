import mongoose from 'mongoose'
import { Color } from 'colors'

const connectDB = async () => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URL);
       console.log('connected to MongoDB DataBase ${conn.connection.host}');
    }catch(error){
        console.log('Error in MongoDB ${error}'.bgRed.white);
    }
};

export default connectDB;