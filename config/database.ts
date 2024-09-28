import mongoose from 'mongoose';


export const connect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Connect Database Successful!")
    }
    catch(error) {
        console.log("Connect Database Failed!")
        console.log(error)
    }
}