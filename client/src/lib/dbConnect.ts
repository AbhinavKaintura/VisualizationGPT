import mongoose from 'mongoose'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ADABase';

export async function connectToDatabase(){
    try{
        mongoose.connect(MONGO_URI)

        const connection=mongoose.connection;

        connection.on("connected",()=>{
        console.log("mongodb connected successfully");
        })

        connection.on("error", (err:any)=>{
            console.log("mongodb connectioon error.",err);
            process.exit();
        })
    }catch(error){
        console.log("Error occured in setting up databse connection",error);
    }
}