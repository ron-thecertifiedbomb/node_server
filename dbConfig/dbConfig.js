import mongoose from "mongoose"; // Importing mongoose using ES Modules

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Ronchiko:Mybabe0814@atlascluster.rjfmjfq.mongodb.net/storage",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB; // Use export default
