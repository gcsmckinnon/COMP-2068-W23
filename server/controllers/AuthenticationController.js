import passport from "passport";

// Render the login page
export const login = (_, res) => {
    res.render("authentication/login");
};

// Authenticate user using Passport's local strategy
export const authenticate = async (req, res, next) => {
    // Passport's authentication middleware for local strategy is invoked with options.
    passport.authenticate(
        "local",
        {
            successRedirect: "/", // Redirect on successful authentication
            failureRedirect: "/login", // Redirect on failed authentication
        },
        (error, user) => {
            if (error) {
                req.session.notifications = [{ alertType: "alert-danger", message: "Issue with logging in" }];
                return next(error);
            }

            if (!user) {
                req.session.notifications = [{ alertType: "alert-danger", message: "Issue with logging in" }];
                return res.redirect("/login");
            }

            req.logIn(user, (err) => {
                if (err) return next(err);

                req.session.notifications = [{ alertType: "alert-success", message: "Successfully logged in" }];

                res.format({
                    "text/html": () => res.redirect("/"),
                    "application/json": () =>
                        res
                            .status(200)
                            .json({ status: 200, message: "SUCCESS", user: { id: user.id, firstName: user.firstName, lastName: user.lastName, nickname: user.nickname, email: user.email } }),
                    default: () => res.status(406).send("NOT ACCEPTABLE"),
                });
            });
        }
    )(req, res, next); // Invoke Passport middleware with request, response, and next middleware function
};

// Logout user, destroy session, and clear cookies
export const logout = (req, res, next) => {
    // Logout the user by removing user information from the session
    req.logout((error) => {
        if (error) {
            console.error(error);
            return next(error);
        }

        // Destroy the user's session, removing session data from the server
        req.session.destroy((error) => {
            if (error) {
                console.error(error);
                return next(error);
            }

            // Clear the "connect.sid" cookie used for tracking the session
            res.clearCookie("connect.sid", { path: "/" });

            // Redirect the user to the login page after successful logout
            res.format({
                "text/html": () => res.redirect("/login"),
                "application/json": () => res.status(200).json({ status: 200, message: "SUCCESS" }),
                default: () => res.status(406).send("NOT ACCEPTABLE"),
            });
        });
    });
};

// Check if the user is authenticated, and redirect to login if not
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // Proceed if authenticated
    }
    
    res.clearCookie("connect.sid", { path: "/" });

    res.format({
        "text/html": () => res.redirect("/login"),
        "application/json": () => res.status(401).json({ status: 401, message: "NOT AUTHORIZED" }),
        default: () => res.status(406).send("NOT ACCEPTABLE"),
    });
};

// Check if the user has a specific role
export const isRole = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated) {
            // Check if user is not authenticated
            req.status = 401; // Unauthorized status code

            return next(new Error("NOT AUTHORIZED")); // Return an error for unauthorized access
        }

        if (role !== req.user.role) {
            // Check if user's role doesn't match the specified role
            req.status = 403; // Forbidden status code

            return next(new Error("FORBIDDEN")); // Return an error for forbidden access
        }

        next(); // Proceed if user has the correct role
    };
};
