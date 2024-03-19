import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { PurgeCSSPlugin } from "purgecss-webpack-plugin";
import * as glob from "glob";

/**
 * The __filename and __dirname constants are created using the fileURLToPath function from the url module
 * and the dirname function from the path module. These constants represent the filename and directory name
 * of the current module, respectively. In Node.js, these are global variables, but in ES modules, which are
 * used in this code, they are not defined, so they need to be created manually. The import.meta.url property
 * is a URL string representing the URL of the current ES module file.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the configuration object
const config = {
    // Specify the entry point of the application
    entry: "./src/index.js",
    // Specify the output directory and filename for the bundled code
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/",
    },
    // Specify the file extensions that can be imported without specifying the extension
    resolve: {
        extensions: [".js", ".jsx"],
    },
    // Specify the rules for processing different types of files
    module: {
        rules: [
            {
                // Use Babel to transpile JavaScript and JSX files
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                // Use style-loader and css-loader to handle CSS files
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    // Specify the plugins to be used during the build process
    plugins: [
        // Generate an HTML file with the bundled script injected
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        // Remove unused CSS using PurgeCSS
        new PurgeCSSPlugin({
            paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
        }),
    ],
};

// Export the configuration object
export default config;
