import express from "express";
import dotenv from "dotenv";
import PageRoutes from "./routes/PageRoutes.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", PageRoutes);

app.use((error, _, res, __) => {
    if (typeof error === "string") {
        const originalMessage = error;

        error = { message: originalMessage };
    }

    if (!error.status) error.status = 404;

    res.status(error.status).send(error.message);
});

export default app;
