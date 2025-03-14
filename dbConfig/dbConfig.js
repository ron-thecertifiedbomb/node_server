import mongoose from "mongoose"; // Importing mongoose using ES Modules
import dotenv from "dotenv"; // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Use MONGO_URI from .env file
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error("MongoDB URI is missing in the .env file");
      process.exit(1); // Exit the process if the URI is not defined
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB; // Use export default
