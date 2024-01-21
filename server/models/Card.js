import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "You must provide content for the card"],
        minlength: [3, "Please provide at least 3 characters"],
        maxlength: [300, "Content cannot exceed 300 characters"]
    },
    type: {
        type: String,
        enum: ["QUESTION", "ANSWER"],
        required: [true, "You must choose a card type"],
    }
}, { timestamps: true });

export default mongoose.model("Card", CardSchema);