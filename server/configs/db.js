import mongoose from "mongoose";

// configuration with MongoDB databse

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URL}/VandyGraham`); // LOL
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
