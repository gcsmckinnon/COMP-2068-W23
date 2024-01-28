import passport from "passport";
import User from "../models/User.js";

export default (app) => {
    // Setup Passport local strategy (for username/password authentication)
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.isAuthenticated();
        res.locals.isAdmin = req.user?.role === "ADMIN";
        res.locals.isUser = req.user?.role === "USER";
        next();
    });
};
