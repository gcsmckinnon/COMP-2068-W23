import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const GameSchema = new Schema({
    gamecode: {
        type: String,
        required: [true, "You must provide content for the game"],
        default: generateRandomHexKey()
    },
}, { timestamps: true });

export default mongoose.model("Game", GameSchema);

function generateRandomHexKey() {
    return crypto.randomBytes(8 / 2).toString("hex");
}