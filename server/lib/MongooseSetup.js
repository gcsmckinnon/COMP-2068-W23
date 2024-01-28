import dotenv from "dotenv";
import mongoose from "mongoose";

// This loads our .env and adds the variables to the environment
dotenv.config();

export default () => {
    /**
     * Setting up Mongoose
     */
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.soo0kgv.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => console.info("MongoDB Connected"))
        .catch(error => console.error(error));
};