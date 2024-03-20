import UserService from "../services/UserService.js";

export const show = async (req, res, _) => {
    try {
        const userService = await UserService;
        const user = await userService.show(req.params.id, req.headers.cookie);

        res.json(user);
    } catch (error) {
        console.error(error);

        res.json({});
    }
};

export const create = async (req, res, _) => {  
    try {
        const userService = await UserService;
        await userService.create(req.body);

        res.status(200).json({});
    } catch (error) {
        res.status(404).json({ error });
    }
};

export const update = async (req, res, _) => {
    try {
        const userService = await UserService;
        await userService.update(req.params.id, req.body);

        res.status(200).json({});
    } catch (error) {
        res.status(404).json({ error});
    }
};

export const authenticate = async (req, res, _) => {
    try {
        const userService = await UserService;
        const { headers, data } = await userService.authenticate(req.body);

        const session = headers["set-cookie"]?.find(cookie => cookie.startsWith("connect.sid="));

        if (!session) throw new Error("Invalid credentials");

        res.setHeader("Set-Cookie", session);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error });
    }
}

export const logout = async (req, res, _) => {
    try {
        const userService = await UserService;
        await userService.logout(req.headers.cookie);

        res.clearCookie("connect.sid", { path: "/" });
        res.clearCookie("user", { path: "/" });

        res.status(200).json({});
    } catch (error) {
        res.status(404).json({ error });
    }
};