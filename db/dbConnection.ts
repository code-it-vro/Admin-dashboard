import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.log("Error connecting to MongoDB", err);
    });
  } catch (error) {
    console.log("something went wrong with the database connection", error);
  }
}
