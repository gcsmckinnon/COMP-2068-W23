import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "You must provide a first name"],
            maxlength: [25, "Your name cannot exceed 25 characters"]
        },
        lastName: {
            type: String,
            required: [true, "You must provide a last name"],
            maxlength: [25, "Your last name cannot exceed 25 characters"]
        },
        nickname: {
            type: String,
            required: [true, "You must provide a nickname"],
            unique: true,
            maxlength: [25, "Your nickname cannot exceed 25 characters"]
        },
        email: {
            type: String,
            required: [true, "Must be a valid email"],
            unique: true,
            maxlength: [75, "Your email cannot exceed 75 characters"],
            match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
        },
        avatar: {
            type: String,
            required: false,
            maxlength: [50, "Filename cannot exceed 50 characters"]
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        }
    },
    {
        timestamps: true,
    }
);

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
});

const User = mongoose.model("User", UserSchema);

export default User;
