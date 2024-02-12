import Application from "../models/Application.js";
import jwt from "jsonwebtoken";
import passport from "passport";

export const index = async (req, res, next) => {
    try {
        const applications = await Application.find();

        if (req.accepts("html"))
            res.render("applications/index", {
                applications,
                title: "Applications List"
            });
        else res.json({ applications });
    } catch(error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const application = await findAndVerifyApplication(req);

        res.render("applications/show", { application, title: "Application View" });
    } catch(error) {
        next(error);
    }
};

export const add = async (req, res, next) => {
    try {
        res.render("applications/add", { formType: "create", title: "New Application" });
    } catch(error) {
        next(error);
    }
};

export const edit = async (req, res, next) => {
    try {
        const application = await findAndVerifyApplication(req);

        res.render("applications/edit", { application, formType: "update", title: "Edit Application" });
    } catch(error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const { name } =getStrongParams(req);

        const newApplication = new Application({ name });

        await newApplication.save();

        req.session.notifications = [{ alertType: "alert-success", message: "Application created successfully" }];
        res.redirect("/applications");
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Application failed to create" }];
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { name } =getStrongParams(req);

        const application = await findAndVerifyApplication(req);

        application.name = name;

        await application.save();

        req.session.notifications = [{ alertType: "alert-success", message: "Application was updated successfully" }];
        res.redirect("/applications");
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Application failed to update" }];
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const application = await findAndVerifyApplication(req);

        await Application.findByIdAndDelete(application.id);

        req.session.notifications = [{ alertType: "alert-success", message: "Application deleted successfully" }];
        res.redirect("/applications");
    } catch(error) {
        req.session.notifications = [{ alertType: "alert-danger", message: "Application failed to delete" }];
        next(error);
    }
};

export const requestToken = async (req, res, next) => {
    const { key, secret } = req.body;

    const application = Application.findOne({ key, secret });

    if (!application) {
        res.status = 403;
        return res.json({ status: 403, message: "FORBIDDEN" });
    }

    const token = jwt.sign({
        id: application._id
    }, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });

    res.json({ status: 200, token, message: "SUCCESS" });
};

export const authenticate = async (_, __, next) => {
    passport.authenticate("jwt", { session: false }, next());
};

async function findAndVerifyApplication(req) {
    const application = await Application.findById(req.params.id);

    if (!application) {
        // Handle the case where the user does not exist
        req.status = 404;
        throw new Error("Application does not exist");
    }

    return application;
}
function getStrongParams(req) {
    // Extract approved fields from the request body
    const { name } = req.body;

    return { name };
}