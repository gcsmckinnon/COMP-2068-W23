import passport from "passport";

// Render the login page
export const login = (_, res) => {
    res.render("authentication/login");
}

// Authenticate user using Passport's local strategy
export const authenticate = async (req, res, next) => {
    // Passport's authentication middleware for local strategy is invoked with options.
    passport.authenticate("local", {
        successRedirect: "/", // Redirect on successful authentication
        failureRedirect: "/login", // Redirect on failed authentication
    })(req, res, next); // Invoke Passport middleware with request, response, and next middleware function
};

// Logout user, destroy session, and clear cookies
export const logout = (req, res, next) => {
    // Logout the user by removing user information from the session
    req.logout((error) => {
        if (error) return next(error);

        // Destroy the user's session, removing session data from the server
        req.session.destroy((error) => {
            if (error) return next(error);

            // Clear the "connect.sid" cookie used for tracking the session
            res.clearCookie("connect.sid");

            // Redirect the user to the login page after successful logout
            res.redirect("/login");
        });
    });
};

// Check if the user is authenticated, and redirect to login if not
export const isAuthenticated = (req, res, next) => {    
    if (req.isAuthenticated()) return next(); // Proceed if authenticated

    res.redirect("/login"); // Redirect to login page if not authenticated
};

// Check if the user has a specific role
export const isRole = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated) { // Check if user is not authenticated
            req.status = 401; // Unauthorized status code

            return next(new Error("NOT AUTHORIZED")); // Return an error for unauthorized access
        }

        if (role !== req.user.role) { // Check if user's role doesn't match the specified role
            req.status = 403; // Forbidden status code

            return next(new Error("FORBIDDEN")); // Return an error for forbidden access
        }
        
        next(); // Proceed if user has the correct role
    }
}
