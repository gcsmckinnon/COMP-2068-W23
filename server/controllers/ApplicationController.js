import Application from "../models/Application.js";
import jwt from "jsonwebtoken";
import passport from "passport";

export const index = async (req, res, next) => {
    try {
        const applications = await Application.find();

        res.render("applications/index", {
            applications,
            title: "Applications List"
        });
    } catch (error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const application = await findAndVerifyApplication(req);

        res.render("applications/show", {
            application,
            title: "Application View"
        });
    } catch (error) {
        next(error);
    }
};

export const add = async (_, res, next) => {
    try {
        res.render("applications/add", {
            formType: "create",
            title: "New Application"
        });
    } catch (error) {
        next(error);
    }
};

export const edit = async (req, res, next) => {
    try {
        const application = await findAndVerifyApplication(req);

        res.render("applications/edit", {
            application,
            formType: "update",
            title: "Edit Application"
        });
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const { name } = req.body;

        const newApplication = new Application({ name });

        await newApplication.save();

        req.session.notifications = [{
            alertType: "alert-success",
            message: "Application created successfully"
        }];

        res.redirect("/applications");
    } catch (error) {
        req.session.notifications = [{
            alertType: "alert-danger",
            message: "Application failed to create"
        }];

        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { name } = req.body;

        const application = await findAndVerifyApplication(req);

        application.name = name;

        await application.save();

        req.session.notifications = [{
            alertType: "alert-success",
            message: "Application was updated successfully"
        }];

        res.redirect("/applications");
    } catch (error) {
        req.session.notifications = [{
            alertType: "alert-danger",
            message: "Application failed to update"
        }];
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const application = await findAndVerifyApplication(req);

        await Application.findByIdAndDelete(application.id);

        req.session.notifications = [{
            alertType: "alert-success",
            message: "Application deleted successfully"
        }];

        res.redirect("/applications");
    } catch (error) {
        req.session.notifications = [{
            alertType: "alert-danger",
            message: "Application failed to delete"
        }];
        next(error);
    }
};

export const requestToken = async (req, res, next) => {
    const { key, secret } = req.body;
    const application = await Application.findOne({ key, secret });

    if (!application) {
        res.status = 403;
        return res.json({ status: 403, message: "FORBIDDEN" });
    }

    const token = jwt.sign({
        id: application._id
    }, process.env.SECRET_KEY);

    res.json({ status: 200, token, message: "SUCCESS" });
};

export const authenticate = async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, application) => {
        if (error) return next(error);
        if (!application) return res.status(401).json({ message: "UNAUTHORIZED" });

        req.application = application;
        return next();
    })(req, res, next);
};

async function findAndVerifyApplication(req) {
    const application = await Application.findById(req.params.id);

    if (!application) {
        req.status(404);
        throw new Error("Application does not exists");
    }

    return application;
}