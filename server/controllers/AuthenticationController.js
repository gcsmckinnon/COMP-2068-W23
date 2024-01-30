import passport from "passport";

export const login = (_, res) => {
    res.render("authentication/login");
}

export const authenticate = async (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })(req, res, next);
};

export const logout = (req, res, next) => {
    req.logout((error) => {
        if (error) return next(error)

        req.session.destroy((error) => {
            if (error) return next(error)

            res.clearCookie("connect.sid");
            res.redirect("/login");
        });
    });
};

export const isAuthenticated = (req, res, next) => {    
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
};

export const isRole = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated) {
            req.status = 401;

            return next(new Error("NOT AUTHORIZED"));
        }

        if (role !== req.user.role) {
            req.status = 403;

            return next(new Error("FORBIDDEN"));
        }
        
        next();
    }
}