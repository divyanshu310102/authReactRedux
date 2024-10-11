import mongoose from 'mongoose';



const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://yadavdivyanshu489:yadavdy@cluster0.ux1ud.mongodb.net")
        console.log("DB connected!!")
    } catch (error) {
        console.log("Error in connecting DB", error)
    }
} 

export default connectDB;