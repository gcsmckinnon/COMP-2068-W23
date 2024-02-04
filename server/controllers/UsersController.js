import User from "../models/User.js";
import fs from "fs";

// Function to display a list of Users (admin access only)
export const index = async (_, res, next) => {
    try {
        // Retrieve a list of all users from the database
        const users = await User.find();

        // Render the user list page with the retrieved data
        res.render("users/index", {
            title: "List of Users",
            users,
        });
    } catch (error) {
        next(error);
    }
};

// Function to display a User's profile (admin access only)
export const show = async (req, res, next) => {
    try {
        // Find and verify a user based on the provided request parameters
        const user = await findAndVerifyUser(req);

        // Render the user's profile page with the retrieved user data
        res.render("cards/show", {
            user,
            title: "User View",
        });
    } catch (error) {
        next(error);
    }
};

// Function to display a CMS interface for adding a new User
export const add = async (req, res, next) => {
    try {
        // Render the user addition form page
        res.render("users/add", {
            formType: "create",
            title: "New User",
        });
    } catch (error) {
        next(error);
    }
};

// Function to display a CMS interface for updating an existing User
export const edit = async (req, res, next) => {
    try {
        // Find and verify a user based on the provided request parameters
        const user = await findAndVerifyUser(req);

        // Render the user editing form page with the retrieved user data
        res.render("users/edit", {
            user,
            formType: "update",
            title: "Edit User",
        });
    } catch (error) {
        next(error);
    }
};

// Function to create a new User based on form input
export const create = async (req, res, next) => {
    try {
        // Extract and validate user input from the request
        const { firstName, lastName, nickname, email, password, avatar } = getStrongParams(req);

        // Create a new User instance with the provided data
        const user = new User({ firstName, lastName, nickname, email });

        // Validate user data and check for errors
        const validationErrors = user.validateSync();

        if (validationErrors) {
            // Handle validation errors and display them to the user
            if (avatar && fs.existsSync(avatar.path)) {
                fs.unlinkSync(avatar.path);
            }

            const message = Object.values(validationErrors.errors).map((error) => error.message);

            res.status(400);

            throw new Error(message.join("\n"));
        }

        // Handle user avatar (if provided)
        if (avatar && fs.existsSync(avatar.path)) {
            fs.copyFileSync(avatar.path, `avatars/${avatar.filename}`);
            fs.unlinkSync(avatar.path);
            user.avatar = avatar.filename;
        }

        // Register the user with Passport's User.register method
        await User.register(user, password);

        // Redirect to the user list page after successful user creation
        res.redirect("/users");
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Function to update an existing User based on form input
export const update = async (req, res, next) => {
    try {
        // Extract and validate user input from the request
        const { id, firstName, lastName, nickname, email, password, avatar } = getStrongParams(req);

        // Find and verify a user based on the provided request parameters
        let user = await findAndVerifyUser(req);

        // Update user properties with the provided data
        user.firstName = firstName;
        user.lastName = lastName;
        user.nickname = nickname;
        user.email = email;

        // Validate user data and check for errors
        const validationErrors = user.validateSync();

        if (validationErrors) {
            // Handle validation errors and display them to the user
            if (avatar && fs.existsSync(avatar.path)) {
                fs.unlinkSync(avatar.path);
            }

            const message = Object.values(validationErrors.errors).map((error) => error.message);

            res.status(400);

            throw new Error(message.join("\n"));
        }

        // Handle user avatar (if provided)
        if (avatar && fs.existsSync(avatar.path)) {
            fs.copyFileSync(avatar.path, `avatars/${avatar.filename}`);
            fs.unlinkSync(avatar.path);
            fs.unlinkSync( `avatars/${user.avatar}`);
            user.avatar = avatar.filename;
        }

        // Save the updated user data
        user.save();

        // Redirect to the user list page after successful user update
        res.redirect("/users");
    } catch (error) {
        next(error);
    }
};

// Function to remove an existing User
export const remove = async (req, res, next) => {
    try {
        // Find and verify a user based on the provided request parameters
        const user = await findAndVerifyUser(req);

        // Delete the user's avatar file (if it exists)
        const filepath = `avatars/${user.avatar}`;
        
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        // Remove the user from the database
        await User.findByIdAndDelete(req.params.id);

        // Redirect to the user list page after successful user removal
        res.redirect("/users");
    } catch (error) {
        next(error);
    }
};

// Helper function to find and verify a user by their ID
async function findAndVerifyUser(req) {
    const user = await User.findById(req.params.id);

    if (!user) {
        // Handle the case where the user does not exist
        req.status = 404;
        throw new Error("User does not exist");
    }

    return user;
}

/**
 * This function is used to ensure that only approved fields are returned and used.
 *
 * @param { ExpressRequestObject } req - The Express request object containing user input
 * @returns { object } - An object containing approved fields
 */
function getStrongParams(req) {
    if (req.file) {
        req.body.avatar = req.file;
    }

    // Extract approved fields from the request body
    const { id, firstName, lastName, nickname, email, avatar, password } = req.body;

    return { id, firstName, lastName, nickname, email, avatar, password };
}
