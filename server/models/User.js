import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Define the User Schema using mongoose
const UserSchema = new mongoose.Schema(
    {
        // First Name Field
        firstName: {
            type: String,
            required: [true, "You must provide a first name"],
            maxlength: [25, "Your name cannot exceed 25 characters"]
        },
        // Last Name Field
        lastName: {
            type: String,
            required: [true, "You must provide a last name"],
            maxlength: [25, "Your last name cannot exceed 25 characters"]
        },
        // Nickname Field
        nickname: {
            type: String,
            required: [true, "You must provide a nickname"],
            unique: true,
            maxlength: [25, "Your nickname cannot exceed 25 characters"]
        },
        // Email Field
        email: {
            type: String,
            required: [true, "Must be a valid email"],
            unique: true,
            maxlength: [75, "Your email cannot exceed 75 characters"],
            match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
        },
        // Avatar Field
        avatar: {
            type: String,
            required: false,
            maxlength: [50, "Filename cannot exceed 50 characters"]
        },
        // Role Field (either "USER" or "ADMIN")
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        }
    },
    {
        // Include timestamps for when the document was created and updated
        timestamps: true,
    }
);

// Use the passport-local-mongoose plugin to enhance the UserSchema
UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email", // Use the "email" field as the username field for authentication
});

// Create a User model based on the UserSchema
const User = mongoose.model("User", UserSchema);

// Export the User model for use in other parts of the application
export default User;
