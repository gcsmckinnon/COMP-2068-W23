/**
 * Importing libraries from node_modules (or your own library)
 * uses the `import assignedModuleName from "location/module-name"`.
 * By default, if you only provide the module name, it will default to
 * looking in the /node_modules folder. However, if you pass a path,
 * ie: (./library/MyModuleName.js), it will attempt to import that module.
 * 
 * All import statements must be at the top of the file. You can not add
 * new logic, then an import statement, as the application will throw an
 * error. There are ways around this though.
 * 
 * Here we're importing the ExpressJS module which will bring in all the
 * features of ExpressJS.
 */
import express from "express";

/**
 * Dotenv is an industry standard library that aids in handling
 * environment variables within an application. Environment variables
 * are values only discoverable within the context of the current service
 * environment. For example, your laptop. If you're running virtual machines,
 * it'd be within the context of just that machine.   
 */
import dotenv from "dotenv";

/**
 * Below we're invoking the Dotenv library so that it will register the
 * environment variables we've added to our .env file. The Dotenv invoke
 * will look automatically for a .env file within the root of the application. If
 * the file is named something else, you must pass that as an argument to the function
 * call.
 */
dotenv.config();

// We're executing the ExpressJS function, which will provide us an app
const app = express();

/**
 * Middleware is a way to inject features into your application. Below
 * we're registering two express middlewares to support handling query
 * strings and body parameters passed to us from our application
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * This is an example of a custom registered middleware. It contains a
 * route and an action. The route provides an access point to trigger the
 * action. We'll be separating this in our next lesson into separate routes
 * and controllers which will help us better manage each of these concerns.
 * 
 * A middleware is comprised of a few parts. A route is an identifier used to
 * trigger the middleware. This is optional, as middleware can be registered without
 * a route. The callbacks registered with the middleware, however, are not optional.
 * You can have as many callbacks as you want, but if they don't respond, you'll
 * need to provide a next action so they'll move onto the next middleware.
 * 
 * The callback is comprised of a parameter list and logic block. These are known as
 * a function. You may used named functions, anonymous functions, or arrow functions.
 * It's irrelevant providing you setup the correct parameters to store the passed
 * arguments. The arguments passed are the Request object, the Response object, and
 * the Next function.
 * 
 * The Request object contains information about the incoming request. The route that
 * was triggered, the user's navigation information, and any other values such as request
 * queries and/or body parameters.
 * 
 * The Response object is used to respond to the user's request. This object has some default
 * values, but is your channel for passing information back to the user.
 * 
 * The Next function is used to move from one middleware to another. Middleware are registered
 * in order of intended operation. If a middleware isn't intended to respond to a request,
 * then it will need to invoke the Next function so it'll move onto the next middleware. Passing
 * and argument to the Next function will invoke an error.
 */
app.get("/", (req, res) => {
    // Below will stringify the request object and send it back to the user as a response
    res.json(req);
});

/**
 * Below is an example of a registered middleware with a parameter (:id). There
 * are several ways to indicate a parameter's type and enforce data types to be
 * filled, but for now, this is the basic syntax.
 */
app.get("/:id", (req, res, next) => {
    // It's common practice to assign passed params to variables
    const id = req?.params?.id;

    // isNaN is a built-in function to check the data type of a value and determine if it's a valid Number
    if (isNaN(id)) {
        // To ensure GTFO we must return the Next result
        return next(`Parameter is required to be a number. ${id} is not a number`);
    }

    // If all good, we'll return a message
    res.send(`Your requested id number ${id}`);
});

/**
 * Below is a special middleware called an "error handler". You may only have one
 * error handler, but it can call other actions and pass into other middleware,
 * which is common when separating concerns.
 */
app.use((error, req, res, next) => {
    /**
     * Below we check if the error is a string. By default, most errors will be an object.
     * The object will carry a message and stack trace. However, on occasion it may just be
     * a string. To avoid a string, we can ensure we're always passing a new error object
     * to the Next function.
     */ 
    res.send((typeof error === "string") ? error : error.message);
});

/**
 * Below is the ExpressJS server listener. This creates an HTTP client
 * that will listen to requests and forward it to the correct route
 * within our application, or send it to an error handler if it's not
 * found
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));